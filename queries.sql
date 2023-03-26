-- triggers

delimiter //
create trigger auto_discount
before insert on orders
begin
for each row
  if new.amount > 100000 then
    set new.amount = 0.9 * new.amount;
  end if;
end; //

delimiter //
create trigger delete_seller_account
before delete on sellers
for each row
  begin
    delete from ratings where seller_id = old.seller_id;
    delete from shoe_seller where seller_id = old.seller_id;
    delete from shoe where shoe_id in (select shoe_id from shoe_seller where seller_id = old.seller_id);
  end; //
    
-- OLAP queries

-- rollup
select
shoe_seller.seller_id as seller_id,
order_shoe.shoe_id as shoe_id,
category.name,
sum(amount * 5/100) as commission
from orders
  natural join order_shoe
  natural join shoe_seller
  natural join category
group by seller_id, shoe_id, category.name with rollup;

-- slicing 
select
shoe_seller.seller_id as seller_id,
order_shoe.shoe_id as shoe_id,
category.name,
sum(amount * 5/100) as commission
from orders
  natural join order_shoe
  natural join shoe_seller
  natural join category
where category.name = 'Men'
group by seller_id, shoe_id;

-- pivoting
select
shoe_seller.seller_id as seller_id,
order_shoe.shoe_id as shoe_id,
sum(case
  when year(orders.datetime) = 2022 then orders.amount
  else 0
end) as '2022',
sum(case
  when year(orders.datetime) = 2023 then orders.amount
  else 0
end) as '2023'
from orders
natural join order_shoe
natural join shoe_seller
group by seller_id, shoe_id;

-- drill down
select
shoe_seller.seller_id as seller_id,
order_shoe.shoe_id as shoe_id,
category.name,
sum(amount) as sales
from orders
  natural join order_shoe
  natural join shoe_seller
  natural join category
group by seller_id, shoe_id, category.name;

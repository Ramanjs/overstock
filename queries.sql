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
    

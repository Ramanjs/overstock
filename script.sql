/* Overstock
 Ramanjeet Singh - 2021085
 Rishipal Singh  - 2021088
*/

-- Admin wants to see most frequent purchasing customers
SELECT COUNT(customer_id), customer_id
FROM orders
GROUP BY customer_id
ORDER BY COUNT(customer_id) desc;

-- User requests update password feature 
update customers 
set login_password = 'newpassword'
where customer_id = 100;

-- Customer wants to see order history
select customer_id, first_name, orders.order_id, orders.amount, shoe.name, shoe.price
from customers
  join orders on (customers.customer_id = orders.customer_id)
  join order_shoe on (orders.order_id = order_shoe.order_id)
  join shoe on (order_shoe.shoe_id = shoe.shoe_id)
where customers.customer_id = 269;

-- Customer wants to see product filtered on the basis of size and category
select shoe_id, price, shoe.name, color, weight, quantity
from category
  join shoe on (category.category_id = shoe.category_id)
where category.name = 'Men' and size = 'L';

-- Customer wants to buy from a specific seller
select shoe.shoe_id, shoe.price, shoe.name, shoe.color, shoe.weight, shoe.quantity
from sellers
  join shoe_seller on (shoe_seller.seller_id = sellers.seller_id)
  join shoe on (shoe_seller.shoe_id = shoe.shoe_id)
where sellers.seller_id = 5;

-- Seller stops selling on the website
delete from ratings where seller_id = 500;
delete from shoe_seller where seller_id = 500;
delete from shoe
where shoe_id in
(select shoe_id from shoe_seller where seller_id = 500);
delete from sellers where seller_id = 500;

-- Admin wants to see products purchased on a specific date
select customer_id, orders.order_id, datetime, amount, price, shoe.name, color, size, weight
from orders
join order_shoe on (orders.order_id = order_shoe.order_id)
join shoe on (order_shoe.shoe_id = shoe.shoe_id)
where datetime <= '2022-12-24 00:00:00' and datetime >= '2022-12-11 00:00:00'
order by datetime;


-- Admin wants to see details of customer who hasn't purchased anything 
select * from customers
where customer_id not in (select customer_id from orders);

-- Calculate the company profit / commision from each seller
select sum(amount * 5/100) as commision, shoe_seller.seller_id
from orders
  join order_shoe on (orders.order_id = order_shoe.order_id)
  join shoe_seller on (order_shoe.shoe_id = shoe_seller.shoe_id)
group by seller_id
order by commision desc;

-- Union and group customers and sellers by their common city
select city, first_name as name from customers
union
select city, name from sellers
order by city;

-- Create a view to filter Women's shoes by stars/rating
create or replace view FilterWomenShoesOrderByRating as
select reviews.shoe_id, price, shoe.name, color, weight, quantity, stars
from category
  join shoe on (category.category_id = shoe.category_id)
  right join reviews on (reviews.shoe_id = shoe.shoe_id)
where category.name = 'Women'
order by stars desc;

START TRANSACTION;
  INSERT INTO orders (customer_id, order_id, amount) 
  VALUES ('C001', 'O001', 50.00);
  INSERT INTO order_shoe (order_id, shoe_id) VALUES ('O001', 'S001');
  INSERT INTO review (customer_id, review_id, shoe_id, description, stars) 
  VALUES ('C001', 'R001', 'S001', 'These shoes are great!', 5);
  DELETE FROM shoe where shoe_id = 'S001'
COMMIT;

START TRANSACTION;
  SELECT * FROM shoe where shoe_id = 'S001';
  UPDATE shoe SET quantity = 2 WHERE shoe_id = 'S001';
COMMIT;

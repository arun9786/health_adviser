CREATE DATABASE health_adviser;
use health_adviser;

CREATE USER 'jobuser'@'localhost' IDENTIFIED BY 'jobpassword';
GRANT ALL PRIVILEGES ON health_adviser.* TO 'jobuser'@'localhost';
FLUSH PRIVILEGES;


SELECT user, host FROM mysql.user;
SHOW GRANTS FOR 'jobuser'@'localhost';

ALTER USER 'jobuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'jobpassword';
FLUSH PRIVILEGES;

select * from health_questions;


delete from health_questions where id > 0;








/*Inserting data under role*/
INSERT INTO userroles(roletype) values ('admin');
INSERT INTO userroles(roletype) values ('customer');
commit;
/*Creating the admin user*/
INSERT INTO USERS (address,email,firstname,lastname,password,phonenumber,roleid,username) 
SELECT 'India','admin@foodbox.com','admin','admin','admin@foodbox','1234567891','1','admin'
where not exists(select * from users where username='admin');
COMMIT;
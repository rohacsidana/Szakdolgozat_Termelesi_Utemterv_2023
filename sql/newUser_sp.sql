create proc newUser
       @name varchar(30) = null,
       @birth_date date = null,
	   @email varchar(50) = null,
	   @password varchar(32) = null,
	   @post varchar(10) = null
as 
	insert into "USER" values(@name, @birth_date, @email, @password, @post)
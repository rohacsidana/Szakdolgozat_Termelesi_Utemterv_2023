use Utemterv
go
create proc newUser
       @name varchar(30) = null,
       @birth_date date = null,
	   @email varchar(50) = null,
	   @password varchar(32) = null,
	   @post varchar(10) = null
as 
	declare @id int
	insert into "USER" values(@name, @birth_date, @email, @password, @post)
	set @id = IDENT_CURRENT('USER')
	select *
	from "USER"
	where "user_id" =@id
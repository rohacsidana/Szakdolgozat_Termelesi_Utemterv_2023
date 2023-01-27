create proc woList
as 
select *
from WO_MSTR

--exec woList


create proc wodAll
	@lot int
as

select *
from wod_det



--------**USER**-----------
create proc userList

as 
select user_id, name, birth_date, email, post
from "user"

go
create proc newUser
       @name varchar(30) = null,
       @birth_date date = null,
	   @email varchar(50) = null,
	   @password varchar(32) = null,
	   @post varchar(10) = null
as 
	insert into "USER" values(@name, @birth_date, @email, @password, @post)
go

exec newUser 'Szabo Magda Z�mb�',  '1969-04-20', 'szabojudit@hotmail.cz','Aa123456','2'
--exec userList

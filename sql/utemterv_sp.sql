create proc woList
as 
select *
from WO_MSTR

--exec woList

go

create proc getWo
	@lot int
as
select *
from WO_MSTR
where wo_lot = @lot

--exec getWo 10000
go




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

--exec newUser 'Szabo Magda Zambo',  '1969-04-20', 'szabojudit@hotmail.cz','Aa123456','2'
--exec userList
create proc tesztSzerk
	@part int
as

with szerkezet(szulo, gyerek, szint, beepulo)
as
(
	select null as szulo, pt.pt_part as gyerek, 1 as szint, cast(1 as decimal(18,5)) as beepulo
	from pt_mstr pt
	where pt.pt_part = @part
	union all
	select ps.ps_par , ps.ps_comp, sz.szint + 1, cast(ps.ps_qty_per * sz.beepulo as decimal(18,5)) 
	from PS_MSTR ps, szerkezet sz
	where ps.ps_par = sz.gyerek
)
select * from szerkezet


-- exec tesztSzerk 1000

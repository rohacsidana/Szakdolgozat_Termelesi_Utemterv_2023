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
/*
create proc newWo2
	@wo_nbr varchar(18), @wo_part int, @wo_qty_ord int, @wo_due_date datetime
as
	declare @wo_lot int
	create table #tempSzerkezet ( parent int, child int, qty_req decimal(18,5), szint int)
	begin try
		insert into WO_MSTR (wo_nbr, wo_part, wo_qty_ord, wo_due_date) values (@wo_nbr, @wo_part, @wo_qty_ord, cast(@wo_due_date as date))
		set @wo_lot = ident_current('WO_MSTR');
		
		
		with #tempSzerkezet (parent, child, qty_req, szint)
			as
			(
				select  null as parent, pt.pt_part as child, cast(@wo_qty_ord as decimal(18,5)) as qty_req, 1 as szint
				from pt_mstr pt
				where pt.pt_part = @wo_part
				union all
				select ps.ps_par, ps.ps_comp, cast(ps.ps_qty_per as decimal(18,5)) *  cast(tsz.qty_req as decimal(18,5)), szint + 1  
				from #tempSzerkezet tsz inner join PS_MSTR ps on tsz.child = ps.ps_par
				
				
			)
				select * from #tempSzerkezet


		drop table #tempSzerkezet
	end try
		
	begin catch
		drop table #tempSzerkezet
			print('hiba')
			rollback
	end catch	
	
	

	go


	



--exec newWo1 'teszt3', 1000, 300, '20220202'



create proc tesztWO
	@part int,
	@qty_req decimal(18,5)
as
with tempSzerkezet (parent, child, qty_req, szint)
			as
			(
				select  null as parent, pt.pt_part as child, cast(@qty_req as decimal(18,5)) as qty_req, 1 as szint
				from pt_mstr pt
				where pt.pt_part = @part
				union all
				select ps.ps_par, ps.ps_comp, cast(cast(ps.ps_qty_per as decimal(18,5)) *  cast(tsz.qty_req as decimal(18,5)) as decimal(18,5)), szint + 1  
				from tempSzerkezet tsz inner join PS_MSTR ps on tsz.child = ps.ps_par
				
				
			)
				select * from tempSzerkezet


exec tesztWO 1000, 300
*/
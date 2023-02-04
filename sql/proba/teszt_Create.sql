--create database Utemterv

--GO

--use Utemterv

/*
--ezeket külön külön (cr func)
GO

create function [dbo].[keszTermekE]
(
	@part int
)
returns bit
as
begin
	declare @dbElofordulas int = 0;

	select @dbElofordulas = COUNT(*)
	from PS_MSTR
	where ps_comp = @part

	if(@dbElofordulas = 0)
		return 1
	
	return 0

end


GO


create function [dbo].[getTypeDic]
(
	@value varchar(10)
)
returns varchar(10)
as
begin
	declare @type varchar(10) = ''

	select @type = d.type
	from DICTIONARY d
	where d.value = @value

	return @type
end



*/

GO

--Tables
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create table DICTIONARY
(
	"value" varchar(10),
	"type" varchar(10),
	"desc" varchar(40),
	primary key("value")
)

GO



SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create table PT_MSTR
(
	pt_part int identity(1000, 1), ----valami
	pt_desc varchar(24) not null,
	pt_um varchar(10) not null, ---dic
	pt_qty_oh decimal(18,5) --CK_PT_OH
	primary key(pt_part)
)
GO


SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create table PS_MSTR 
(
	ps_par int,
	ps_comp int,
	ps_qty_per decimal(18,5) not null,
	primary key(ps_par, ps_comp)
)
GO


SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create table LD_DET
(
	ld_part int,
	ld_expire date,
	ld_qty_oh decimal(18,5) not null default(0.0),
	ld_qty_rsrv decimal(18,5) not null default(0.0),
	ld_qty_scrp decimal(18,5) not null default(0.0),
	primary key(ld_part, ld_expire)
)

GO


SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create table LN_MSTR
(
	ln_line varchar(8),
	ln_desc varchar(24),
	primary key(ln_line)
)


GO


SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create table LND_DET
(
	lnd_line varchar(8),
	lnd_part int,
	lnd_rate decimal(18,5) not null,
	primary key(lnd_line, lnd_part)
)


GO


SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create table CHG_MSTR
(
	chg_line varchar(8),
	chg_from int,
	chg_to int,
	chg_time time(0) not null,
	primary key(chg_line, chg_from, chg_to)
)
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create table "USER"
(
	"user_id" int identity(0, 10),
	"name" varchar(30) not null,
	birth_date date not null,
	email varchar(50) not null unique,
	"password" varchar(32) not null,
	post varchar(10) not null,
	primary key("user_id")	
)

GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create table WO_MSTR
(
	wo_lot int identity(10000, 10), -----flag
	wo_nbr varchar(18) not null,
	wo_user int,
	wo_part int not null,
	wo_line varchar(8),
	wo_seq int,
	wo_qty_ord int not null,
	wo_ord_date datetime not null default(getDate()),
	wo_due_date date not null,
	wo_start_date date,
	wo_rel_date date,
	wo_est_run time(0),
	wo_start_time time(0),
	wo_end_time datetime,
	wo_pld_downtime time(0),
	wo_unpld_downtime time(0),
	wo_activated bit not null default(0),
	wo_status varchar(10) not null, ---dic
	primary key(wo_lot)
)

GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create table WOD_DET
(
	wod_part int,
	wod_par int,
	wod_lot int,
	wod_qty_req decimal(18,5) not null,
	wod_qty_compl int not null default(0),
	wod_qty_rjct int not null default(0),
	primary key(wod_part, wod_par, wod_lot)
)

GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create table WOM_DET
(
	wom_part int,
	wom_par int,
	wom_lot int,
	wom_mat int,
	wom_req decimal(18,5)  not null,
	wom_rsrv decimal(18,5) not null default(0),
	primary key(wom_part, wom_par, wom_lot, wom_mat)
)

GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create table LAD_DET
(
	lad_id int identity(20000, 10), ----dadsada
	lad_part int,
	lad_par int,
	lad_lot int,
	lad_comp int,
	lad_expire date,
	lad_qty_rsrv decimal(18,5)  not null,
	lad_qty_used decimal(18,5)  not null default(0) check(lad_qty_used >= 0),
	primary key(lad_id)
)

GO	

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create table XWO_HIST
(
	xwo_year char(4),
	xwo_week char(2),
	xwo_lot int,
	xwo_version tinyint,
	xwo_est_run time(0),
	xwo_seq int,
	xwo_start_date date,
	xwo_start_time time(0),
	xwo_end_time datetime,
	xwo_pld_downtime time(0),
	xwo_unpld_downtime time(0),
	primary key(xwo_year, xwo_week, xwo_lot, xwo_version)
)

GO

--FK

alter table PS_MSTR
add foreign key (ps_par) references PT_MSTR(pt_part),
foreign key (ps_comp) references PT_MSTR(pt_part)

GO

alter table LD_DET
add foreign key (ld_part) references PT_MSTR(pt_part)

GO

alter table LND_DET
add foreign key (lnd_line) references LN_MSTR(ln_line),
foreign key (lnd_part) references PT_MSTR(pt_part)

GO

alter table CHG_MSTR
add foreign key (chg_line) references LN_MSTR(ln_line),
foreign key (chg_from) references PT_MSTR(pt_part),
foreign key (chg_to) references PT_MSTR(pt_part)

GO

alter table WO_MSTR
add foreign key (wo_user) references "USER"("user_id"),
foreign key (wo_part) references PT_MSTR(pt_part),
foreign key (wo_line) references LN_MSTR(ln_line)

GO

alter table WOD_DET
add foreign key (wod_part) references PT_MSTR(pt_part),
foreign key (wod_par) references PT_MSTR(pt_part),
foreign key (wod_lot) references WO_MSTR(wo_lot)

GO

alter table WOM_DET
add foreign key (wom_part, wom_par,wom_lot) references WOD_DET(wod_part, wod_par, wod_lot),
foreign key (wom_mat) references PT_MSTR(pt_part)

GO

alter table LAD_DET
add foreign key (lad_part,lad_par,lad_lot) references WOD_DET(wod_part,wod_par,wod_lot),
foreign key (lad_comp,lad_expire) references LD_DET(ld_part,ld_expire)

GO

alter table XWO_HIST
add foreign key (xwo_lot) references WO_MSTR(wo_lot)
GO

insert into DICTIONARY values('waiting','wo_status','Gyr elfogadásra vár')
insert into DICTIONARY values('accepted','wo_status','Gyr elfogadva')
insert into DICTIONARY values('ongoing','wo_status','Gyr gyártása folyamatban')
insert into DICTIONARY values('completed','wo_status', 'Gyr gyártása befejezõdött')

GO


alter table wo_mstr
add constraint CK_WO_MSTR_Kesz_Termek_E check(dbo.keszTermekE(wo_part) = 1)

GO

alter table WO_MSTR
add constraint CK_WO_MSTR_Status check(dbo.getTypeDic(wo_status) is not null and dbo.getTypeDic(wo_status) = 'wo_status')

GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[k_f_termekek]
as
select distinct  pt.pt_part as part
from PT_MSTR pt inner join PS_MSTR ps on pt.pt_part = ps.ps_par

GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[userList]
as
select "user_id", "name", birth_date, email, post
from "USER"

GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[ptps]
as
select ps.ps_par as parent, pt2.pt_desc as parent_desc, pt2.pt_um as parent_um, ps.ps_comp as child, pt.pt_desc as child_desc, pt.pt_um as child_um, ps_qty_per as child_per_par
from PS_MSTR ps inner join PT_MSTR pt on ps.ps_comp = pt.pt_part
				inner join PT_MSTR pt2 on ps.ps_par = pt2.pt_part and pt2.pt_part <> pt.pt_part

GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[ptList] as
select *
from PT_MSTR

GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[updatePt]
       @pt_part int,
       @pt_desc varchar(24)
as 
begin
	UPDATE PT_MSTR
	set pt_desc = @pt_desc
	WHERE pt_part = @pt_part
end
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[newPt]
       @pt_desc varchar(24),
	   @pt_um varchar(24)
as 
begin
	declare @part int
	insert into PT_MSTR values(@pt_desc, @pt_um, null)
	set @part = IDENT_CURRENT('PT_MSTR')
	select *
	from PT_MSTR
	where pt_part = @part
end
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[deletePt]
		@pt_part int
as
begin
	delete PT_MSTR
	where pt_part = @pt_part
	and not exists
	(
	select 1 from PS_MSTR
	where ps_par = @pt_part or ps_comp = @pt_part
	)
	and not exists
	(
		select *
		from LND_DET
		where lnd_part = @pt_part
	)and not exists
	(
		select *
		from CHG_MSTR
		where chg_from = @pt_part or chg_to = @pt_part
	)and not exists
	(
		select *
		from WO_MSTR
		where wo_part = @pt_part
	)and not exists
	(
		select *
		from WOD_DET
		where wod_part = @pt_part or wod_par = @pt_part
	)and not exists
	(
		select *
		from WOM_DET
		where wom_par = @pt_part or wom_part = @pt_part
	)and not exists
	(
		select *
		from LD_DET
		where ld_part= @pt_part
	)
	and not exists
	(
		select *
		from LAD_DET
		where lad_comp = @pt_part or lad_par = @pt_part  or lad_part = @pt_part
	)
end
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[updateUser]
       @id int ,
	   @name varchar(30) ,
       @birth_date varchar(8),
	   @email varchar(50) ,
	   @password varchar(32) ,
	   @post varchar(10) 
as 
begin
	UPDATE "USER"
	SET "name" = @name, birth_date = @birth_date, email = @email, "password" = @password, post = @post
	WHERE "user_id" = @id
end
GO


SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[newUser]
       @name varchar(30) = null,
       @birth_date date = null,
	   @email varchar(50) = null,
	   @password varchar(32) = null,
	   @post varchar(10) = null
as 
begin
	declare @id int
	insert into "USER" values(@name, @birth_date, @email, @password, @post)
	set @id = IDENT_CURRENT('USER')
	select *
	from "USER"
	where "user_id" = @id
end

GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[deleteUser]
       @id int
as 
begin
	DELETE FROM "USER"
	WHERE @id = "user_id"
	and not exists
	(
	select 1 from WO_MSTR
	where wo_user = @id
	)
end
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[woList]
as 
begin
	select *
	from WO_MSTR
end
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[updateWo]
(
	@wo_lot int,
	@wo_nbr varchar(18),
	@wo_part int,
	@wo_line varchar(8),
	@wo_seq int,
	@wo_qty_ord int,
	@wo_due_date date,
	@wo_start_date date,
	@wo_status varchar(10)
	)
as
begin
	update WO_MSTR
	set wo_nbr = @wo_nbr,wo_part = @wo_part, wo_line = @wo_line, wo_seq = @wo_seq, wo_qty_ord = @wo_qty_ord, wo_status = @wo_status
	where wo_lot = @wo_lot		   

	select * from WO_MSTR where wo_lot = @wo_lot
end

GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[newWo]
	@wo_nbr varchar(18), @wo_part int, @wo_qty_ord int, @wo_due_date datetime
as
begin
	declare @lot int
	--set nocount on
	insert into WO_MSTR (wo_nbr, wo_part, wo_qty_ord, wo_due_date, wo_status) values 
						(@wo_nbr, @wo_part, @wo_qty_ord, cast(@wo_due_date as date), 'waiting')
	set @lot = IDENT_CURRENT('WO_MSTR')

	select *
	from WO_MSTR
	where wo_lot = @lot
end

GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[getWo]
	@lot int
as
begin
	select *
	from WO_MSTR
	where wo_lot = @lot
end
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[wodAll]
	@lot int
as
begin
	select *
	from wod_det
	where wod_lot = @lot
end
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[segedSzerk]
	@part int
as
begin
	with seged(part, par, szint)
	as
	(
		select pt_part as part, pt_part as par,1 as szint
		from PT_MSTR pt
		where pt.pt_part = @part
		union all
		select ps.ps_comp, ps.ps_par, s.szint + 1
		from PS_MSTR ps inner join seged s on ps.ps_par = s.part
		where exists (select 1 from PS_MSTR psB where psB.ps_par = ps.ps_comp)
	)select * from seged
end
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[newStructure]
(
	@wo_lot int,  @wo_part int, @wo_qty_ord int
)
as
	begin
	drop table if exists #tempSzerkezet;
	create table #tempSzerkezet (elozo int, parent int, child int, qty_req decimal(18,5), szint int);

	with seged (elozo, parent, child, qty_req, szint)
			as
			(
				select @wo_part as elozo,  @wo_part as parent, pt.pt_part as child, cast(@wo_qty_ord as decimal(18,5)) as qty_req, 1 as szint
				from pt_mstr pt
				where pt.pt_part = @wo_part
				union all
				select s.parent, ps.ps_par, ps.ps_comp, cast(cast(ps.ps_qty_per as decimal(18,5)) *  cast(s.qty_req as decimal(18,5)) as decimal(18,5)), s.szint + 1  
				from seged s inner join PS_MSTR ps on s.child = ps.ps_par

			)
			insert into #tempSzerkezet
				select * from seged

		insert into WOD_DET 
		select tmp.child, tmp.parent, @wo_lot, tmp.qty_req, 0, 0
		from #tempSzerkezet tmp
		where exists (select 1 from dbo.k_f_termekek kf where kf.part = tmp.child)
 
		insert into WOM_DET
		select tmp.parent, tmp.elozo,  @wo_lot, tmp.child, tmp.qty_req, 0
		from #tempSzerkezet tmp 
		where not exists (select 1 from dbo.k_f_termekek kf2 where kf2.part = tmp.child)

		drop table #tempSzerkezet
	end
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create TRIGGER [dbo].[UpdateStatus]
   on WO_MSTR
   AFTER UPDATE
AS 
BEGIN
	SET NOCOUNT ON
	declare @oldStatus varchar(10), @newStatus varchar(10), @kellRB bit = 0, @wo_lot int , @wo_part int, @wo_qty_ord int

	select @oldStatus = wo_status
	from deleted

	select @newStatus = wo_status, @wo_lot = wo_lot, @wo_part = wo_part, @wo_qty_ord = wo_qty_ord
	from inserted


	if(@oldStatus <> @newStatus)
	begin
		set @kellRB = case
			when @oldStatus = 'waiting' and @newStatus <> 'accepted' then 1
			when @oldStatus = 'accepted' and @newStatus <> 'ongoing' then 1
			when @oldStatus = 'ongoing' and @newStatus <> 'completed' then 1
			else 0
		end
	end
	
	if(@kellRB <> 1 and @oldStatus = 'waiting' and @newStatus = 'accepted')
		begin
			exec newStructure @wo_lot , @wo_part , @wo_qty_ord 
		end

	if(@kellRB = 1)
		begin
			rollback
		end
END

GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create trigger [dbo].[Wom_pt_qty_oh]
	on WOM_DET
	after INSERT
as
begin
	update PT_MSTR
	set	pt_qty_oh = IIF(pt_qty_oh is null, inserted.wom_req * -1, pt_qty_oh - inserted.wom_req)
	from inserted
	where pt_part = inserted.wom_mat
end

GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create trigger [dbo].[Lad_reserve]
	on LAD_DET
	after insert
as
begin
	update WOM_DET
	set wom_rsrv += inserted.lad_qty_rsrv 
	from inserted
	where wom_lot = inserted.lad_lot and wom_part = inserted.lad_part  and wom_par = inserted.lad_par  
	and wom_mat = inserted.lad_comp
	
	update LD_DET
	set ld_qty_oh -= inserted.lad_qty_rsrv, ld_qty_rsrv += inserted.lad_qty_rsrv  
	from inserted
	where ld_part = inserted.lad_comp and ld_expire = inserted.lad_expire


	update PT_MSTR
	set pt_qty_oh = pt_qty_oh - inserted.lad_qty_rsrv
	from inserted
	where pt_part = inserted.lad_comp
end



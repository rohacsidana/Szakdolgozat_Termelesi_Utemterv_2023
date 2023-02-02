go
create database Utemterv

go
use Utemterv
go
--Tables
create table DICTIONARY
(
	"value" varchar(10),
	"type" varchar(10),
	"desc" varchar(40),
	primary key("value")
)

go

create table PT_MSTR
(
	pt_part int identity(1000, 1), ----valami
	pt_desc varchar(24) not null,
	pt_um varchar(10) not null, ---dic
	pt_qty_oh decimal(18,5) --CK_PT_OH
	primary key(pt_part)
)

go

create table PS_MSTR 
(
	ps_par int,
	ps_comp int,
	ps_qty_per decimal(18,5) not null,
	primary key(ps_par, ps_comp)
)

go

create table LD_DET
(
	ld_part int,
	ld_expire date,
	ld_qty_oh decimal(18,5) not null default(0.0),
	ld_qty_rsrv decimal(18,5) not null default(0.0),
	ld_qty_scrp decimal(18,5) not null default(0.0),
	primary key(ld_part, ld_expire)
)

go

create table LN_MSTR
(
	ln_line varchar(8),
	ln_desc varchar(24),
	primary key(ln_line)
)

go

create table LND_DET
(
	lnd_line varchar(8),
	lnd_part int,
	lnd_rate decimal(18,5) not null,
	primary key(lnd_line, lnd_part)
)

go

create table CHG_MSTR
(
	chg_line varchar(8),
	chg_from int,
	chg_to int,
	chg_time time(0) not null,
	primary key(chg_line, chg_from, chg_to)
)
go

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

go

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

go

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

go

create table WOM_DET
(
	wom_part int,
	wom_par int,
	wom_lot int,
	wom_mat int,
	wom_req decimal(18,5)  not null,
	wom_rsrv decimal(18,5) not null default(0),
	primary key(wom_part, wom_par, wom_lot)
)

go

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

go 

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

go

--FK

alter table PS_MSTR
add foreign key (ps_par) references PT_MSTR(pt_part),
foreign key (ps_comp) references PT_MSTR(pt_part)

go

alter table LD_DET
add foreign key (ld_part) references PT_MSTR(pt_part)

go

alter table LND_DET
add foreign key (lnd_line) references LN_MSTR(ln_line),
foreign key (lnd_part) references PT_MSTR(pt_part)

go

alter table CHG_MSTR
add foreign key (chg_line) references LN_MSTR(ln_line),
foreign key (chg_from) references PT_MSTR(pt_part),
foreign key (chg_to) references PT_MSTR(pt_part)

go

alter table WO_MSTR
add foreign key (wo_user) references "USER"("user_id"),
foreign key (wo_part) references PT_MSTR(pt_part),
foreign key (wo_line) references LN_MSTR(ln_line)

go

alter table WOD_DET
add foreign key (wod_part) references PT_MSTR(pt_part),
foreign key (wod_par) references PT_MSTR(pt_part),
foreign key (wod_lot) references WO_MSTR(wo_lot)

go

alter table WOM_DET
add foreign key (wom_part, wom_par,wom_lot) references WOD_DET(wod_part, wod_par, wod_lot),
foreign key (wom_mat) references PT_MSTR(pt_part)

go

alter table LAD_DET
add foreign key (lad_part,lad_par,lad_lot) references WOD_DET(wod_part,wod_par,wod_lot),
foreign key (lad_comp,lad_expire) references LD_DET(ld_part,ld_expire)

go

alter table XWO_HIST
add foreign key (xwo_lot) references WO_MSTR(wo_lot)

insert into DICTIONARY values('waiting','wo_status','Gyr elfogadásra vár');
insert into DICTIONARY values('accepted','wo_status','Gyr elfogadva');
insert into DICTIONARY values('ongoing','wo_status','Gyr gyártása folyamatban');
insert into DICTIONARY values('completed','wo_status', 'Gyr gyártása befejezõdött');
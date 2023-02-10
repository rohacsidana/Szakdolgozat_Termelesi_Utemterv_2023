--create database Utemterv
USE [Utemterv]
GO
/****** Object:  UserDefinedFunction [dbo].[getTypeDic]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
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

GO
/****** Object:  UserDefinedFunction [dbo].[hurokHiba]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-----ps mstr constraint
-----ne lehessen olyan szerkezetet felvinni, ahol a késztermék egyik beépülője saját maga
create function [dbo].[hurokHiba] (@par int, @comp int) --1-et ad vissza, ha talált hurkot, 0-t, ha nincs hurok
returns int
as
begin
	declare @vissza int;
	with fa(par)
	as
	(
		select @par as par
		union all 
		select PS.ps_par from PS_MSTR PS inner join fa on PS.ps_comp = fa.par
	)
	select @vissza = count(*) from fa where fa.par = @comp
	
return @vissza
end
GO
/****** Object:  UserDefinedFunction [dbo].[keszTermekE]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
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
/****** Object:  UserDefinedFunction [dbo].[ldPartNotInSzerkezetes]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create function [dbo].[ldPartNotInSzerkezetes](@part int)
	
	returns bit
	as
	BEGIN
        declare @benne bit
		if (@part in (select * from szerkezetesAnyagok))
			set @benne = 1
		if (@part not in (select * from szerkezetesAnyagok))
			set @benne = 0
		return @benne
    END
GO
/****** Object:  Table [dbo].[PT_MSTR]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PT_MSTR](
	[pt_part] [int] IDENTITY(1000,1) NOT NULL,
	[pt_desc] [varchar](24) NOT NULL,
	[pt_um] [varchar](10) NOT NULL,
	[pt_qty_oh] [decimal](18, 5) NULL,
PRIMARY KEY CLUSTERED 
(
	[pt_part] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WOD_DET]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WOD_DET](
	[wod_part] [int] NOT NULL,
	[wod_par] [int] NOT NULL,
	[wod_lot] [int] NOT NULL,
	[wod_qty_req] [decimal](18, 5) NOT NULL,
	[wod_qty_compl] [int] NOT NULL,
	[wod_qty_rjct] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[wod_part] ASC,
	[wod_par] ASC,
	[wod_lot] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[vw_Wod]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE view [dbo].[vw_Wod]
as
select wod_lot as lot, wod_part as part, beepulo.pt_desc as part_name, wod_par as parent, szulo.pt_desc as parent_name, wod_qty_req as qty_req, beepulo.pt_um as part_um, wod_qty_compl as qty_compl, wod_qty_rjct as qty_rjct
from WOD_DET inner join PT_MSTR beepulo on wod_part = beepulo.pt_part
			inner join PT_MSTR szulo on wod_par = szulo.pt_part
GO
/****** Object:  Table [dbo].[PS_MSTR]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PS_MSTR](
	[ps_par] [int] NOT NULL,
	[ps_comp] [int] NOT NULL,
	[ps_qty_per] [decimal](18, 5) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ps_par] ASC,
	[ps_comp] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[szerkezetesAnyagok]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Szerkezettel rendelkező Késztermékek
create view [dbo].[szerkezetesAnyagok] as 
select pt.pt_part
from PT_MSTR pt  inner join PS_MSTR ps on pt.pt_part = ps.ps_par
except
select ps.ps_comp
from PS_MSTR ps
GO
/****** Object:  View [dbo].[k_f_termekek]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE view [dbo].[k_f_termekek]
as

select distinct  pt.pt_part as part
from PT_MSTR pt inner join PS_MSTR ps on pt.pt_part = ps.ps_par

--select * from k_f_termekek

GO
/****** Object:  View [dbo].[ptps]    Script Date: 2023.02.10. 12:43:55 ******/
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
/****** Object:  Table [dbo].[CHG_MSTR]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CHG_MSTR](
	[chg_line] [varchar](8) NOT NULL,
	[chg_from] [int] NOT NULL,
	[chg_to] [int] NOT NULL,
	[chg_time] [time](0) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[chg_line] ASC,
	[chg_from] ASC,
	[chg_to] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DICTIONARY]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DICTIONARY](
	[value] [varchar](10) NOT NULL,
	[type] [varchar](10) NULL,
	[desc] [varchar](40) NULL,
PRIMARY KEY CLUSTERED 
(
	[value] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LAD_DET]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LAD_DET](
	[lad_id] [int] IDENTITY(20000,10) NOT NULL,
	[lad_part] [int] NULL,
	[lad_par] [int] NULL,
	[lad_lot] [int] NULL,
	[lad_comp] [int] NULL,
	[lad_expire] [date] NULL,
	[lad_qty_rsrv] [decimal](18, 5) NOT NULL,
	[lad_qty_used] [decimal](18, 5) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[lad_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LD_DET]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LD_DET](
	[ld_part] [int] NOT NULL,
	[ld_expire] [date] NOT NULL,
	[ld_qty_oh] [decimal](18, 5) NOT NULL,
	[ld_qty_rsrv] [decimal](18, 5) NOT NULL,
	[ld_qty_scrp] [decimal](18, 5) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ld_part] ASC,
	[ld_expire] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LN_MSTR]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LN_MSTR](
	[ln_line] [varchar](8) NOT NULL,
	[ln_desc] [varchar](24) NULL,
PRIMARY KEY CLUSTERED 
(
	[ln_line] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LND_DET]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LND_DET](
	[lnd_line] [varchar](8) NOT NULL,
	[lnd_part] [int] NOT NULL,
	[lnd_rate] [decimal](18, 5) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[lnd_line] ASC,
	[lnd_part] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USER]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USER](
	[user_id] [int] IDENTITY(0,10) NOT NULL,
	[name] [varchar](30) NOT NULL,
	[birth_date] [date] NOT NULL,
	[email] [varchar](50) NOT NULL,
	[password] [varchar](32) NOT NULL,
	[post] [varchar](10) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WO_MSTR]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WO_MSTR](
	[wo_lot] [int] IDENTITY(10000,10) NOT NULL,
	[wo_nbr] [varchar](18) NOT NULL,
	[wo_user] [int] NULL,
	[wo_part] [int] NOT NULL,
	[wo_line] [varchar](8) NULL,
	[wo_seq] [int] NULL,
	[wo_qty_ord] [int] NOT NULL,
	[wo_ord_date] [datetime] NOT NULL,
	[wo_due_date] [date] NOT NULL,
	[wo_start_date] [date] NULL,
	[wo_rel_date] [date] NULL,
	[wo_est_run] [time](0) NULL,
	[wo_start_time] [time](0) NULL,
	[wo_end_time] [datetime] NULL,
	[wo_pld_downtime] [time](0) NULL,
	[wo_unpld_downtime] [time](0) NULL,
	[wo_activated] [bit] NOT NULL,
	[wo_status] [varchar](10) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[wo_lot] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WOM_DET]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WOM_DET](
	[wom_part] [int] NOT NULL,
	[wom_par] [int] NOT NULL,
	[wom_lot] [int] NOT NULL,
	[wom_mat] [int] NOT NULL,
	[wom_req] [decimal](18, 5) NOT NULL,
	[wom_rsrv] [decimal](18, 5) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[wom_part] ASC,
	[wom_par] ASC,
	[wom_lot] ASC,
	[wom_mat] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[XWO_HIST]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[XWO_HIST](
	[xwo_year] [char](4) NOT NULL,
	[xwo_week] [char](2) NOT NULL,
	[xwo_lot] [int] NOT NULL,
	[xwo_version] [tinyint] NOT NULL,
	[xwo_est_run] [time](0) NULL,
	[xwo_seq] [int] NULL,
	[xwo_start_date] [date] NULL,
	[xwo_start_time] [time](0) NULL,
	[xwo_end_time] [datetime] NULL,
	[xwo_pld_downtime] [time](0) NULL,
	[xwo_unpld_downtime] [time](0) NULL,
PRIMARY KEY CLUSTERED 
(
	[xwo_year] ASC,
	[xwo_week] ASC,
	[xwo_lot] ASC,
	[xwo_version] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[LAD_DET] ADD  DEFAULT ((0)) FOR [lad_qty_used]
GO
ALTER TABLE [dbo].[LD_DET] ADD  DEFAULT ((0.0)) FOR [ld_qty_oh]
GO
ALTER TABLE [dbo].[LD_DET] ADD  DEFAULT ((0.0)) FOR [ld_qty_rsrv]
GO
ALTER TABLE [dbo].[LD_DET] ADD  DEFAULT ((0.0)) FOR [ld_qty_scrp]
GO
ALTER TABLE [dbo].[WO_MSTR] ADD  DEFAULT (getdate()) FOR [wo_ord_date]
GO
ALTER TABLE [dbo].[WO_MSTR] ADD  DEFAULT ((0)) FOR [wo_activated]
GO
ALTER TABLE [dbo].[WOD_DET] ADD  DEFAULT ((0)) FOR [wod_qty_compl]
GO
ALTER TABLE [dbo].[WOD_DET] ADD  DEFAULT ((0)) FOR [wod_qty_rjct]
GO
ALTER TABLE [dbo].[WOM_DET] ADD  DEFAULT ((0)) FOR [wom_rsrv]
GO
ALTER TABLE [dbo].[CHG_MSTR]  WITH CHECK ADD FOREIGN KEY([chg_from])
REFERENCES [dbo].[PT_MSTR] ([pt_part])
GO
ALTER TABLE [dbo].[CHG_MSTR]  WITH CHECK ADD FOREIGN KEY([chg_line])
REFERENCES [dbo].[LN_MSTR] ([ln_line])
GO
ALTER TABLE [dbo].[CHG_MSTR]  WITH CHECK ADD FOREIGN KEY([chg_to])
REFERENCES [dbo].[PT_MSTR] ([pt_part])
GO
ALTER TABLE [dbo].[LAD_DET]  WITH CHECK ADD FOREIGN KEY([lad_part], [lad_par], [lad_lot])
REFERENCES [dbo].[WOD_DET] ([wod_part], [wod_par], [wod_lot])
GO
ALTER TABLE [dbo].[LAD_DET]  WITH CHECK ADD FOREIGN KEY([lad_comp], [lad_expire])
REFERENCES [dbo].[LD_DET] ([ld_part], [ld_expire])
GO
ALTER TABLE [dbo].[LD_DET]  WITH CHECK ADD FOREIGN KEY([ld_part])
REFERENCES [dbo].[PT_MSTR] ([pt_part])
GO
ALTER TABLE [dbo].[LND_DET]  WITH CHECK ADD FOREIGN KEY([lnd_line])
REFERENCES [dbo].[LN_MSTR] ([ln_line])
GO
ALTER TABLE [dbo].[LND_DET]  WITH CHECK ADD FOREIGN KEY([lnd_part])
REFERENCES [dbo].[PT_MSTR] ([pt_part])
GO
ALTER TABLE [dbo].[PS_MSTR]  WITH CHECK ADD FOREIGN KEY([ps_comp])
REFERENCES [dbo].[PT_MSTR] ([pt_part])
GO
ALTER TABLE [dbo].[PS_MSTR]  WITH CHECK ADD FOREIGN KEY([ps_par])
REFERENCES [dbo].[PT_MSTR] ([pt_part])
GO
ALTER TABLE [dbo].[WO_MSTR]  WITH CHECK ADD FOREIGN KEY([wo_line])
REFERENCES [dbo].[LN_MSTR] ([ln_line])
GO
ALTER TABLE [dbo].[WO_MSTR]  WITH CHECK ADD FOREIGN KEY([wo_part])
REFERENCES [dbo].[PT_MSTR] ([pt_part])
GO
ALTER TABLE [dbo].[WO_MSTR]  WITH CHECK ADD FOREIGN KEY([wo_user])
REFERENCES [dbo].[USER] ([user_id])
GO
ALTER TABLE [dbo].[WOD_DET]  WITH CHECK ADD FOREIGN KEY([wod_lot])
REFERENCES [dbo].[WO_MSTR] ([wo_lot])
GO
ALTER TABLE [dbo].[WOD_DET]  WITH CHECK ADD FOREIGN KEY([wod_part])
REFERENCES [dbo].[PT_MSTR] ([pt_part])
GO
ALTER TABLE [dbo].[WOD_DET]  WITH CHECK ADD FOREIGN KEY([wod_par])
REFERENCES [dbo].[PT_MSTR] ([pt_part])
GO
ALTER TABLE [dbo].[WOM_DET]  WITH CHECK ADD FOREIGN KEY([wom_part], [wom_par], [wom_lot])
REFERENCES [dbo].[WOD_DET] ([wod_part], [wod_par], [wod_lot])
GO
ALTER TABLE [dbo].[WOM_DET]  WITH CHECK ADD FOREIGN KEY([wom_mat])
REFERENCES [dbo].[PT_MSTR] ([pt_part])
GO
ALTER TABLE [dbo].[XWO_HIST]  WITH CHECK ADD FOREIGN KEY([xwo_lot])
REFERENCES [dbo].[WO_MSTR] ([wo_lot])
GO
ALTER TABLE [dbo].[LAD_DET]  WITH CHECK ADD CHECK  (([lad_qty_used]>=(0)))
GO
ALTER TABLE [dbo].[LD_DET]  WITH CHECK ADD  CONSTRAINT [CK_Szerkezetes_anyagok] CHECK  (([dbo].[ldPartNotInSzerkezetes]([ld_part])=(0)))
GO
ALTER TABLE [dbo].[LD_DET] CHECK CONSTRAINT [CK_Szerkezetes_anyagok]
GO
ALTER TABLE [dbo].[PS_MSTR]  WITH CHECK ADD  CONSTRAINT [CK_Azonos_par_comp] CHECK  (([ps_par]<>[ps_comp]))
GO
ALTER TABLE [dbo].[PS_MSTR] CHECK CONSTRAINT [CK_Azonos_par_comp]
GO
ALTER TABLE [dbo].[WO_MSTR]  WITH CHECK ADD  CONSTRAINT [CK_WO_MSTR_Kesz_Termek_E] CHECK  (([dbo].[keszTermekE]([wo_part])=(1)))
GO
ALTER TABLE [dbo].[WO_MSTR] CHECK CONSTRAINT [CK_WO_MSTR_Kesz_Termek_E]
GO
ALTER TABLE [dbo].[WO_MSTR]  WITH CHECK ADD  CONSTRAINT [CK_WO_MSTR_Status] CHECK  (([dbo].[getTypeDic]([wo_status]) IS NOT NULL AND [dbo].[getTypeDic]([wo_status])='wo_status'))
GO
ALTER TABLE [dbo].[WO_MSTR] CHECK CONSTRAINT [CK_WO_MSTR_Status]
GO
/****** Object:  StoredProcedure [dbo].[deleteLd]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[deleteLd]
	@part int,
	@exp varchar(8)
as
	delete from LD_DET
	where ld_part = @part and ld_expire = @exp
	and not exists
	(
	select 1 from LAD_DET
	where lad_part = @part
	and lad_expire = @exp
	)
GO
/****** Object:  StoredProcedure [dbo].[deleteLn]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[deleteLn]
	@line varchar(8)
as
begin
	delete LN_MSTR
	where ln_line = @line
	and not exists
	(
	select 1 from LND_DET
	where lnd_line = @line
	)
	and not exists
	(
	select 1 from CHG_MSTR
	where chg_line = @line
	)
	and not exists
	(
	select 1 from WO_MSTR
	where wo_line = @line
	)
end
GO
/****** Object:  StoredProcedure [dbo].[deletePs]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[deletePs]
@par int,
@comp int
as
delete from PS_MSTR where ps_par = @par and ps_comp = @comp
GO
/****** Object:  StoredProcedure [dbo].[deletePt]    Script Date: 2023.02.10. 12:43:55 ******/
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
/****** Object:  StoredProcedure [dbo].[deleteUser]    Script Date: 2023.02.10. 12:43:55 ******/
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
/****** Object:  StoredProcedure [dbo].[estrun]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[estrun]
	@part int, @req int, @line varchar(8)
as

with seged (part, par,qty_req, ido, szint)
as
( 
	select p.pt_part as part, p.pt_part as par, cast(@req as decimal(18,5)) as qty_req, cast(@req/lnd.lnd_rate as decimal(18,5)) as ido, 1 as szint
	from PT_MSTR p inner join LND_DET lnd on lnd.lnd_part = p.pt_part and lnd.lnd_line = @line
	where p.pt_part = @part
	
	union all
	
	select ps.ps_comp, ps.ps_par, cast(ps.ps_qty_per * s.qty_req as decimal(18,5)), cast(ps.ps_qty_per * s.qty_req / lnd.lnd_rate as decimal(18,5)), s.szint + 1
	from PS_MSTR  ps inner join seged s on ps.ps_par = s.part
					inner join LND_DET lnd on ps.ps_comp = lnd.lnd_part and lnd.lnd_line = @line
	
)
select CAST(CONVERT(VARCHAR,DATEADD(SECOND, sum(seged2.ido) * 3600, 0),108) AS TIME)
from (
select szint, max(ido) as ido
from seged
group by szint
) as seged2


/**********************/

--with seged (part, par,qty_req, ido,sor, szint)
--as
--( 
--	select p.pt_part as part, p.pt_part as par, cast(1 as decimal(18,5)) as qty_req, cast(1/lnd.lnd_rate as decimal(18,5)) as ido,lnd.lnd_line, 1 as szint
--	from PT_MSTR p inner join LND_DET lnd on lnd.lnd_part = p.pt_part
--	where not exists (select 1 from PS_MSTR ps2 where ps2.ps_comp = p.pt_part)
	
--	union all
	
--	select ps.ps_comp, ps.ps_par, cast(ps.ps_qty_per * s.qty_req as decimal(18,5)), cast(ps.ps_qty_per * s.qty_req / lnd.lnd_rate as decimal(18,5)),lnd.lnd_line, s.szint + 1
--	from PS_MSTR  ps inner join seged s on ps.ps_par = s.part 
--					inner join LND_DET lnd on ps.ps_comp = lnd.lnd_part and lnd.lnd_line = s.sor
	
--)
--select * from seged

--select CAST(CONVERT(VARCHAR,DATEADD(SECOND, sum(seged2.ido) * 3600, 0),108) AS TIME)

--set identity_insert PT_MSTR off

--insert into PT_MSTR (pt_part, pt_desc, pt_um, pt_qty_oh) values (100000, 'késztermék teszt', 'g', null)
--insert into PS_MSTR values(100000,1002, 2)
--insert into LND_DET values('sor1', 100000, 43.98693)

--insert into PT_MSTR (pt_part, pt_desc, pt_um, pt_qty_oh) values (100000, 'teszt1', 'g', null)
--insert into PT_MSTR (pt_part, pt_desc, pt_um, pt_qty_oh) values (100000, 'teszt1', 'g', null)
--insert into PT_MSTR (pt_part, pt_desc, pt_um, pt_qty_oh) values (100000, 'teszt1', 'g', null)

GO
/****** Object:  StoredProcedure [dbo].[getWo]    Script Date: 2023.02.10. 12:43:55 ******/
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
/****** Object:  StoredProcedure [dbo].[newLd]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[newLd]
	   @part int = null,
       @expire varchar(8)= null,
	   @oh decimal(18,5) = null
as 
	insert into LD_DET values(@part, cast(@expire as date), @oh, 0, 0)
GO
/****** Object:  StoredProcedure [dbo].[newLn]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[newLn]
       @ln_line varchar(8),
	   @ln_desc varchar(24)
as 
begin
	insert into LN_MSTR values(@ln_line, @ln_desc)
	select * from LN_MSTR where ln_line = @ln_line

end

GO
/****** Object:  StoredProcedure [dbo].[newPs]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[newPs]
@par int,
@comp int,
@qty dec(18,5)
as
begin
insert into PS_MSTR values(@par, @comp, @qty)
select ps_par, ps_comp, ps_qty_per from PS_MSTR where ps_par = @par and ps_comp = @comp
end
GO
/****** Object:  StoredProcedure [dbo].[newPt]    Script Date: 2023.02.10. 12:43:55 ******/
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
/****** Object:  StoredProcedure [dbo].[newStructure]    Script Date: 2023.02.10. 12:43:55 ******/
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
/****** Object:  StoredProcedure [dbo].[newUser]    Script Date: 2023.02.10. 12:43:55 ******/
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
/****** Object:  StoredProcedure [dbo].[newWo]    Script Date: 2023.02.10. 12:43:55 ******/
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
/****** Object:  StoredProcedure [dbo].[segedSzerk]    Script Date: 2023.02.10. 12:43:55 ******/
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
/****** Object:  StoredProcedure [dbo].[tesztSzerk]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[tesztSzerk]
	@part int
as
--Adott tétel szerkezete
with szerkezet(szulo, gyerek, szint)
as
(
	select null as szulo, pt.pt_part as gyerek, 1 as szint
	from pt_mstr pt
	where pt.pt_part = @part
	union all
	select ps.ps_par , ps.ps_comp, sz.szint + 1
	from PS_MSTR ps, szerkezet sz
	where ps.ps_par = sz.gyerek
)
select * from szerkezet
GO
/****** Object:  StoredProcedure [dbo].[updateLd]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[updateLd]
	@part int,
	@exp varchar(8),
	@oh decimal(18,5)
as
	

	update LD_DET set ld_qty_oh = @oh
	where ld_part = @part and ld_expire = @exp

	
GO
/****** Object:  StoredProcedure [dbo].[updateLn]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[updateLn]
	@ln_line varchar(8),
	@ln_desc varchar(24)
as
begin
	update "LN_MSTR"
	set ln_desc = @ln_desc
	where ln_line = @ln_line
end
GO
/****** Object:  StoredProcedure [dbo].[updatePs]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[updatePs] 
@par int,
@comp int,
@qty dec(18,5)
as begin
update PS_MSTR set ps_qty_per = @qty
where ps_par = @par and ps_comp = @comp
end


GO
/****** Object:  StoredProcedure [dbo].[updatePt]    Script Date: 2023.02.10. 12:43:55 ******/
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
/****** Object:  StoredProcedure [dbo].[updateUser]    Script Date: 2023.02.10. 12:43:55 ******/
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
/****** Object:  StoredProcedure [dbo].[updateWo]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[updateWo]
(
	@wo_nbr varchar(18),
	@wo_part int,
	@wo_qty_ord int,
	@wo_due_date datetime,
	@wo_lot int,	
	@wo_start_date datetime,
	@wo_rel_date datetime,
	@wo_line varchar(8),
	@wo_status varchar(10),
	@wo_activated bit
	)
as
begin
	update WO_MSTR
	set wo_nbr = @wo_nbr,wo_part = @wo_part, wo_qty_ord = @wo_qty_ord, wo_due_date = cast(@wo_due_date as date), wo_start_date = cast(@wo_start_date as date), wo_rel_date = cast(@wo_rel_date as date), wo_line = @wo_line, wo_status = @wo_status, wo_activated = @wo_activated
	where wo_lot = @wo_lot		   

	select * from WO_MSTR where wo_lot = @wo_lot
end
GO
/****** Object:  StoredProcedure [dbo].[wodAll]    Script Date: 2023.02.10. 12:43:55 ******/
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
/****** Object:  StoredProcedure [dbo].[woList]    Script Date: 2023.02.10. 12:43:55 ******/
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
/****** Object:  Trigger [dbo].[Lad_reserve]    Script Date: 2023.02.10. 12:43:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create trigger [dbo].[Lad_reserve]
	on [dbo].[LAD_DET]
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



GO
ALTER TABLE [dbo].[LAD_DET] ENABLE TRIGGER [Lad_reserve]
GO
/****** Object:  Trigger [dbo].[ldDetInsert]    Script Date: 2023.02.10. 12:43:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create trigger [dbo].[ldDetInsert] on [dbo].[LD_DET]
instead of insert
as
begin

declare @part int, @date date, @qty decimal(18,5), @rsrv decimal(18,5), @scrap decimal(18,5)
select @part = ld_part, @date = ld_expire, @qty = ld_qty_oh, @rsrv = ld_qty_rsrv, @scrap = ld_qty_scrp from inserted 

if (@part in (select ld_part from LD_DET where ld_expire = @date))
	begin
	update LD_DET 
	set ld_qty_oh = ld_qty_oh + @qty
	
	end
else
	begin
		insert into LD_DET values (@part, @date, @qty, @rsrv, @scrap)
	end
update PT_MSTR
	set pt_qty_oh = IIF(pt_qty_oh is null, @qty, pt_qty_oh + @qty)
	where pt_part = @part
end
GO
ALTER TABLE [dbo].[LD_DET] ENABLE TRIGGER [ldDetInsert]
GO
/****** Object:  Trigger [dbo].[torleskorPtUpdate]    Script Date: 2023.02.10. 12:43:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create trigger [dbo].[torleskorPtUpdate] on [dbo].[LD_DET]
for delete
as
declare @ohDeleted decimal(18,5), @part int;
select @ohDeleted = ld_qty_oh, @part = ld_part from deleted
update PT_MSTR set pt_qty_oh = pt_qty_oh - @ohDeleted
	where pt_part = @part
GO
ALTER TABLE [dbo].[LD_DET] ENABLE TRIGGER [torleskorPtUpdate]
GO
/****** Object:  Trigger [dbo].[updatedLd]    Script Date: 2023.02.10. 12:43:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create trigger [dbo].[updatedLd] on [dbo].[LD_DET]
after update
as
	declare @ujOh decimal(18,5),@part int, @regiOh decimal(18,5), @kulonbseg decimal(18,5);
	
	select @regiOh = ld_qty_oh, @part = ld_part
	from deleted

	select @ujOh = ld_qty_oh
	from inserted

	set @kulonbseg = @ujOh - @regiOh

	if @ujOh >= @regiOh
	begin
	update PT_MSTR set pt_qty_oh  = pt_qty_oh + @kulonbseg
	where pt_part = @part
	end

	if @ujOh < @regiOh
	begin
	update PT_MSTR set pt_qty_oh  = pt_qty_oh - abs(@kulonbseg)
	where pt_part = @part
	end
	
GO
ALTER TABLE [dbo].[LD_DET] ENABLE TRIGGER [updatedLd]
GO
/****** Object:  Trigger [dbo].[SzerkFelv]    Script Date: 2023.02.10. 12:43:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create trigger [dbo].[SzerkFelv] on [dbo].[PS_MSTR]
instead of insert
as
begin
	declare @par int
	declare @comp int
	declare @qty decimal(18,5)
	select @par = ps_par, @comp = ps_comp, @qty = ps_qty_per from inserted
	if (dbo.hurokHiba(@par, @comp) = 0)
	begin
		insert into PS_MSTR values (@par, @comp, @qty)
	end
	else
	begin
		rollback
	end
end
GO
ALTER TABLE [dbo].[PS_MSTR] ENABLE TRIGGER [SzerkFelv]
GO
/****** Object:  Trigger [dbo].[UpdateStatus]    Script Date: 2023.02.10. 12:43:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create TRIGGER [dbo].[UpdateStatus]
   on [dbo].[WO_MSTR]
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
ALTER TABLE [dbo].[WO_MSTR] ENABLE TRIGGER [UpdateStatus]
GO
/****** Object:  Trigger [dbo].[Wom_pt_qty_oh]    Script Date: 2023.02.10. 12:43:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create trigger [dbo].[Wom_pt_qty_oh]
	on [dbo].[WOM_DET]
	after INSERT
as
begin
	update PT_MSTR
	set	pt_qty_oh = IIF(pt_qty_oh is null, inserted.wom_req * -1, pt_qty_oh - inserted.wom_req)
	from inserted
	where pt_part = inserted.wom_mat
end


GO
ALTER TABLE [dbo].[WOM_DET] ENABLE TRIGGER [Wom_pt_qty_oh]
GO

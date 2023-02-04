USE [master]
GO
/****** Object:  Database [Utemterv]    Script Date: 2023. 02. 04. 17:02:31 ******/
CREATE DATABASE [Utemterv]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Utemterv', FILENAME = N'G:\Új mappa (2)\MSSQL15.MSSQLSERVER\MSSQL\DATA\Utemterv.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Utemterv_log', FILENAME = N'G:\Új mappa (2)\MSSQL15.MSSQLSERVER\MSSQL\DATA\Utemterv_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [Utemterv] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Utemterv].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Utemterv] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Utemterv] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Utemterv] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Utemterv] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Utemterv] SET ARITHABORT OFF 
GO
ALTER DATABASE [Utemterv] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Utemterv] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Utemterv] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Utemterv] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Utemterv] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Utemterv] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Utemterv] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Utemterv] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Utemterv] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Utemterv] SET  ENABLE_BROKER 
GO
ALTER DATABASE [Utemterv] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Utemterv] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Utemterv] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Utemterv] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Utemterv] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Utemterv] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Utemterv] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Utemterv] SET RECOVERY FULL 
GO
ALTER DATABASE [Utemterv] SET  MULTI_USER 
GO
ALTER DATABASE [Utemterv] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Utemterv] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Utemterv] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Utemterv] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Utemterv] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Utemterv] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'Utemterv', N'ON'
GO
ALTER DATABASE [Utemterv] SET QUERY_STORE = OFF
GO
USE [Utemterv]
GO
/****** Object:  UserDefinedFunction [dbo].[getTypeDic]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
/****** Object:  UserDefinedFunction [dbo].[keszTermekE]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
/****** Object:  Table [dbo].[PT_MSTR]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
/****** Object:  Table [dbo].[PS_MSTR]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
/****** Object:  View [dbo].[k_f_termekek]    Script Date: 2023. 02. 04. 17:02:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[k_f_termekek]
as
select distinct  pt.pt_part as part
from PT_MSTR pt inner join PS_MSTR ps on pt.pt_part = ps.ps_par

GO
/****** Object:  Table [dbo].[USER]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[userList]    Script Date: 2023. 02. 04. 17:02:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[userList]
as
select "user_id", "name", birth_date, email, post
from "USER"

GO
/****** Object:  View [dbo].[ptps]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
/****** Object:  View [dbo].[ptList]    Script Date: 2023. 02. 04. 17:02:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[ptList] as
select *
from PT_MSTR

GO
/****** Object:  Table [dbo].[CHG_MSTR]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
/****** Object:  Table [dbo].[DICTIONARY]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
/****** Object:  Table [dbo].[LAD_DET]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
/****** Object:  Table [dbo].[LD_DET]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
/****** Object:  Table [dbo].[LN_MSTR]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
/****** Object:  Table [dbo].[LND_DET]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
/****** Object:  Table [dbo].[WO_MSTR]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
/****** Object:  Table [dbo].[WOD_DET]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
/****** Object:  Table [dbo].[WOM_DET]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
/****** Object:  Table [dbo].[XWO_HIST]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
INSERT [dbo].[DICTIONARY] ([value], [type], [desc]) VALUES (N'accepted', N'wo_status', N'Gyr elfogadva')
GO
INSERT [dbo].[DICTIONARY] ([value], [type], [desc]) VALUES (N'completed', N'wo_status', N'Gyr gyártása befejeződött')
GO
INSERT [dbo].[DICTIONARY] ([value], [type], [desc]) VALUES (N'ongoing', N'wo_status', N'Gyr gyártása folyamatban')
GO
INSERT [dbo].[DICTIONARY] ([value], [type], [desc]) VALUES (N'waiting', N'wo_status', N'Gyr elfogadásra vár')
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__USER__AB6E6164C8DCCE19]    Script Date: 2023. 02. 04. 17:02:32 ******/
ALTER TABLE [dbo].[USER] ADD UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
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
ALTER TABLE [dbo].[WO_MSTR]  WITH CHECK ADD  CONSTRAINT [CK_WO_MSTR_Kesz_Termek_E] CHECK  (([dbo].[keszTermekE]([wo_part])=(1)))
GO
ALTER TABLE [dbo].[WO_MSTR] CHECK CONSTRAINT [CK_WO_MSTR_Kesz_Termek_E]
GO
ALTER TABLE [dbo].[WO_MSTR]  WITH CHECK ADD  CONSTRAINT [CK_WO_MSTR_Status] CHECK  (([dbo].[getTypeDic]([wo_status]) IS NOT NULL AND [dbo].[getTypeDic]([wo_status])='wo_status'))
GO
ALTER TABLE [dbo].[WO_MSTR] CHECK CONSTRAINT [CK_WO_MSTR_Status]
GO
/****** Object:  StoredProcedure [dbo].[deletePt]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
/****** Object:  StoredProcedure [dbo].[deleteUser]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
/****** Object:  StoredProcedure [dbo].[getWo]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
/****** Object:  StoredProcedure [dbo].[newPt]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
/****** Object:  StoredProcedure [dbo].[newStructure]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
/****** Object:  StoredProcedure [dbo].[newUser]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
/****** Object:  StoredProcedure [dbo].[newWo]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
/****** Object:  StoredProcedure [dbo].[segedSzerk]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
/****** Object:  StoredProcedure [dbo].[updatePt]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
/****** Object:  StoredProcedure [dbo].[updateUser]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
/****** Object:  StoredProcedure [dbo].[updateWo]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
/****** Object:  StoredProcedure [dbo].[wodAll]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
/****** Object:  StoredProcedure [dbo].[woList]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
/****** Object:  Trigger [dbo].[Lad_reserve]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
/****** Object:  Trigger [dbo].[UpdateStatus]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
/****** Object:  Trigger [dbo].[Wom_pt_qty_oh]    Script Date: 2023. 02. 04. 17:02:32 ******/
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
USE [master]
GO
ALTER DATABASE [Utemterv] SET  READ_WRITE 
GO

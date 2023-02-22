USE [Utemterv]
GO
/****** Object:  Trigger [UpdateStatus]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP TRIGGER [dbo].[UpdateStatus]
GO
/****** Object:  Trigger [SzerkFelv]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP TRIGGER [dbo].[SzerkFelv]
GO
/****** Object:  Trigger [updatedLd]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP TRIGGER [dbo].[updatedLd]
GO
/****** Object:  Trigger [torleskorPtUpdate]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP TRIGGER [dbo].[torleskorPtUpdate]
GO
/****** Object:  Trigger [ldDetInsert]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP TRIGGER [dbo].[ldDetInsert]
GO
/****** Object:  Trigger [lad_used_update]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP TRIGGER [dbo].[lad_used_update]
GO
/****** Object:  Trigger [lad_reserve_update]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP TRIGGER [dbo].[lad_reserve_update]
GO
/****** Object:  Trigger [Lad_reserve]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP TRIGGER [dbo].[Lad_reserve]
GO
/****** Object:  StoredProcedure [dbo].[woList]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[woList]
GO
/****** Object:  StoredProcedure [dbo].[woDelete]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[woDelete]
GO
/****** Object:  StoredProcedure [dbo].[wodAll]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[wodAll]
GO
/****** Object:  StoredProcedure [dbo].[validateUser]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[validateUser]
GO
/****** Object:  StoredProcedure [dbo].[updateWoSeq]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[updateWoSeq]
GO
/****** Object:  StoredProcedure [dbo].[updateWod]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[updateWod]
GO
/****** Object:  StoredProcedure [dbo].[updateWo]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[updateWo]
GO
/****** Object:  StoredProcedure [dbo].[updateUser]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[updateUser]
GO
/****** Object:  StoredProcedure [dbo].[updatePt]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[updatePt]
GO
/****** Object:  StoredProcedure [dbo].[updatePs]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[updatePs]
GO
/****** Object:  StoredProcedure [dbo].[updateLnd]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[updateLnd]
GO
/****** Object:  StoredProcedure [dbo].[updateLn]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[updateLn]
GO
/****** Object:  StoredProcedure [dbo].[updateLd]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[updateLd]
GO
/****** Object:  StoredProcedure [dbo].[updateLad]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[updateLad]
GO
/****** Object:  StoredProcedure [dbo].[updateChg]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[updateChg]
GO
/****** Object:  StoredProcedure [dbo].[tesztSzerk]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[tesztSzerk]
GO
/****** Object:  StoredProcedure [dbo].[segedSzerk]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[segedSzerk]
GO
/****** Object:  StoredProcedure [dbo].[scheduleWo]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[scheduleWo]
GO
/****** Object:  StoredProcedure [dbo].[newWo]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[newWo]
GO
/****** Object:  StoredProcedure [dbo].[newUser]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[newUser]
GO
/****** Object:  StoredProcedure [dbo].[newStructure]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[newStructure]
GO
/****** Object:  StoredProcedure [dbo].[newPt]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[newPt]
GO
/****** Object:  StoredProcedure [dbo].[newPs]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[newPs]
GO
/****** Object:  StoredProcedure [dbo].[newLnd]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[newLnd]
GO
/****** Object:  StoredProcedure [dbo].[newLn]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[newLn]
GO
/****** Object:  StoredProcedure [dbo].[newLd]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[newLd]
GO
/****** Object:  StoredProcedure [dbo].[newLad]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[newLad]
GO
/****** Object:  StoredProcedure [dbo].[newChg]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[newChg]
GO
/****** Object:  StoredProcedure [dbo].[getWo]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[getWo]
GO
/****** Object:  StoredProcedure [dbo].[getHetiUtemterv]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[getHetiUtemterv]
GO
/****** Object:  StoredProcedure [dbo].[estrun]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[estrun]
GO
/****** Object:  StoredProcedure [dbo].[deleteUser]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[deleteUser]
GO
/****** Object:  StoredProcedure [dbo].[deletePt]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[deletePt]
GO
/****** Object:  StoredProcedure [dbo].[deletePs]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[deletePs]
GO
/****** Object:  StoredProcedure [dbo].[deleteLnd]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[deleteLnd]
GO
/****** Object:  StoredProcedure [dbo].[deleteLn]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[deleteLn]
GO
/****** Object:  StoredProcedure [dbo].[deleteLd]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[deleteLd]
GO
/****** Object:  StoredProcedure [dbo].[deleteChg]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[deleteChg]
GO
/****** Object:  StoredProcedure [dbo].[changePwByNormalUser]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[changePwByNormalUser]
GO
/****** Object:  StoredProcedure [dbo].[changePwByAdminUser]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP PROCEDURE [dbo].[changePwByAdminUser]
GO
ALTER TABLE [dbo].[WO_MSTR] DROP CONSTRAINT [CK_WO_MSTR_wo_seq_un]
GO
ALTER TABLE [dbo].[WO_MSTR] DROP CONSTRAINT [CK_WO_MSTR_Status]
GO
ALTER TABLE [dbo].[WO_MSTR] DROP CONSTRAINT [CK_WO_MSTR_Kesz_Termek_E]
GO
ALTER TABLE [dbo].[WO_MSTR] DROP CONSTRAINT [CK_WO_MSTR_indithatoE]
GO
ALTER TABLE [dbo].[WO_MSTR] DROP CONSTRAINT [CK_WO_MSTR_can_activate]
GO
ALTER TABLE [dbo].[PS_MSTR] DROP CONSTRAINT [CK_Azonos_par_comp]
GO
ALTER TABLE [dbo].[LD_DET] DROP CONSTRAINT [CK_Szerkezetes_anyagok]
GO
ALTER TABLE [dbo].[LAD_DET] DROP CONSTRAINT [CK_odaTartozik]
GO
ALTER TABLE [dbo].[LAD_DET] DROP CONSTRAINT [CK__LAD_DET__lad_qty__6754599E]
GO
ALTER TABLE [dbo].[CHG_MSTR] DROP CONSTRAINT [FromAndToNotSame]
GO
ALTER TABLE [dbo].[CHG_MSTR] DROP CONSTRAINT [csakKesztermekek]
GO
ALTER TABLE [dbo].[XWO_HIST] DROP CONSTRAINT [FK__XWO_HIST__xwo_lo__656C112C]
GO
ALTER TABLE [dbo].[WOM_DET] DROP CONSTRAINT [FK__WOM_DET__6477ECF3]
GO
ALTER TABLE [dbo].[WOM_DET] DROP CONSTRAINT [FK__WOM_DET__6383C8BA]
GO
ALTER TABLE [dbo].[WOD_DET] DROP CONSTRAINT [FK__WOD_DET__wod_par__628FA481]
GO
ALTER TABLE [dbo].[WOD_DET] DROP CONSTRAINT [FK__WOD_DET__wod_par__619B8048]
GO
ALTER TABLE [dbo].[WOD_DET] DROP CONSTRAINT [FK__WOD_DET__wod_lot__60A75C0F]
GO
ALTER TABLE [dbo].[WO_MSTR] DROP CONSTRAINT [FK__WO_MSTR__wo_user__5FB337D6]
GO
ALTER TABLE [dbo].[WO_MSTR] DROP CONSTRAINT [FK__WO_MSTR__wo_part__5EBF139D]
GO
ALTER TABLE [dbo].[WO_MSTR] DROP CONSTRAINT [FK__WO_MSTR__wo_line__5DCAEF64]
GO
ALTER TABLE [dbo].[PS_MSTR] DROP CONSTRAINT [FK__PS_MSTR__ps_par__5CD6CB2B]
GO
ALTER TABLE [dbo].[PS_MSTR] DROP CONSTRAINT [FK__PS_MSTR__ps_comp__5BE2A6F2]
GO
ALTER TABLE [dbo].[LND_DET] DROP CONSTRAINT [FK__LND_DET__lnd_par__5AEE82B9]
GO
ALTER TABLE [dbo].[LND_DET] DROP CONSTRAINT [FK__LND_DET__lnd_lin__59FA5E80]
GO
ALTER TABLE [dbo].[LD_DET] DROP CONSTRAINT [FK__LD_DET__ld_part__59063A47]
GO
ALTER TABLE [dbo].[LAD_DET] DROP CONSTRAINT [FK__LAD_DET__5812160E]
GO
ALTER TABLE [dbo].[LAD_DET] DROP CONSTRAINT [FK__LAD_DET__571DF1D5]
GO
ALTER TABLE [dbo].[CHG_MSTR] DROP CONSTRAINT [FK__CHG_MSTR__chg_to__5629CD9C]
GO
ALTER TABLE [dbo].[CHG_MSTR] DROP CONSTRAINT [FK__CHG_MSTR__chg_li__5535A963]
GO
ALTER TABLE [dbo].[CHG_MSTR] DROP CONSTRAINT [FK__CHG_MSTR__chg_fr__5441852A]
GO
ALTER TABLE [dbo].[WOM_DET] DROP CONSTRAINT [DF__WOM_DET__wom_rsr__534D60F1]
GO
ALTER TABLE [dbo].[WOD_DET] DROP CONSTRAINT [DF__WOD_DET__wod_qty__52593CB8]
GO
ALTER TABLE [dbo].[WOD_DET] DROP CONSTRAINT [DF__WOD_DET__wod_qty__5165187F]
GO
ALTER TABLE [dbo].[WO_MSTR] DROP CONSTRAINT [DF__WO_MSTR__wo_acti__5070F446]
GO
ALTER TABLE [dbo].[WO_MSTR] DROP CONSTRAINT [DF_WO_MSTR_wo_unpld_downtime]
GO
ALTER TABLE [dbo].[WO_MSTR] DROP CONSTRAINT [DF__WO_MSTR__wo_ord___4F7CD00D]
GO
ALTER TABLE [dbo].[LD_DET] DROP CONSTRAINT [DF__LD_DET__ld_qty_s__4E88ABD4]
GO
ALTER TABLE [dbo].[LD_DET] DROP CONSTRAINT [DF__LD_DET__ld_qty_r__4D94879B]
GO
ALTER TABLE [dbo].[LD_DET] DROP CONSTRAINT [DF__LD_DET__ld_qty_o__4CA06362]
GO
/****** Object:  Table [dbo].[XWO_HIST]    Script Date: 2023. 02. 22. 21:56:32 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[XWO_HIST]') AND type in (N'U'))
DROP TABLE [dbo].[XWO_HIST]
GO
/****** Object:  Table [dbo].[WOM_DET]    Script Date: 2023. 02. 22. 21:56:32 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[WOM_DET]') AND type in (N'U'))
DROP TABLE [dbo].[WOM_DET]
GO
/****** Object:  Table [dbo].[USER]    Script Date: 2023. 02. 22. 21:56:32 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[USER]') AND type in (N'U'))
DROP TABLE [dbo].[USER]
GO
/****** Object:  Table [dbo].[LD_DET]    Script Date: 2023. 02. 22. 21:56:32 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[LD_DET]') AND type in (N'U'))
DROP TABLE [dbo].[LD_DET]
GO
/****** Object:  Table [dbo].[LAD_DET]    Script Date: 2023. 02. 22. 21:56:32 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[LAD_DET]') AND type in (N'U'))
DROP TABLE [dbo].[LAD_DET]
GO
/****** Object:  Table [dbo].[DICTIONARY]    Script Date: 2023. 02. 22. 21:56:32 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DICTIONARY]') AND type in (N'U'))
DROP TABLE [dbo].[DICTIONARY]
GO
/****** Object:  Table [dbo].[CHG_MSTR]    Script Date: 2023. 02. 22. 21:56:32 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[CHG_MSTR]') AND type in (N'U'))
DROP TABLE [dbo].[CHG_MSTR]
GO
/****** Object:  View [dbo].[ptps]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP VIEW [dbo].[ptps]
GO
/****** Object:  View [dbo].[szerkezetesAnyagok]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP VIEW [dbo].[szerkezetesAnyagok]
GO
/****** Object:  View [dbo].[vw_Wod]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP VIEW [dbo].[vw_Wod]
GO
/****** Object:  Table [dbo].[WOD_DET]    Script Date: 2023. 02. 22. 21:56:32 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[WOD_DET]') AND type in (N'U'))
DROP TABLE [dbo].[WOD_DET]
GO
/****** Object:  View [dbo].[nincsSzerkezete]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP VIEW [dbo].[nincsSzerkezete]
GO
/****** Object:  View [dbo].[hetiUtemterv]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP VIEW [dbo].[hetiUtemterv]
GO
/****** Object:  Table [dbo].[WO_MSTR]    Script Date: 2023. 02. 22. 21:56:32 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[WO_MSTR]') AND type in (N'U'))
DROP TABLE [dbo].[WO_MSTR]
GO
/****** Object:  Table [dbo].[LN_MSTR]    Script Date: 2023. 02. 22. 21:56:32 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[LN_MSTR]') AND type in (N'U'))
DROP TABLE [dbo].[LN_MSTR]
GO
/****** Object:  View [dbo].[kesztermekek_h_e]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP VIEW [dbo].[kesztermekek_h_e]
GO
/****** Object:  Table [dbo].[LND_DET]    Script Date: 2023. 02. 22. 21:56:32 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[LND_DET]') AND type in (N'U'))
DROP TABLE [dbo].[LND_DET]
GO
/****** Object:  View [dbo].[k_f_termekek]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP VIEW [dbo].[k_f_termekek]
GO
/****** Object:  Table [dbo].[PT_MSTR]    Script Date: 2023. 02. 22. 21:56:32 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[PT_MSTR]') AND type in (N'U'))
DROP TABLE [dbo].[PT_MSTR]
GO
/****** Object:  Table [dbo].[PS_MSTR]    Script Date: 2023. 02. 22. 21:56:32 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[PS_MSTR]') AND type in (N'U'))
DROP TABLE [dbo].[PS_MSTR]
GO
/****** Object:  UserDefinedFunction [dbo].[workWeekSeq]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP FUNCTION [dbo].[workWeekSeq]
GO
/****** Object:  UserDefinedFunction [dbo].[vanEStrukturaja]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP FUNCTION [dbo].[vanEStrukturaja]
GO
/****** Object:  UserDefinedFunction [dbo].[szerkezetesE]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP FUNCTION [dbo].[szerkezetesE]
GO
/****** Object:  UserDefinedFunction [dbo].[segedDatumIdoSum]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP FUNCTION [dbo].[segedDatumIdoSum]
GO
/****** Object:  UserDefinedFunction [dbo].[ptFaStruktura]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP FUNCTION [dbo].[ptFaStruktura]
GO
/****** Object:  UserDefinedFunction [dbo].[orankentiEgyseg]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP FUNCTION [dbo].[orankentiEgyseg]
GO
/****** Object:  UserDefinedFunction [dbo].[odaTartozik]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP FUNCTION [dbo].[odaTartozik]
GO
/****** Object:  UserDefinedFunction [dbo].[ldPartNotInSzerkezetes]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP FUNCTION [dbo].[ldPartNotInSzerkezetes]
GO
/****** Object:  UserDefinedFunction [dbo].[keszTermekE]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP FUNCTION [dbo].[keszTermekE]
GO
/****** Object:  UserDefinedFunction [dbo].[isChgInSzerkezetesAnyagok]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP FUNCTION [dbo].[isChgInSzerkezetesAnyagok]
GO
/****** Object:  UserDefinedFunction [dbo].[indithatoE]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP FUNCTION [dbo].[indithatoE]
GO
/****** Object:  UserDefinedFunction [dbo].[hurokHiba]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP FUNCTION [dbo].[hurokHiba]
GO
/****** Object:  UserDefinedFunction [dbo].[getTypeDic]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP FUNCTION [dbo].[getTypeDic]
GO
/****** Object:  UserDefinedFunction [dbo].[GetPTTreeStructure]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP FUNCTION [dbo].[GetPTTreeStructure]
GO
/****** Object:  UserDefinedFunction [dbo].[GetPSTreeStructure]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP FUNCTION [dbo].[GetPSTreeStructure]
GO
/****** Object:  UserDefinedFunction [dbo].[checkSameFromTo]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP FUNCTION [dbo].[checkSameFromTo]
GO
USE [master]
GO
/****** Object:  Database [Utemterv]    Script Date: 2023. 02. 22. 21:56:32 ******/
DROP DATABASE [Utemterv]
GO
/****** Object:  Database [Utemterv]    Script Date: 2023. 02. 22. 21:56:32 ******/
CREATE DATABASE [Utemterv]
GO
SET DATEFIRST 1;
GO
USE [Utemterv]
GO
/****** Object:  UserDefinedFunction [dbo].[checkSameFromTo]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE function [dbo].[checkSameFromTo](@line varchar(8), @from int, @to int)
returns bit
as
begin
declare @van bit
set @van = 0
if (@from = (select chg_to from chg_mstr where chg_line = @line and chg_to = @from and chg_from = @to)) set @van = 1

return @van
end
GO
/****** Object:  UserDefinedFunction [dbo].[GetPSTreeStructure]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[GetPSTreeStructure] (@ps_par INT)
RETURNS @Structure TABLE (
    ps_par INT,
    ps_comp INT,
    level INT,
    ps_qty_per decimal(18,5)
)
AS
BEGIN
    WITH temp AS (
    SELECT ps_par, ps_comp, 1 AS level, CAST(ps_qty_per AS decimal(18, 5)) AS ps_qty_per
    FROM PS_MSTR
    WHERE ps_par = @ps_par
UNION ALL
    SELECT PS_MSTR.ps_par, PS_MSTR.ps_comp, temp.level + 1, CAST(temp.ps_qty_per * PS_MSTR.ps_qty_per AS decimal(18, 5)) AS ps_qty_per
    FROM PS_MSTR
    JOIN temp ON temp.ps_comp = PS_MSTR.ps_par
)
    INSERT INTO @Structure (ps_par, ps_comp, level, ps_qty_per)
    SELECT ps_par, ps_comp, level, ps_qty_per
    FROM temp, PT_MSTR par, PT_MSTR comp where ps_par = par.pt_part and ps_comp = comp.pt_part
    ORDER BY level desc
    RETURN
END


--select * from dbo.GetPSTreeStructure (1007)
GO
/****** Object:  UserDefinedFunction [dbo].[GetPTTreeStructure]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[GetPTTreeStructure] (@ps_par int)
RETURNS @Structure TABLE (ps_par int, ps_comp int, level int)
AS
BEGIN
    WITH temp AS (
        SELECT ps_par, ps_comp, 1 AS level
        FROM PS_MSTR
        WHERE ps_par = @ps_par
    UNION ALL
        SELECT PS_MSTR.ps_par, PS_MSTR.ps_comp, temp.level + 1
        FROM PS_MSTR
        JOIN temp ON temp.ps_comp = PS_MSTR.ps_par
    )
    INSERT INTO @Structure (ps_par, ps_comp, level)
    SELECT ps_par, ps_comp, level
    FROM temp
    ORDER BY level
    RETURN
END
GO
/****** Object:  UserDefinedFunction [dbo].[getTypeDic]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  UserDefinedFunction [dbo].[hurokHiba]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-----ps mstr constraint
-----ne lehessen olyan szerkezetet felvinni, ahol a késztermék egyik beépülője saját maga
CREATE function [dbo].[hurokHiba] (@par int, @comp int) --1-et ad vissza, ha talált hurkot, 0-t, ha nincs hurok
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
/****** Object:  UserDefinedFunction [dbo].[indithatoE]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create function [dbo].[indithatoE]
(
@lot int
)
returns int
as
begin
	declare @nemFutjaDb int;

	select @nemFutjaDb = COUNT(*)
	from wom_det
	where wom_lot = @lot
	and wom_req > wom_rsrv;

	return @nemFutjaDb;
end
/*Ha megvan írva hogy pontosan a req mennyiséget kell lefoglalni akkor it a (wom_req > wom_rsrv) -nak wom_req <> wom_rsrv kell lennie  */
GO
/****** Object:  UserDefinedFunction [dbo].[isChgInSzerkezetesAnyagok]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE function [dbo].[isChgInSzerkezetesAnyagok](@from int, @to int)
	
	returns bit
	as
	BEGIN
        declare @benne bit
		set @benne = 0
		if (@from in (select * from szerkezetesAnyagok) 
		and @to in(select * from szerkezetesAnyagok)) set @benne = 1

		return @benne
    END
GO
/****** Object:  UserDefinedFunction [dbo].[keszTermekE]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  UserDefinedFunction [dbo].[ldPartNotInSzerkezetes]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  UserDefinedFunction [dbo].[odaTartozik]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create function [dbo].[odaTartozik]
(
	@part int, @par int, @mat int, @lot int
)
returns int
as
begin
	declare @rsrv decimal(18,5), @eredmeny bit = 0;

	return(select COUNT(*)
	from wom_det
	where wom_part = @part
	and wom_par = @par
	and wom_mat = @mat
	and wom_lot = @lot)

end
GO
/****** Object:  UserDefinedFunction [dbo].[orankentiEgyseg]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE function [dbo].[orankentiEgyseg]
(
@part int, @line varchar(8)
)
returns decimal(18,5)
as
begin
	declare @egys decimal(18,5);

	with seged (par, part,lehet, /*lehet_req,*/ e_req,/* rate,*/ szint)
	as
	(
		select pt.pt_part as par, pt.pt_part as part, cast(lnd.lnd_rate as decimal(18,5)) as lehet, /*lnd.lnd_rate as lehet_req,*/ cast(1 as decimal(18,5)) as e_req, /*lnd.lnd_rate as rate,*/ 0 as szint
		from pt_mstr pt inner join lnd_det lnd on pt.pt_part = lnd.lnd_part
		where pt.pt_part = @part
		and lnd.lnd_line = @line
		union all
		select ps.ps_par, ps.ps_comp
		,  cast( iif(ps.ps_qty_per * s.lehet < lnd.lnd_rate, s.lehet, lnd.lnd_rate/(ps.ps_qty_per * s.e_req) ) as decimal(18,5) ) --lehet gyártani menny.
		--, cast(ps.ps_qty_per * iif(ps.ps_qty_per * lehet < lnd.lnd_rate, lehet, lnd.lnd_rate/ps.ps_qty_per * e_req ) as decimal(18,5)) --lehet-hez szüks mennyi
		,cast(ps.ps_qty_per * s.e_req as decimal(18,5)) -- egy hez szükséges mennyi
		--,lnd.lnd_rate
		, s.szint + 1
		from ps_mstr ps inner join seged s on ps.ps_par = s.part
						inner join lnd_DET lnd on ps.ps_comp = lnd.lnd_part
		where lnd.lnd_line = @line
	)
	select @egys = min(s.lehet)
	from seged s
	where s.szint = (select max(sb.szint) from seged sb)
	return @egys;
	
end


--select dbo.orankentiEgyseg(1020, 'line_01')
GO
/****** Object:  UserDefinedFunction [dbo].[ptFaStruktura]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE function [dbo].[ptFaStruktura] (@ps_par int)
returns @szerkezet table (ps_par int, ps_comp int, szint int)
as
begin
    with temp as (
        select ps_par, ps_comp, 1 as szint
        from PS_MSTR
        where ps_par = @ps_par
    union all
        select PS_MSTR.ps_par, PS_MSTR.ps_comp, temp.szint + 1
        from PS_MSTR
        join temp on temp.ps_comp = PS_MSTR.ps_par
    )
    insert into @szerkezet (ps_par, ps_comp, szint)
    select ps_par, ps_comp, szint
    from temp
    order by szint
    return
end
GO
/****** Object:  UserDefinedFunction [dbo].[segedDatumIdoSum]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE function [dbo].[segedDatumIdoSum]
(
	@mihez datetime, @mit time
)
returns datetime
as
begin
return dateadd(ss,DATEPART(ss,@mit), dateadd(mi,DATEPART(mi,@mit),DATEADD(hh,DATEPART(hh,@mit),@mihez)))
end

-- select dbo.segedDatumIdoSum( '2030-01-01 08:00:00', '08:00')
GO
/****** Object:  UserDefinedFunction [dbo].[szerkezetesE]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[szerkezetesE] (@ps_par int)
RETURNS varchar(50)
AS
BEGIN
    DECLARE @structure varchar(50);
    
    SELECT @structure = CASE 
        WHEN ps_comp IS NULL THEN 'No Structure'
        WHEN EXISTS (
            SELECT 1
            FROM PS_MSTR
            WHERE ps_par = @ps_par
            AND ps_comp = ps.ps_comp
        ) THEN 'Has Structure'
        ELSE 'No Structure'
    END
    FROM PS_MSTR ps
    WHERE ps.ps_par = @ps_par;

    RETURN @structure;
END
GO
/****** Object:  UserDefinedFunction [dbo].[vanEStrukturaja]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[vanEStrukturaja] (@ps_par int)
RETURNS varchar(50)
AS
BEGIN
    DECLARE @structure varchar(50);
    
    SELECT @structure = CASE 
        WHEN ps_comp IS NULL THEN 'No Structure'
        WHEN EXISTS (
            SELECT 1
            FROM PS_MSTR
            WHERE ps_par = @ps_par
            AND ps_comp = ps.ps_comp
        ) THEN 'Has Structure'
        ELSE 'No Structure'
    END
    FROM PS_MSTR ps
    WHERE ps.ps_par = @ps_par;

    RETURN @structure;
END
GO
/****** Object:  UserDefinedFunction [dbo].[workWeekSeq]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create function [dbo].[workWeekSeq]
(
	@wo_seq int, @wo_start_date date
)
returns int
as
begin

	return(
		select count(*)
		from WO_MSTR wo
		where datepart(week, wo.wo_start_date) = datepart(week, @wo_start_date)
		and datepart(year, wo.wo_start_date) = datepart(year, @wo_start_date)
		and wo.wo_seq = @wo_seq
	)
end

--set datefirst  1
GO
/****** Object:  Table [dbo].[PS_MSTR]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  Table [dbo].[PT_MSTR]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  View [dbo].[k_f_termekek]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  Table [dbo].[LND_DET]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  View [dbo].[kesztermekek_h_e]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[kesztermekek_h_e]
as
select pt_part as termek, lnd_line as sor,  dbo.orankentiEgyseg(pt_part, lnd_line) as egys
from PT_MSTR p inner join LND_DET on pt_part = lnd_part
where p.pt_part in (select part from k_f_termekek)
and not exists (select 1 from PS_MSTR where ps_comp = p.pt_part)
GO
/****** Object:  Table [dbo].[LN_MSTR]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  Table [dbo].[WO_MSTR]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
	[wo_start_date] [date] NOT NULL,
	[wo_rel_date] [date] NULL,
	[wo_est_run]  AS (CONVERT([time],CONVERT([varchar],dateadd(second,([wo_qty_ord]/[dbo].[orankentiEgyseg]([wo_part],[wo_line]))*(3600),(0)),(108)))),
	[wo_start_time] [datetime] NULL,
	[wo_end_time] [datetime] NULL,
	[wo_pld_downtime] [time](0) NULL,
	[wo_unpld_downtime] [time](0) NOT NULL,
	[wo_activated] [bit] NOT NULL,
	[wo_status] [varchar](10) NOT NULL,
 CONSTRAINT [PK__WO_MSTR__5FD13D21F5F5BCBB] PRIMARY KEY CLUSTERED 
(
	[wo_lot] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[hetiUtemterv]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE view [dbo].[hetiUtemterv]
as
	select wo_lot, wo_nbr, wo_part, pt_desc, wo_qty_ord, pt_um, wo_line, ln_desc, dbo.orankentiEgyseg(wo_part, wo_line) as egys , wo_est_run as est_run, wo_seq, wo_rel_date, wo_start_date, cast(wo_start_time as time) as wo_start_time, cast(wo_end_time as time) as wo_end_time, wo_pld_downtime, wo_unpld_downtime
	from wo_mstr inner join pt_mstr on wo_part = pt_part
				inner join LN_MSTR on ln_line = wo_line
	where wo_status <>  'waiting'
GO
/****** Object:  View [dbo].[nincsSzerkezete]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[nincsSzerkezete] as
SELECT DISTINCT ps_comp
FROM PS_MSTR
WHERE ps_comp NOT IN (
    SELECT DISTINCT ps_par
    FROM PS_MSTR
    WHERE ps_par IS NOT NULL
)
GO
/****** Object:  Table [dbo].[WOD_DET]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  View [dbo].[vw_Wod]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  View [dbo].[szerkezetesAnyagok]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Szerkezettel rendelkező Késztermékek
CREATE view [dbo].[szerkezetesAnyagok] as 
select pt.pt_part
from PT_MSTR pt  inner join PS_MSTR ps on pt.pt_part = ps.ps_par
except
select ps.ps_comp
from PS_MSTR ps
GO
/****** Object:  View [dbo].[ptps]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  Table [dbo].[CHG_MSTR]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  Table [dbo].[DICTIONARY]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  Table [dbo].[LAD_DET]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
	[lad_qty_used] [decimal](18, 5) NULL,
 CONSTRAINT [PK__LAD_DET__24E37365A97F565C] PRIMARY KEY CLUSTERED 
(
	[lad_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LD_DET]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  Table [dbo].[USER]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  Table [dbo].[WOM_DET]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  Table [dbo].[XWO_HIST]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
	[xwo_start_time] [datetime] NULL,
	[xwo_end_time] [datetime] NULL,
	[xwo_pld_downtime] [time](0) NULL,
	[xwo_unpld_downtime] [time](0) NULL,
 CONSTRAINT [PK__XWO_HIST__E9FB120C78503FFB] PRIMARY KEY CLUSTERED 
(
	[xwo_year] ASC,
	[xwo_week] ASC,
	[xwo_lot] ASC,
	[xwo_version] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[LD_DET] ADD  DEFAULT ((0.0)) FOR [ld_qty_oh]
GO
ALTER TABLE [dbo].[LD_DET] ADD  DEFAULT ((0.0)) FOR [ld_qty_rsrv]
GO
ALTER TABLE [dbo].[LD_DET] ADD  DEFAULT ((0.0)) FOR [ld_qty_scrp]
GO
ALTER TABLE [dbo].[WO_MSTR] ADD  CONSTRAINT [DF__WO_MSTR__wo_ord___4F7CD00D]  DEFAULT (getdate()) FOR [wo_ord_date]
GO
ALTER TABLE [dbo].[WO_MSTR] ADD  CONSTRAINT [DF_WO_MSTR_wo_unpld_downtime]  DEFAULT ('00:00:00') FOR [wo_unpld_downtime]
GO
ALTER TABLE [dbo].[WO_MSTR] ADD  CONSTRAINT [DF__WO_MSTR__wo_acti__5070F446]  DEFAULT ((0)) FOR [wo_activated]
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
ALTER TABLE [dbo].[LAD_DET]  WITH CHECK ADD  CONSTRAINT [FK__LAD_DET__571DF1D5] FOREIGN KEY([lad_part], [lad_par], [lad_lot], [lad_comp])
REFERENCES [dbo].[WOM_DET] ([wom_part], [wom_par], [wom_lot], [wom_mat])
GO
ALTER TABLE [dbo].[LAD_DET] CHECK CONSTRAINT [FK__LAD_DET__571DF1D5]
GO
ALTER TABLE [dbo].[LAD_DET]  WITH CHECK ADD  CONSTRAINT [FK__LAD_DET__5812160E] FOREIGN KEY([lad_comp], [lad_expire])
REFERENCES [dbo].[LD_DET] ([ld_part], [ld_expire])
GO
ALTER TABLE [dbo].[LAD_DET] CHECK CONSTRAINT [FK__LAD_DET__5812160E]
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
ALTER TABLE [dbo].[WO_MSTR]  WITH CHECK ADD  CONSTRAINT [FK__WO_MSTR__wo_line__5DCAEF64] FOREIGN KEY([wo_line])
REFERENCES [dbo].[LN_MSTR] ([ln_line])
GO
ALTER TABLE [dbo].[WO_MSTR] CHECK CONSTRAINT [FK__WO_MSTR__wo_line__5DCAEF64]
GO
ALTER TABLE [dbo].[WO_MSTR]  WITH CHECK ADD  CONSTRAINT [FK__WO_MSTR__wo_part__5EBF139D] FOREIGN KEY([wo_part])
REFERENCES [dbo].[PT_MSTR] ([pt_part])
GO
ALTER TABLE [dbo].[WO_MSTR] CHECK CONSTRAINT [FK__WO_MSTR__wo_part__5EBF139D]
GO
ALTER TABLE [dbo].[WO_MSTR]  WITH CHECK ADD  CONSTRAINT [FK__WO_MSTR__wo_user__5FB337D6] FOREIGN KEY([wo_user])
REFERENCES [dbo].[USER] ([user_id])
GO
ALTER TABLE [dbo].[WO_MSTR] CHECK CONSTRAINT [FK__WO_MSTR__wo_user__5FB337D6]
GO
ALTER TABLE [dbo].[WOD_DET]  WITH CHECK ADD  CONSTRAINT [FK__WOD_DET__wod_lot__60A75C0F] FOREIGN KEY([wod_lot])
REFERENCES [dbo].[WO_MSTR] ([wo_lot])
GO
ALTER TABLE [dbo].[WOD_DET] CHECK CONSTRAINT [FK__WOD_DET__wod_lot__60A75C0F]
GO
ALTER TABLE [dbo].[WOD_DET]  WITH CHECK ADD FOREIGN KEY([wod_part])
REFERENCES [dbo].[PT_MSTR] ([pt_part])
GO
ALTER TABLE [dbo].[WOD_DET]  WITH CHECK ADD FOREIGN KEY([wod_par])
REFERENCES [dbo].[PT_MSTR] ([pt_part])
GO
ALTER TABLE [dbo].[WOM_DET]  WITH CHECK ADD FOREIGN KEY([wom_part], [wom_mat])
REFERENCES [dbo].[PS_MSTR] ([ps_par], [ps_comp])
GO
ALTER TABLE [dbo].[WOM_DET]  WITH CHECK ADD FOREIGN KEY([wom_part], [wom_par], [wom_lot])
REFERENCES [dbo].[WOD_DET] ([wod_part], [wod_par], [wod_lot])
GO
ALTER TABLE [dbo].[XWO_HIST]  WITH CHECK ADD  CONSTRAINT [FK__XWO_HIST__xwo_lo__656C112C] FOREIGN KEY([xwo_lot])
REFERENCES [dbo].[WO_MSTR] ([wo_lot])
GO
ALTER TABLE [dbo].[XWO_HIST] CHECK CONSTRAINT [FK__XWO_HIST__xwo_lo__656C112C]
GO
ALTER TABLE [dbo].[CHG_MSTR]  WITH CHECK ADD  CONSTRAINT [csakKesztermekek] CHECK  (([dbo].[isChgInSzerkezetesAnyagok]([chg_from],[chg_to])=(1)))
GO
ALTER TABLE [dbo].[CHG_MSTR] CHECK CONSTRAINT [csakKesztermekek]
GO
ALTER TABLE [dbo].[CHG_MSTR]  WITH CHECK ADD  CONSTRAINT [FromAndToNotSame] CHECK  (([dbo].[checkSameFromTo]([chg_line],[chg_from],[chg_to])=(0)))
GO
ALTER TABLE [dbo].[CHG_MSTR] CHECK CONSTRAINT [FromAndToNotSame]
GO
ALTER TABLE [dbo].[LAD_DET]  WITH CHECK ADD  CONSTRAINT [CK__LAD_DET__lad_qty__6754599E] CHECK  (([lad_qty_used]>=(0)))
GO
ALTER TABLE [dbo].[LAD_DET] CHECK CONSTRAINT [CK__LAD_DET__lad_qty__6754599E]
GO
ALTER TABLE [dbo].[LAD_DET]  WITH CHECK ADD  CONSTRAINT [CK_odaTartozik] CHECK  (([dbo].[odaTartozik]([lad_part],[lad_par],[lad_comp],[lad_lot])>(0)))
GO
ALTER TABLE [dbo].[LAD_DET] CHECK CONSTRAINT [CK_odaTartozik]
GO
ALTER TABLE [dbo].[LD_DET]  WITH CHECK ADD  CONSTRAINT [CK_Szerkezetes_anyagok] CHECK  (([dbo].[ldPartNotInSzerkezetes]([ld_part])=(0)))
GO
ALTER TABLE [dbo].[LD_DET] CHECK CONSTRAINT [CK_Szerkezetes_anyagok]
GO
ALTER TABLE [dbo].[PS_MSTR]  WITH CHECK ADD  CONSTRAINT [CK_Azonos_par_comp] CHECK  (([ps_par]<>[ps_comp]))
GO
ALTER TABLE [dbo].[PS_MSTR] CHECK CONSTRAINT [CK_Azonos_par_comp]
GO
ALTER TABLE [dbo].[WO_MSTR]  WITH CHECK ADD  CONSTRAINT [CK_WO_MSTR_can_activate] CHECK  (([wo_activated]=(1) AND [wo_seq] IS NOT NULL AND [wo_end_time] IS NOT NULL OR [wo_activated]=(0)))
GO
ALTER TABLE [dbo].[WO_MSTR] CHECK CONSTRAINT [CK_WO_MSTR_can_activate]
GO
ALTER TABLE [dbo].[WO_MSTR]  WITH CHECK ADD  CONSTRAINT [CK_WO_MSTR_indithatoE] CHECK  (([wo_status]='ongoing' AND [dbo].[indithatoE]([wo_lot])=(0) AND [wo_activated]=(1) OR [wo_status]<>'ongoing'))
GO
ALTER TABLE [dbo].[WO_MSTR] CHECK CONSTRAINT [CK_WO_MSTR_indithatoE]
GO
ALTER TABLE [dbo].[WO_MSTR]  WITH CHECK ADD  CONSTRAINT [CK_WO_MSTR_Kesz_Termek_E] CHECK  (([dbo].[keszTermekE]([wo_part])=(1)))
GO
ALTER TABLE [dbo].[WO_MSTR] CHECK CONSTRAINT [CK_WO_MSTR_Kesz_Termek_E]
GO
ALTER TABLE [dbo].[WO_MSTR]  WITH CHECK ADD  CONSTRAINT [CK_WO_MSTR_Status] CHECK  (([dbo].[getTypeDic]([wo_status]) IS NOT NULL AND [dbo].[getTypeDic]([wo_status])='wo_status'))
GO
ALTER TABLE [dbo].[WO_MSTR] CHECK CONSTRAINT [CK_WO_MSTR_Status]
GO
ALTER TABLE [dbo].[WO_MSTR]  WITH CHECK ADD  CONSTRAINT [CK_WO_MSTR_wo_seq_un] CHECK  (([dbo].[workWeekSeq]([wo_seq],[wo_start_date])=(1) OR [wo_seq] IS NULL))
GO
ALTER TABLE [dbo].[WO_MSTR] CHECK CONSTRAINT [CK_WO_MSTR_wo_seq_un]
GO
/****** Object:  StoredProcedure [dbo].[changePwByAdminUser]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[changePwByAdminUser]
(
	 @user_id int, @pw varchar(32), @role int
)
as
if(3 = @role)
begin
	update u
	set "password" = @pw
	from "USER" u
	where "user_id" = @user_id
end
else 
	raiserror('Access denied!',18,1)
GO
/****** Object:  StoredProcedure [dbo].[changePwByNormalUser]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[changePwByNormalUser]
(
	 @user_id int, @pw varchar(32)
)
as
update u
set "password" = @pw
from "USER" u
where "user_id" = @user_id
GO
/****** Object:  StoredProcedure [dbo].[deleteChg]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[deleteChg]
	@chg_line varchar(8),
	@chg_from int,
	@chg_to int
as
begin
	delete from CHG_MSTR
	where chg_line = @chg_line and chg_from = @chg_from and chg_to = @chg_to
end
GO
/****** Object:  StoredProcedure [dbo].[deleteLd]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  StoredProcedure [dbo].[deleteLn]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  StoredProcedure [dbo].[deleteLnd]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[deleteLnd]
	@lnd_line varchar(8),
	@lnd_part int
as
begin
	delete LND_DET
	where lnd_line = @lnd_line and lnd_part = @lnd_part
	
end

GO
/****** Object:  StoredProcedure [dbo].[deletePs]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[deletePs]
@par int,
@comp int
as

delete from PS_MSTR where ps_par = @par and ps_comp = @comp 
	and ps_comp in (select * from nincsSzerkezete)
GO
/****** Object:  StoredProcedure [dbo].[deletePt]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  StoredProcedure [dbo].[deleteUser]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  StoredProcedure [dbo].[estrun]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  StoredProcedure [dbo].[getHetiUtemterv]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[getHetiUtemterv]
(
	@week int, @line varchar(8)
)
as
	select wo_lot, wo_nbr, wo_part, pt_desc, wo_qty_ord, pt_um, wo_line, ln_desc, egys, est_run, wo_seq, wo_rel_date, wo_start_date, wo_start_time, wo_end_time, wo_pld_downtime, wo_unpld_downtime
	from hetiUtemterv
	where datepart(week,wo_start_date) = @week
	and wo_line = @line
GO
/****** Object:  StoredProcedure [dbo].[getWo]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  StoredProcedure [dbo].[newChg]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[newChg]
	@chg_line varchar(8),
	@chg_from int,
	@chg_to int,
	@chg_time varchar(8)
as
begin
	insert into CHG_MSTR values(@chg_line, @chg_from, @chg_to, CAST(@chg_time AS time))
	select * from CHG_MSTR where chg_line = @chg_line and chg_from = @chg_from and chg_to = @chg_to
end
GO
/****** Object:  StoredProcedure [dbo].[newLad]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[newLad]
(
	@ladPart int, @ladPar int, @LadLot int, @ladComp int, @ladExpire datetime, @ladAmount decimal(18,5)
	
)
as
begin
	declare @letezik int = (
							select COUNT(*) 
							from LAD_DET 
							where lad_part = @ladPart
							and lad_par = @ladPar
							and lad_lot = @LadLot
							and lad_comp = @ladComp 
							and lad_expire = cast(@ladExpire as date)
							);

	if(@letezik > 0)
		begin
			update lad
			set lad_qty_rsrv = @ladAmount
			from LAD_DET lad
			where lad_part = @ladPart
			and lad_par = @ladPar
			and lad_lot = @LadLot
			and lad_comp = @ladComp 
			and lad_expire = cast(@ladExpire as date)
		end
	else
		begin
		insert into LAD_DET values (@ladPart, @ladPar, @LadLot, @ladComp, cast(@ladExpire as date), @ladAmount, null);
		end
end

--exec newLad 1000,	1000,	10000,	1001,	'2030-01-01',	10.00000

GO
/****** Object:  StoredProcedure [dbo].[newLd]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  StoredProcedure [dbo].[newLn]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  StoredProcedure [dbo].[newLnd]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[newLnd]
	@lnd_line varchar(8),
	@lnd_part int,
	@lnd_rate decimal
as
begin
	insert into LND_DET values(@lnd_line, @lnd_part, @lnd_rate)
	select * from LND_DET where lnd_line = @lnd_line and lnd_part = @lnd_part
end

GO
/****** Object:  StoredProcedure [dbo].[newPs]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  StoredProcedure [dbo].[newPt]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  StoredProcedure [dbo].[newStructure]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  StoredProcedure [dbo].[newUser]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  StoredProcedure [dbo].[newWo]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[newWo]
	@wo_nbr varchar(18), @wo_part int, @wo_qty_ord int, @wo_due_date datetime, @user int
as
	declare @lot int
	--set nocount on;
	insert into WO_MSTR (wo_nbr, wo_part, wo_qty_ord, wo_due_date, wo_status, wo_start_date, wo_user) values 
						(@wo_nbr, @wo_part, @wo_qty_ord, cast(@wo_due_date as date), 'waiting', cast(@wo_due_date as date), @user)
	set @lot = IDENT_CURRENT('WO_MSTR');

	select *
	from WO_MSTR
	where wo_lot = @lot
GO
/****** Object:  StoredProcedure [dbo].[scheduleWo]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[scheduleWo]
(
@week int, @line varchar(8), @start_time time, @year char(4)
)
as
begin
	create table #seged (wo_lot int, seq int, wo_part int, est_run time, wo_start_date date,  wo_start_time datetime, wo_end_time datetime, wo_pld_downtime time, wo_unpld_downtime time, elotte int, utana int, utana_part int );
	insert into #seged 
	select wo_lot, wo_seq,wo_part, wo_est_run,wo_start_date, wo_start_time, wo_end_time, wo_pld_downtime, wo_unpld_downtime
	, (
		select max(wo_seq) from dbo.hetiUtemterv where wo_seq < most.wo_seq  and datepart(week, wo_start_date) = @week and cast(datepart(YYYY, wo_start_date) as char(4)) = @year
	) as elotte
	, (
		select min(wo_seq) from dbo.hetiUtemterv where wo_seq > most.wo_seq  and datepart(week, wo_start_date) = @week and cast(datepart(YYYY, wo_start_date) as char(4)) = @year
	) as utana,
	 (
		select wo_part from dbo.hetiUtemterv where wo_seq = (select min(wo_seq) from dbo.hetiUtemterv where wo_seq > most.wo_seq  and datepart(week, wo_start_date) = @week and cast(datepart(YYYY, wo_start_date) as char(4)) = @year) and datepart(week, wo_start_date) = @week and cast(datepart(YYYY, wo_start_date) as char(4)) = @year
	 )as utana_part

	from wo_mstr most
	where most.wo_line = @line
	and datepart(week, most.wo_start_date) = @week
	and cast(datepart(YYYY, most.wo_start_date) as char(4)) = @year;

	if(0 = (select count(*) from #seged where seq is null))
		begin
		create table #segedUtemterv (wo_lot int,elotte int, seq int,wo_part int, wo_start_time datetime,wo_end_time datetime, wo_pld_downtime time, wo_unpld_downtime time);
			with #utemterv (wo_lot,elotte, seq,wo_part, wo_start_time,wo_end_time,wo_pld_downtime, wo_unpld_downtime )
			as
			(
	
				select 
					elso.wo_lot as wo_lot,
					elso.elotte as elotte,
					elso.seq as seq,
					elso.wo_part as wo_part,
					dbo.segedDatumIdoSum(cast(elso.wo_start_date as datetime), cast('00:00' as time)) as wo_start_time,
					dbo.segedDatumIdoSum(dbo.segedDatumIdoSum(cast(elso.wo_start_date as datetime), cast('00:00' as time)), elso.est_run),
					iif(elso.utana is not null,iif(elso.wo_part <> elso.utana_part, (select chg_time from CHG_MSTR where (elso.wo_part = chg_from and elso.utana_part = chg_to) or (elso.wo_part = chg_to and elso.utana_part = chg_from) ), '00:00' ), null) as wo_pld_downtime
					,elso.wo_unpld_downtime as wo_pld_down_time
			
				from #seged elso
				where elso.seq = (select min(seq) from #seged)

				union all

				select 
					most.wo_lot as wo_lot
					,most.elotte as elotte
					,most.seq as seq
					,most.wo_part as wo_part
					,dbo.segedDatumIdoSum( dbo.segedDatumIdoSum(elotte.wo_end_time, elotte.wo_pld_downtime), elotte.wo_unpld_downtime)--mostani start
					, dbo.segedDatumIdoSum(dbo.segedDatumIdoSum( dbo.segedDatumIdoSum(elotte.wo_end_time, elotte.wo_pld_downtime), elotte.wo_unpld_downtime), most.est_run)--mostani end
					,iif(most.utana is not null,iif(most.wo_part <> most.utana_part, (select chg_time from CHG_MSTR where (most.wo_part = chg_from and most.utana_part = chg_to) or (most.wo_part = chg_to and most.utana_part = chg_from) ), '00:00' ), null) --pld_downtime
					,most.wo_unpld_downtime --unpld
				from #seged most inner join #utemterv elotte on most.elotte = elotte.seq
	

			)
			insert into #segedUtemterv
			select * from #utemterv

			update wo
			set wo.wo_start_time = ut.wo_start_time
				,wo.wo_end_time = ut.wo_end_time
				,wo.wo_pld_downtime = ut.wo_pld_downtime
			from #segedUtemterv ut inner join WO_MSTR wo on ut.wo_lot = wo.wo_lot

			declare @versionOfSch tinyint;
			set @versionOfSch = isnull((select max(xwo_version) from XWO_HIST where xwo_week =@week ), 0)+1;

			insert into XWO_HIST
			select @year, @week, su.wo_lot, @versionOfSch, wo.wo_est_run, su.seq, wo.wo_start_date, su.wo_start_time, su.wo_end_time, su.wo_pld_downtime, su.wo_unpld_downtime
			from #segedUtemterv su inner join WO_MSTR wo on su.wo_lot = wo.wo_lot

			select *
			from hetiutemterv
			where wo_line = @line
			and datepart(week, wo_start_date) = @week
			and datepart(YYYY, wo_start_date) = @year;

			drop table #segedUtemterv
	end
	else
		raiserror('NOT_ALL_SEQ_DEFINED', 18,10);
	drop table #seged
end


--exec scheduleWo 1, 'line_01', '00:00', '2023'
GO
/****** Object:  StoredProcedure [dbo].[segedSzerk]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  StoredProcedure [dbo].[tesztSzerk]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  StoredProcedure [dbo].[updateChg]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[updateChg]
	@chg_line varchar(8),
	@chg_from int,
	@chg_to int,
	@chg_time varchar(8)
as
begin
	update "CHG_MSTR"
	set chg_time = CAST(@chg_time AS time)
	where chg_line = @chg_line and chg_from = @chg_from and chg_to = @chg_to
end
GO
/****** Object:  StoredProcedure [dbo].[updateLad]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[updateLad]
(
@id int, @used decimal(18,5)
)
as
begin
	update LAD_DET
	set lad_qty_used = @used
	from LAD_DET
	where lad_id = @id;
	
end

--exec updateLad 20040 ,1
GO
/****** Object:  StoredProcedure [dbo].[updateLd]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  StoredProcedure [dbo].[updateLn]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  StoredProcedure [dbo].[updateLnd]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[updateLnd]
	@lnd_line varchar(8),
	@lnd_part int,
	@lnd_rate decimal
as
begin
	update "LND_DET"
	set lnd_rate = @lnd_rate
	where lnd_line = @lnd_line and lnd_part = @lnd_part
end

GO
/****** Object:  StoredProcedure [dbo].[updatePs]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  StoredProcedure [dbo].[updatePt]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  StoredProcedure [dbo].[updateUser]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  StoredProcedure [dbo].[updateWo]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  StoredProcedure [dbo].[updateWod]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[updateWod]
(
	@lot int, @part int, @par int, @compl int, @rjct int
)
as
begin
	update WOD_DET
	set wod_qty_rjct = @rjct, wod_qty_compl = @compl
	from WOD_DET
	where wod_lot = @lot
	and wod_part = @part
	and wod_par = @par;

	select *
	from vw_Wod
	where lot = @lot
	and part = @part
	and parent = @par;
end
GO
/****** Object:  StoredProcedure [dbo].[updateWoSeq]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[updateWoSeq]
(
	@lot int, @seq int
)
as
	update WO_MSTR
	set wo_seq = @seq
	where wo_lot = @lot
GO
/****** Object:  StoredProcedure [dbo].[validateUser]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[validateUser]
( 
 @email varchar(50), @hashPw varchar(32)
)
as
select * from "USER" where email = @email and "password" = @hashPw
GO
/****** Object:  StoredProcedure [dbo].[wodAll]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  StoredProcedure [dbo].[woDelete]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[woDelete]
(
	@wo_lot int
)
as
	delete wo
	from WO_MSTR wo 
	where wo.wo_lot = @wo_lot
	and wo.wo_status = 'waiting'

--exec woDelete 10190

GO
/****** Object:  StoredProcedure [dbo].[woList]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  Trigger [dbo].[Lad_reserve]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE trigger [dbo].[Lad_reserve]
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

end;
GO
ALTER TABLE [dbo].[LAD_DET] ENABLE TRIGGER [Lad_reserve]
GO
/****** Object:  Trigger [dbo].[lad_reserve_update]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create trigger [dbo].[lad_reserve_update]
	on [dbo].[LAD_DET]
	after update
as
begin
	update WOM_DET
	set wom_rsrv = iif(deleted.lad_qty_rsrv > inserted.lad_qty_rsrv, wom_rsrv - (deleted.lad_qty_rsrv - inserted.lad_qty_rsrv), wom_rsrv + ( inserted.lad_qty_rsrv - deleted.lad_qty_rsrv ))
	from inserted, WOM_DET, deleted
	where wom_lot = inserted.lad_lot and wom_part = inserted.lad_part  and wom_par = inserted.lad_par  
	and wom_mat = inserted.lad_comp
	
	update LD_DET
	--set ld_qty_oh -= inserted.lad_qty_rsrv, ld_qty_rsrv += inserted.lad_qty_rsrv  
	set ld_qty_oh = iif(deleted.lad_qty_rsrv > inserted.lad_qty_rsrv, ld_qty_oh + (deleted.lad_qty_rsrv - inserted.lad_qty_rsrv), ld_qty_oh - ( inserted.lad_qty_rsrv - deleted.lad_qty_rsrv )), ld_qty_rsrv = iif(deleted.lad_qty_rsrv > inserted.lad_qty_rsrv, ld_qty_rsrv - (deleted.lad_qty_rsrv - inserted.lad_qty_rsrv), ld_qty_rsrv + ( inserted.lad_qty_rsrv - deleted.lad_qty_rsrv ))
	from inserted, LD_DET, deleted
	where ld_part = inserted.lad_comp and ld_expire = inserted.lad_expire
end
GO
ALTER TABLE [dbo].[LAD_DET] ENABLE TRIGGER [lad_reserve_update]
GO
/****** Object:  Trigger [dbo].[lad_used_update]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE trigger [dbo].[lad_used_update]
	on [dbo].[LAD_DET]
	after update
	as
begin
	declare @oldUsed decimal(18,5),  @newUsed decimal(18,5), @kellRB int = 0;
	select @oldUsed = lad_qty_used from deleted;
	select @newUsed= lad_qty_used from inserted;
	
	declare @rsrv decimal(18,5) = (select lad_qty_rsrv from inserted);
		set @kellRB = 
		case
			when @newUsed is null then 1
			when @newUsed >  @rsrv then 1
			when  @newUsed < 0 then 1
			else 0
		end
	if(@kellRB = 0)
	begin
	
		if(@oldUsed is  null)
		begin
			update LD_DET
			set ld_qty_oh += lad_qty_rsrv - @newUsed
			, ld_qty_rsrv -= lad_qty_rsrv - @newUsed
			from LD_DET  inner join inserted  on ld_part = lad_comp and ld_expire = lad_expire

	
		end
		else
			begin
				if(@oldUsed < @newUsed)
						begin
							update LD_DET
							set ld_qty_oh -= @newUsed - @oldUsed
							, ld_qty_rsrv +=  @newUsed - @oldUsed
							from LD_DET  inner join inserted  on ld_part = lad_comp and ld_expire = lad_expire
						end
					else
						begin
							update LD_DET
							set ld_qty_oh += @oldUsed - @newUsed 
							, ld_qty_rsrv -=  @oldUsed - @newUsed 
							from LD_DET  inner join inserted  on ld_part = lad_comp and ld_expire = lad_expire
						end

			end
		
			
		
		
	end
	else
		begin
			rollback
		end
end
GO
ALTER TABLE [dbo].[LAD_DET] ENABLE TRIGGER [lad_used_update]
GO
/****** Object:  Trigger [dbo].[ldDetInsert]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  Trigger [dbo].[torleskorPtUpdate]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  Trigger [dbo].[updatedLd]    Script Date: 2023. 02. 22. 21:56:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE trigger [dbo].[updatedLd] on [dbo].[LD_DET]
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
/****** Object:  Trigger [dbo].[SzerkFelv]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
/****** Object:  Trigger [dbo].[UpdateStatus]    Script Date: 2023. 02. 22. 21:56:33 ******/
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
USE [master]
GO
ALTER DATABASE [Utemterv] SET  READ_WRITE 
GO

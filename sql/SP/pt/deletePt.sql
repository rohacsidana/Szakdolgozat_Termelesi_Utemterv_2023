USE [Utemterv]
GO
/****** Object:  StoredProcedure [dbo].[deletePt]    Script Date: 2023. 02. 03. 15:53:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER proc [dbo].[deletePt]
		@pt_part int
as
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


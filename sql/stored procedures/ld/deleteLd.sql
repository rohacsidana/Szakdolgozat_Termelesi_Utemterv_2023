USE [Utemterv]
GO
/****** Object:  StoredProcedure [dbo].[deleteLd]    Script Date: 2023. 02. 09. 15:22:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER proc [dbo].[deleteLd]
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
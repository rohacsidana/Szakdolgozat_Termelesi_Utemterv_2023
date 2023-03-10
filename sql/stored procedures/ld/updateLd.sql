USE [Utemterv]
GO
/****** Object:  StoredProcedure [dbo].[updateLd]    Script Date: 2023. 03. 09. 11:42:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER proc [dbo].[updateLd]
	@part int,
	@exp varchar(8),
	@oh decimal(18,5),
	@scrp decimal(18,5)
as
	

	update LD_DET set ld_qty_oh = @oh
	where ld_part = @part and ld_expire = @exp
	update LD_DET set ld_qty_scrp = @scrp
	where ld_part = @part and ld_expire = @exp
	


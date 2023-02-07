USE [Utemterv]
GO
/****** Object:  StoredProcedure [dbo].[newPt]    Script Date: 2023. 02. 03. 15:52:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER proc [dbo].[newPt] 
       @pt_desc varchar(24),
	   @pt_um varchar(24)
as 
	declare @part int
	insert into PT_MSTR values(@pt_desc, @pt_um, null)
	set @part = IDENT_CURRENT('PT_MSTR')
	select *
	from PT_MSTR
	where pt_part = @part
USE [Utemterv]
GO
 Object  StoredProcedure [dbo].[updatePt]    Script Date 2023. 02. 03. 155149 
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER proc [dbo].[updatePt]
       @pt_part int,
       @pt_desc varchar(24)
as 
	UPDATE PT_MSTR
	set pt_desc = @pt_desc
	WHERE pt_part = @pt_part;

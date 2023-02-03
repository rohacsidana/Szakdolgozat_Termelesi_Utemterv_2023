USE [Utemterv]
GO

/****** Object:  StoredProcedure [dbo].[deleteUser]    Script Date: 2023. 02. 03. 12:29:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[deleteUser]
       @id int
as 
	DELETE FROM "USER"
	WHERE @id = "user_id"
	and not exists
	(
	select 1 from WO_MSTR
	where wo_user = @id
	)

GO



USE [Utemterv]
GO
/****** Object:  StoredProcedure [dbo].[validateUser]    Script Date: 2023. 02. 21. 15:00:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER proc [dbo].[validateUser]
( 
 @email varchar(50), @hashPw varchar(32)
)
as
select * from "USER" where email = @email and "password" = @hashPw
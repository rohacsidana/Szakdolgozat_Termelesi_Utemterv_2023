USE [Utemterv]
GO
/****** Object:  StoredProcedure [dbo].[updateUser]    Script Date: 2023. 02. 23. 13:21:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER proc [dbo].[updateUser]
       @id int ,
	   @name varchar(30) ,
       @birth_date varchar(8),
	   @email varchar(50) ,
	   @post varchar(10) 
as 
begin
	UPDATE "USER"
	SET "name" = @name, birth_date = @birth_date, email = @email, post = @post
	WHERE "user_id" = @id
end


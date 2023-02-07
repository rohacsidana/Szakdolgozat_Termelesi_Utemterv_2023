USE [Utemterv]
GO

/****** Object:  StoredProcedure [dbo].[newLn]    Script Date: 2023. 02. 07. 15:51:54 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[newLn]
       @ln_line varchar(8),
	   @ln_desc varchar(24)
as 
begin
	declare @line varchar(8)
	insert into LN_MSTR values(@ln_line, @ln_desc)
	set @line = IDENT_CURRENT('LN_MSTR')
	select *
	from LN_MSTR
	where ln_line = @line
end
GO



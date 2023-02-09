USE [Utemterv]
GO

/****** Object:  StoredProcedure [dbo].[newLn]    Script Date: 2023. 02. 09. 14:18:35 ******/
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



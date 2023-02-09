USE [Utemterv]
GO

/****** Object:  StoredProcedure [dbo].[updateLn]    Script Date: 2023. 02. 09. 15:57:31 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[updateLn]
	@ln_line varchar(8),
	@ln_desc varchar(24)
as
begin
	update "LN_MSTR"
	set ln_desc = @ln_desc
	where ln_line = @ln_line
end
GO



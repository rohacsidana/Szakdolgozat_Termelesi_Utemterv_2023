USE [Utemterv]
GO

/****** Object:  StoredProcedure [dbo].[deleteLnd]    Script Date: 2023. 02. 13. 1:04:08 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[deleteLnd]
	@lnd_line varchar(8),
	@lnd_part int
as
begin
	delete LND_DET
	where lnd_line = @lnd_line and lnd_part = @lnd_part
	
end
GO



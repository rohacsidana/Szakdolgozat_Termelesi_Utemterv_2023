USE [Utemterv]
GO

/****** Object:  StoredProcedure [dbo].[updateLnd]    Script Date: 2023. 02. 13. 1:03:37 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[updateLnd]
	@lnd_line varchar(8),
	@lnd_part int,
	@lnd_rate decimal
as
begin
	update "LND_DET"
	set lnd_rate = @lnd_rate
	where lnd_line = @lnd_line and lnd_part = @lnd_part
end
GO



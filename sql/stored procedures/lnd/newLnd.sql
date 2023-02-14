USE [Utemterv]
GO

/****** Object:  StoredProcedure [dbo].[newLnd]    Script Date: 2023. 02. 13. 1:00:48 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[newLnd]
	@lnd_line varchar(8),
	@lnd_part int,
	@lnd_rate decimal
as
begin
	insert into LND_DET values(@lnd_line, @lnd_part, @lnd_rate)
	select * from LND_DET where lnd_line = @lnd_line and lnd_part = @lnd_part
end
GO



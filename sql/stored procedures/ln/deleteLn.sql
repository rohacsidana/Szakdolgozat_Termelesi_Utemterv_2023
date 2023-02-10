USE [Utemterv]
GO

/****** Object:  StoredProcedure [dbo].[deleteLn]    Script Date: 2023. 02. 10. 11:43:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[deleteLn]
	@line varchar(8)
as
begin
	delete LN_MSTR
	where ln_line = @line
	and not exists
	(
	select 1 from LND_DET
	where lnd_line = @line
	)
	and not exists
	(
	select 1 from CHG_MSTR
	where chg_line = @line
	)
	and not exists
	(
	select 1 from WO_MSTR
	where wo_line = @line
	)
end
GO



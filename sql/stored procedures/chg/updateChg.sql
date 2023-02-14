USE [Utemterv]
GO

/****** Object:  StoredProcedure [dbo].[updateChg]    Script Date: 2023. 02. 14. 11:20:15 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[updateChg]
	@chg_line varchar(8),
	@chg_from int,
	@chg_to int,
	@chg_time varchar(8)
as
begin
	update "CHG_MSTR"
	set chg_time = CAST(@chg_time AS time)
	where chg_line = @chg_line and chg_from = @chg_from and chg_to = @chg_to
end
GO



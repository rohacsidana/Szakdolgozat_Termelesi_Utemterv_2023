USE [Utemterv]
GO

/****** Object:  StoredProcedure [dbo].[newChg]    Script Date: 2023. 02. 14. 11:19:37 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[newChg]
	@chg_line varchar(8),
	@chg_from int,
	@chg_to int,
	@chg_time varchar(8)
as
begin
	insert into CHG_MSTR values(@chg_line, @chg_from, @chg_to, CAST(@chg_time AS time))
	select * from CHG_MSTR where chg_line = @chg_line and chg_from = @chg_from and chg_to = @chg_to
end
GO



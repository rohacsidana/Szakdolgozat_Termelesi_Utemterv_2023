USE [Utemterv]
GO

/****** Object:  StoredProcedure [dbo].[deleteChg]    Script Date: 2023. 02. 14. 11:20:37 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[deleteChg]
	@chg_line varchar(8),
	@chg_from int,
	@chg_to int
as
begin
	delete from CHG_MSTR
	where chg_line = @chg_line and chg_from = @chg_from and chg_to = @chg_to
end
GO



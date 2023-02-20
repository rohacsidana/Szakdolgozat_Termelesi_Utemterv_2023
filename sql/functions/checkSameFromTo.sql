USE [Utemterv]
GO

/****** Object:  UserDefinedFunction [dbo].[checkSameFromTo]    Script Date: 2023. 02. 20. 1:16:03 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE function [dbo].[checkSameFromTo](@line varchar(8), @from int, @to int)
returns bit
as
begin
declare @van bit
set @van = 0
if (@from = (select chg_to from chg_mstr where chg_line = @line and chg_to = @from and chg_from = @to)) set @van = 1

return @van
end
GO



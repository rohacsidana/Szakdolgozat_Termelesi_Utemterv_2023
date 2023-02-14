USE [Utemterv]
GO

/****** Object:  UserDefinedFunction [dbo].[isChgInSzerkezetesAnyagok]    Script Date: 2023. 02. 14. 15:01:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE function [dbo].[isChgInSzerkezetesAnyagok](@from int, @to int)
	
	returns bit
	as
	BEGIN
        declare @benne bit
		set @benne = 0
		if (@from in (select * from szerkezetesAnyagok) 
		and @to in(select * from szerkezetesAnyagok)) set @benne = 1

		return @benne
    END
GO



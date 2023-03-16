USE [Utemterv]
GO

/****** Object:  UserDefinedFunction [dbo].[getLnd]    Script Date: 2023. 03. 16. 9:08:57 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE function [dbo].[getLnd] (@l varchar(8), @p int)
returns bit
	as
	BEGIN
        declare @benne bit
		set @benne = 0
		if (@l in (select lnd_line from LND_DET where @l = lnd_line and @p = lnd_part)) set @benne = 1

		return @benne
    END
GO



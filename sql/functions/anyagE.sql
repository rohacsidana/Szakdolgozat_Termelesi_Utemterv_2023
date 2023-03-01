USE [Utemterv]
GO

/****** Object:  UserDefinedFunction [dbo].[anyagE]    Script Date: 2023. 02. 28. 11:44:05 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create FUNCTION [dbo].[anyagE] (@ps_par int)
RETURNS bit
AS
BEGIN
    DECLARE @anyag bit;
    
	set @anyag = 0
	if (@ps_par in (select ps_par from dbo.GetPSTreeStructure(@ps_par))) set @anyag = 1

    RETURN @anyag
END

GO



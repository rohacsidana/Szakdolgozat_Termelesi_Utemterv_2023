USE [Utemterv]
GO
/****** Object:  StoredProcedure [dbo].[deletePs]    Script Date: 2023. 02. 14. 8:51:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER proc [dbo].[deletePs]
@par int,
@comp int
as

delete from PS_MSTR where ps_par = @par and ps_comp = @comp 
	and ps_comp in (select * from nincsSzerkezete)
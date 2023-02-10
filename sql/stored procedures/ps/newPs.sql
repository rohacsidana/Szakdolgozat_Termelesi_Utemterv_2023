USE [Utemterv]
GO
/****** Object:  StoredProcedure [dbo].[newPs]    Script Date: 2023. 02. 10. 9:02:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER proc [dbo].[newPs]
@par int,
@comp int,
@qty dec(18,5)
as
begin
insert into PS_MSTR values(@par, @comp, @qty)
select ps_par, ps_comp, ps_qty_per from PS_MSTR where ps_par = @par and ps_comp = @comp
end
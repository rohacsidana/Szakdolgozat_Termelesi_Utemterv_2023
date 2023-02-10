create proc deletePs
@par int,
@comp int
as
delete from PS_MSTR where ps_par = @par and ps_comp = @comp

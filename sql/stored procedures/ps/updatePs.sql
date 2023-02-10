create proc updatePs 
@par int,
@comp int,
@qty dec(18,5)
as begin
update PS_MSTR set ps_qty_per = @qty
where ps_par = @par and ps_comp = @comp
end



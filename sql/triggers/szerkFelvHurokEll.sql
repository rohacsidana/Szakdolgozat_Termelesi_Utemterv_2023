alter trigger SzerkFelv on ps_mstr
instead of insert
as
begin
	declare @par int
	declare @comp int
	declare @qty decimal(18,5)
	select @par = ps_par, @comp = ps_comp, @qty = ps_qty_per from inserted
	if (dbo.hurokHiba(@par, @comp) = 0)
	begin
		insert into PS_MSTR values (@par, @comp, @qty)
	end
	else
	begin
		rollback
	end
end
go

--test
insert into PS_MSTR values (1019, 1017, 5)
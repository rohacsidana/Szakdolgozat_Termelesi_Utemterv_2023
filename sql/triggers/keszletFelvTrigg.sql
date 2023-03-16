alter trigger ldDetInsert on ld_det
instead of insert
as
begin

declare @part int, @date date, @qty decimal(18,5), @rsrv decimal(18,5), @scrap decimal(18,5)
select @part = ld_part, @date = ld_expire, @qty = ld_qty_oh, @rsrv = ld_qty_rsrv, @scrap = ld_qty_scrp from inserted 

if (@part in (select ld_part from LD_DET where ld_expire = @date))
	begin
	update LD_DET 
	set ld_qty_oh = ld_qty_oh + @qty
	from LD_DET
	where ld_part = @part
	and ld_expire = @date
	
	end
else
	begin
		insert into LD_DET values (@part, @date, @qty, @rsrv, @scrap)
		update PT_MSTR
		set pt_qty_oh = IIF(pt_qty_oh is null, @qty, pt_qty_oh + @qty)
		from PT_MSTR
		where pt_part = @part
	end
	
end
go
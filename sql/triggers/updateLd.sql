create trigger updatedLd on ld_det
after update
as
	declare @ujOh decimal(18,5),@part int, @regiOh decimal(18,5), @kulonbseg decimal(18,5);
	
	select @regiOh = ld_qty_oh, @part = ld_part
	from deleted

	select @ujOh = ld_qty_oh
	from inserted

	set @kulonbseg = @ujOh - @regiOh

	if @ujOh >= @regiOh
	begin
	update PT_MSTR set pt_qty_oh  = pt_qty_oh + @kulonbseg
	where pt_part = @part
	end

	if @ujOh < @regiOh
	begin
	update PT_MSTR set pt_qty_oh  = pt_qty_oh - abs(@kulonbseg)
	where pt_part = @part
	end
	

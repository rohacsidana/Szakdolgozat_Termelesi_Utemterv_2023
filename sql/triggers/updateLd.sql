alter trigger updatedLd on ld_det
after update
as
begin
	declare @ujOh decimal(18,5),@part int, @regiOh decimal(18,5), @kulonbseg decimal(18,5);
	
	declare ld_cursor CURSOR FOR
	select d.ld_qty_oh
		 , i.ld_qty_oh
		 , i.ld_part
		 --, d.ld_expire
	from deleted d inner join inserted i on d.ld_part = i.ld_part and d.ld_expire = i.ld_expire

	open ld_cursor;

	fetch next from ld_cursor into @regiOh, @ujOh, @part;

	while @@FETCH_STATUS = 0
	begin
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
		
		fetch next from ld_cursor into @regiOh, @ujOh, @part;
	end

	close ld_cursor;
	deallocate ld_cursor;
end	
	

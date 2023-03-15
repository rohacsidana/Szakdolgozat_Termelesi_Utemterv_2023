alter trigger unpld_update on wo_mstr
	after update 
as
begin


	declare @oldUnpld time, @newUnpld time(7), @year char(4), @week int, @seq int, @status varchar(10), @line varchar(8);

	select @oldUnpld = d.wo_unpld_downtime, @newUnpld = i.wo_unpld_downtime, @year = datepart(year, i.wo_start_date), @week = datepart(week, i.wo_start_date), @seq = i.wo_seq, @status = i.wo_status, @line =  i.wo_line
	from inserted i inner join deleted d on i.wo_lot = d.wo_lot
	if(@status = 'completed' and @oldUnpld <> @newUnpld)
		begin
			update wo_mstr
			set wo_start_time = dbo.segedDatumIdoSum(dbo.segedDatumIdoKiv(wo_start_time, @oldUnpld), @newUnpld)
			  , wo_end_time = dbo.segedDatumIdoSum(dbo.segedDatumIdoKiv(wo_end_time, @oldUnpld), @newUnpld)
			where DATEPART(year, wo_start_date) = @year
			and DATEPART(WEEK, wo_start_date) = @week
			and wo_line = @line
			and wo_seq > @seq
		end
		else if( @status <> 'completed' and @oldUnpld <> @newUnpld)
			begin
				rollback;
			end
end
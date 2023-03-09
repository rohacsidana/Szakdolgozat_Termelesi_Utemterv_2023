create proc activateWeek
(
	@year char(4), @week int, @line varchar(8)
)
as
begin
	
	Update  WO_MSTR
	set wo_activated = 1
	from WO_MSTR
	where cast(datepart(week, wo_start_date) as int) = @week 
	and cast(datepart(YYYY, wo_start_date) as char(4)) = @year
	and wo_line = @line
end
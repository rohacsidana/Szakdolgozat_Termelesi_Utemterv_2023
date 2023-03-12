alter proc canActivate
(
@year char(4), @week int, @line varchar(8))
as
select count(*) as rosszDb
from WO_MSTR
where cast(datepart(week, wo_start_date) as int) = @week 
	and cast(datepart(YYYY, wo_start_date) as char(4)) = @year
	and wo_line = @line
	and wo_end_time is null


	--exec canActivate 2023, 1, 'line_01'
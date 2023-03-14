
create function segedDatumIdoKiv
(
	@mihez datetime, @mit time
)
returns datetime
as
begin
return dateadd(ss,-DATEPART(ss,@mit), dateadd(mi,-DATEPART(mi,@mit),DATEADD(hh,-DATEPART(hh,@mit),@mihez)))
end

select dbo.segedDatumIdoKiv('2023-01-01 00:00:01', '00:00:01')
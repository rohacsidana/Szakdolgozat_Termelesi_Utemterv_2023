
alter function segedDatumIdoSum
(
	@mihez datetime, @mit time
)
returns datetime
as
begin
return dateadd(ss,DATEPART(ss,@mit), dateadd(mi,DATEPART(mi,@mit),DATEADD(hh,DATEPART(hh,@mit),@mihez)))
end

-- select dbo.segedDatumIdoSum( '2030-01-01 08:00:00', '08:00')
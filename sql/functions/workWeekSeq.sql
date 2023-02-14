
create function workWeekSeq
(
	@wo_seq int, @wo_start_date date
)
returns int
as
begin

	return(
		select count(*)
		from WO_MSTR wo
		where datepart(week, wo.wo_start_date) = datepart(week, @wo_start_date)
		and datepart(year, wo.wo_start_date) = datepart(year, @wo_start_date)
		and wo.wo_seq = @wo_seq
	)
end

--set datefirst  1
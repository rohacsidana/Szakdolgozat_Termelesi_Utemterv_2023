alter proc getHetiUtemterv
(
	@week int, @line varchar(8), @year char(4)
)
as
	select wo_lot, wo_nbr, wo_part, pt_desc, wo_qty_ord, pt_um, wo_line, ln_desc, egys, est_run, wo_seq, wo_rel_date, wo_start_date, wo_start_time, wo_end_time, wo_pld_downtime, wo_unpld_downtime
	from hetiUtemterv
	where datepart(week,wo_start_date) = @week
	and wo_line = @line
	and datepart(year,wo_start_date) = @year
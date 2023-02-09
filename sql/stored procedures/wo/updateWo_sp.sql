alter proc updateWo
(
	@wo_nbr varchar(18),
	@wo_part int,
	@wo_qty_ord int,
	@wo_due_date datetime,
	@wo_lot int,	
	@wo_start_date datetime,
	@wo_rel_date datetime,
	@wo_line varchar(8),
	@wo_status varchar(10),
	@wo_activated bit
	)
as
begin
	update WO_MSTR
	set wo_nbr = @wo_nbr,wo_part = @wo_part, wo_qty_ord = @wo_qty_ord, wo_due_date = cast(@wo_due_date as date), wo_start_date = cast(@wo_start_date as date), wo_rel_date = cast(@wo_rel_date as date), wo_line = @wo_line, wo_status = @wo_status, wo_activated = @wo_activated
	where wo_lot = @wo_lot		   

	select * from WO_MSTR where wo_lot = @wo_lot
end

--exec updateWo 'asdasdaassasadsaddsa', 1020, 10,'',10000,'2020-02-02','2020-02-02',null, 'waiting',true
create proc updateWo
(
	@wo_lot int,
	@wo_nbr varchar(18),
	@wo_part int,
	@wo_line varchar(8),
	@wo_seq int,
	@wo_qty_ord int,
	@wo_due_date date,
	@wo_start_date date,
	@wo_status varchar(10)
	)
as
begin
	update WO_MSTR
	set wo_nbr = @wo_nbr,wo_part = @wo_part, wo_line = @wo_line, wo_seq = @wo_seq, wo_qty_ord = @wo_qty_ord, wo_status = @wo_status
	where wo_lot = @wo_lot		   

	select * from WO_MSTR where wo_lot = @wo_lot
end
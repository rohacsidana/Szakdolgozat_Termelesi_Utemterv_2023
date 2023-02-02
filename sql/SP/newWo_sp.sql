create proc newWo
	@wo_nbr varchar(18), @wo_part int, @wo_qty_ord int, @wo_due_date datetime
as
	insert into WO_MSTR (wo_nbr, wo_part, wo_qty_ord, wo_due_date, wo_status) values 
						(@wo_nbr, @wo_part, @wo_qty_ord, cast(@wo_due_date as date), 'waiting')

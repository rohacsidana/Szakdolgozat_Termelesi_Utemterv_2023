create proc woDelete
(
	@wo_lot int
)
as
	delete wo
	from WO_MSTR wo 
	where wo.wo_lot = @wo_lot
	and wo.wo_status = 'waiting'

--exec woDelete 10190

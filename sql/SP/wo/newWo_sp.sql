create proc newWo
	@wo_nbr varchar(18), @wo_part int, @wo_qty_ord int, @wo_due_date datetime
as
	declare @lot int
	--set nocount on;
	insert into WO_MSTR (wo_nbr, wo_part, wo_qty_ord, wo_due_date, wo_status) values 
						(@wo_nbr, @wo_part, @wo_qty_ord, cast(@wo_due_date as date), 'waiting')
	set @lot = IDENT_CURRENT('WO_MSTR');

	select *
	from WO_MSTR
	where wo_lot = @lot
create trigger torleskorPtUpdate on ld_det
for delete
as
declare @ohDeleted decimal(18,5), @part int;
select @ohDeleted = ld_qty_oh, @part = ld_part from deleted
update PT_MSTR set pt_qty_oh = pt_qty_oh - @ohDeleted
	where pt_part = @part
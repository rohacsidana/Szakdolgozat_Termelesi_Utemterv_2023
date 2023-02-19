create proc updateLad
(
@id int, @used decimal(18,5)
)
as
begin
	update LAD_DET
	set lad_qty_used = @used
	from LAD_DET
	where lad_id = @id;

	select *
	from LAD_DET
	where lad_id = @id;
end
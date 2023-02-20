alter proc updateLad
(
@id int, @used decimal(18,5)
)
as
begin
declare @oldUsed decimal(18,5) = (select lad_qty_used from LAD_DET where lad_id = @id)
	
			update LAD_DET
			set lad_qty_used = @used
			from LAD_DET
			where lad_id = @id;

			select *
			from LAD_DET
			where lad_id = @id;

end
----exec updateLad 20030 0

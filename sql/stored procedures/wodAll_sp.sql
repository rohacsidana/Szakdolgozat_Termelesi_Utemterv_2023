use Utemterv
go
create proc wodAll
	@lot int
as

select *
from wod_det
where wod_lot = @lot
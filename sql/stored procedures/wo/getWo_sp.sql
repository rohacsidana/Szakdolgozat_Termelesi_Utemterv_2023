use Utemterv
go
create proc getWo
	@lot int
as
select *
from WO_MSTR
where wo_lot = @lot

--exec getWo 10000
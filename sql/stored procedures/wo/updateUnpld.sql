create proc updateUnpld
(
	@lot int, @time time
)
as
update wo_mstr
set wo_unpld_downtime = @time
from wo_mstr
where wo_lot = @lot
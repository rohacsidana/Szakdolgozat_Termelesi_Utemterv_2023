alter proc scrap
as
update LD_DET
set ld_qty_scrp += ld_qty_oh, ld_qty_oh = 0
from LD_DET
where ld_expire < cast(GETDATE() as date)
and ld_qty_oh > 0
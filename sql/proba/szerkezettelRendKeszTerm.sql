--Szerkezettel rendelkez� K�szterm�kek
select pt.pt_part
from PT_MSTR pt  inner join PS_MSTR ps on pt.pt_part = ps.ps_par
except
select ps.ps_comp
from PS_MSTR ps

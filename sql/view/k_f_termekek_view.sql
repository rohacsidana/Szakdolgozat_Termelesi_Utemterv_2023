alter view k_f_termekek
as

select distinct  pt.pt_part as part
from PT_MSTR pt inner join PS_MSTR ps on pt.pt_part = ps.ps_par

--select * from k_f_termekek

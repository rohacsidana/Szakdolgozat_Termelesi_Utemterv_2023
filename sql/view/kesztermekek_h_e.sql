create view kesztermekek_h_e
as
select pt_part as termek, lnd_line as sor,  dbo.orankentiEgyseg(pt_part, lnd_line) as egys
from PT_MSTR p inner join LND_DET on pt_part = lnd_part
where p.pt_part in (select part from k_f_termekek)
and not exists (select 1 from PS_MSTR where ps_comp = p.pt_part)
select * from PT_MSTR
select * from PS_MSTR
select * from WO_MSTR
select * from "USER"

insert into PT_MSTR values('asztal', 'db', null);
insert into PT_MSTR values('asztal lap', 'db', null);
insert into PT_MSTR values('asztallb kész', 'db', null);
insert into PT_MSTR values('asztal láb', 'db', null);
insert into PT_MSTR values('csúszásgátló', 'db', null);
insert into PT_MSTR values('Műzli szelet', 'db', null);
insert into PT_MSTR values('bevonat', 'réteg', null);

insert into PS_MSTR values(1000,1001,1);
insert into PS_MSTR values(1000,1002,4);
insert into PS_MSTR values(1002,1003,1);
insert into PS_MSTR values(1002,1004,1);
insert into PS_MSTR values(1003,1006,3);

insert into WO_MSTR (wo_nbr, wo_part, wo_qty_ord, wo_due_date) values ('r111', 1000, 1, '2023-01-30');
--insert into WO_MSTR (wo_nbr, wo_part, wo_qty_ord, wo_due_date) values ('r111', 1001, 1, '2023-01-30');-- Teszt: CK_WO_MSTR_Kesz_Termek_E


insert into "USER" values('Rohácsi Daniella', '2002-03-24', 'rohacsi.dana@gmail.com', 'Aa123456', '1')
insert into "USER" values('Walaki', '2020-01-01', 'walaki@gmail.com', '', '2')
insert into "USER" values('Berényi Miklós', '1960-11-14', 'berenyi.miklos@gmail.com', '', '2')


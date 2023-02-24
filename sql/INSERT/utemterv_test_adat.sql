select * from PT_MSTR
select * from PS_MSTR
select * from WO_MSTR
select * from "USER"

insert into DICTIONARY values('waiting','wo_status',null);
insert into DICTIONARY values('accepted','wo_status',null);
insert into DICTIONARY values('ongoing','wo_status',null);
insert into DICTIONARY values('completed','wo_status',null);

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


--DBCC CHECKIDENT ('user', RESEED, 0);
GO
exec newWo 'rend1', 1000, 10, '20230112'
exec newWo 'rend12', 1020, 10, '20230112'
-- exec newWo 'rend13', 1001, 10, '20230112'--teszt
exec newWo 'rend14', 1000, 10, '20230112'
exec newWo 'rend15', 1000, 10, '20230112'
exec newWo 'rend16', 1000, 10, '20230112'
exec newWo 'rend16', 1000, 10, '20230112'
exec newWo 'rend17', 1000, 10, '20230112'
exec newWo 'rend18', 1000, 10, '20230112'
exec newWo 'rend19', 1000, 10, '20230112'
exec newWo 'rend1a', 1000, 10, '20230112'
exec newWo 'rend1d', 1000, 10, '20230112'
exec newWo 'rend1vs', 1000, 10, '20230112'
exec newWo 'rendasd1', 1000, 10, '20230112'
exec newWo 'rend1asd', 1000, 10, '20230112'
exec newWo 'rendaaa1', 1000, 10, '20230112'
exec newWo 'resadnd1', 1000, 10, '20230112'
exec newWo 'rend1', 1000, 10, '20230112'

/*Identity insert ha valakinek kellene*/
--set identity_insert dbo.PT_MSTR on
--insert into PT_MSTR (pt_part,pt_desc, pt_um, pt_qty_oh) values (2, 'szia', 'g', null)
--set identity_insert dbo.PT_MSTR off


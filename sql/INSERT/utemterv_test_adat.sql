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
insert into "USER" (name, birth_date, email, password, post) values ('Janis Klimpke', '9/17/1977', 'jklimpke0@pen.io', 'pSLfz83WwiX', 1);
insert into "USER" (name, birth_date, email, password, post) values ('Nissa Chessor', '11/8/2003', 'nchessor1@tamu.edu', 'kzarktdWc', 2);
insert into "USER" (name, birth_date, email, password, post) values ('Hobard Stookes', '9/18/1989', 'hstookes2@bandcamp.com', 'dy4TxL2YGo0Q', 3);
insert into "USER" (name, birth_date, email, password, post) values ('Teresa Burvill', '9/7/1979', 'tburvill3@ning.com', 'ea3h1A4BIE', 4);
insert into "USER" (name, birth_date, email, password, post) values ('Merrel Lancaster', '9/7/1976', 'mlancaster4@ycombinator.com', 'uCDsDOE', 5);
insert into "USER" (name, birth_date, email, password, post) values ('Tamarra Cragell', '11/12/1993', 'tcragell5@msu.edu', 'LJAYZpAIqnBo', 6);
insert into "USER" (name, birth_date, email, password, post) values ('Renato Jeacock', '3/16/1999', 'rjeacock6@chron.com', '3h0uyqXT6', 7);
insert into "USER" (name, birth_date, email, password, post) values ('Lyle Euston', '1/27/1992', 'leuston7@google.com.hk', 'VMh2d1MdvBw', 8);
insert into "USER" (name, birth_date, email, password, post) values ('Rodger Walicki', '9/18/1993', 'rwalicki8@weather.com', '56utI8R', 9);
insert into "USER" (name, birth_date, email, password, post) values ('Ardelia Durtnal', '5/7/1989', 'adurtnal9@discuz.net', 'Bd248c9cs2', 10);
insert into "USER" (name, birth_date, email, password, post) values ('Hans Aldwinckle', '6/7/1981', 'haldwincklea@comsenz.com', '31c4QTMuiZ', 11);
insert into "USER" (name, birth_date, email, password, post) values ('Cirillo Freake', '3/26/1968', 'cfreakeb@blogs.com', 'FYMqKfK', 12);
insert into "USER" (name, birth_date, email, password, post) values ('Letitia Tolmie', '6/25/1980', 'ltolmiec@friendfeed.com', 'kmf8LxTuXYmv', 13);
insert into "USER" (name, birth_date, email, password, post) values ('Crissy Thew', '4/22/1996', 'cthewd@alibaba.com', '1XfIlKufG', 14);
insert into "USER" (name, birth_date, email, password, post) values ('Colin Cocke', '7/8/1987', 'ccockee@ft.com', 'oljvoMbJ20WG', 15);
insert into "USER" (name, birth_date, email, password, post) values ('Cassandry Quincey', '10/9/1976', 'cquinceyf@yelp.com', 'UVjeSwY', 16);
insert into "USER" (name, birth_date, email, password, post) values ('Wandie Woodhams', '1/8/1971', 'wwoodhamsg@comsenz.com', 's4YEPxl', 17);
insert into "USER" (name, birth_date, email, password, post) values ('Udall Pybus', '7/26/1978', 'upybush@csmonitor.com', 'zpKrzTHjTxSY', 18);
insert into "USER" (name, birth_date, email, password, post) values ('Brock Parnall', '5/27/2002', 'bparnalli@google.com.br', '8CLmeuode1u', 19);
insert into "USER" (name, birth_date, email, password, post) values ('Correna Defond', '4/27/1982', 'cdefondj@rediff.com', 'HMl9bovt', 20);
--DBCC CHECKIDENT ('user', RESEED, 0);
GO
exec newWo 'rend1', 1000, 10, '20230112'
exec newWo 'rend12', 1000, 10, '20230112'
exec newWo 'rend13', 1000, 10, '20230112'
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

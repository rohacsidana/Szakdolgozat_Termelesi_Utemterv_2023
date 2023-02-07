create proc newStructure
(
	@wo_lot int,  @wo_part int, @wo_qty_ord int
)
as
	drop table if exists #tempSzerkezet;
	create table #tempSzerkezet (elozo int, parent int, child int, qty_req decimal(18,5), szint int);

	with seged (elozo, parent, child, qty_req, szint)
			as
			(
				select @wo_part as elozo,  @wo_part as parent, pt.pt_part as child, cast(@wo_qty_ord as decimal(18,5)) as qty_req, 1 as szint
				from pt_mstr pt
				where pt.pt_part = @wo_part
				union all
				select s.parent, ps.ps_par, ps.ps_comp, cast(cast(ps.ps_qty_per as decimal(18,5)) *  cast(s.qty_req as decimal(18,5)) as decimal(18,5)), s.szint + 1  
				from seged s inner join PS_MSTR ps on s.child = ps.ps_par

			)
			insert into #tempSzerkezet
				select * from seged

		insert into WOD_DET 
		select tmp.child, tmp.parent, @wo_lot, tmp.qty_req, 0, 0
		from #tempSzerkezet tmp
		where exists (select 1 from dbo.k_f_termekek kf where kf.part = tmp.child)
 
		insert into WOM_DET
		select tmp.parent, tmp.elozo,  @wo_lot, tmp.child, tmp.qty_req, 0
		from #tempSzerkezet tmp 
		where not exists (select 1 from dbo.k_f_termekek kf2 where kf2.part = tmp.child)

		drop table #tempSzerkezet
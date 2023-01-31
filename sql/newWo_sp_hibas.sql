alter proc newWo2
	@wo_nbr varchar(18), @wo_part int, @wo_qty_ord int, @wo_due_date datetime
as
	--borzasztó
	declare @wo_lot int
	drop table if exists #tempSzerkezet 
	create table #tempSzerkezet (elozo int, parent int, child int, qty_req decimal(18,5), szint int)
	
		insert into WO_MSTR (wo_nbr, wo_part, wo_qty_ord, wo_due_date) values (@wo_nbr, @wo_part, @wo_qty_ord, cast(@wo_due_date as date))
		set @wo_lot = ident_current('WO_MSTR');
		
		
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

		--select tmp.elozo, tmp.parent, @wo_lot, tmp.child, tmp.qty_req, 0
		--from #tempSzerkezet tmp
		--where not exists (select 1 from dbo.k_f_termekek kf2 where kf2.part = tmp.child)
		insert into WOD_DET 
		select tmp.child, tmp.parent, @wo_lot, tmp.qty_req, 0, 0
		from #tempSzerkezet tmp
		where exists (select 1 from dbo.k_f_termekek kf where kf.part = tmp.child)
 
		insert into WOM_DET
		select tmp.parent, tmp.elozo,  @wo_lot, tmp.child, tmp.qty_req, 0
		from #tempSzerkezet tmp 
		where not exists (select 1 from dbo.k_f_termekek kf2 where kf2.part = tmp.child)
		
		drop table #tempSzerkezet
	

--exec newWo2 'tesztrend5', 1000, 10, '20230511'
	

--	/*
--		ha 1000  akkor
--		1 sor wo ba
--		3 sor wod ba
--		sor wom ba
		
--	*/
--	exec tesztWO 1000, 10
--select * from WO_MSTR
--select * from WOD_DET where wod_lot = 10080
--select * from WOM_DET
/*

*/
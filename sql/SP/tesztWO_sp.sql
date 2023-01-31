use Utemterv
go
create proc tesztWO
	@part int,
	@qty_req decimal(18,5)
as
with tempSzerkezet (parent, child, qty_req, szint)
			as
			(
				select  @part as parent, pt.pt_part as child, cast(@qty_req as decimal(18,5)) as qty_req, 1 as szint
				from pt_mstr pt
				where pt.pt_part = @part
				union all
				select ps.ps_par, ps.ps_comp, cast(cast(ps.ps_qty_per as decimal(18,5)) *  cast(tsz.qty_req as decimal(18,5)) as decimal(18,5)), szint + 1  
				from tempSzerkezet tsz inner join PS_MSTR ps on tsz.child = ps.ps_par
				
				
			)
				select * from tempSzerkezet


--exec tesztWO 1000, 300
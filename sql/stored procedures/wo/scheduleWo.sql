alter proc scheduleWo
(
@week int, @line varchar(8), @start_time time
)
as
begin
	create table #seged (wo_lot int, seq int, wo_part int, est_run time, wo_start_date date,  wo_start_time datetime, wo_end_time datetime, wo_pld_downtime time, wo_unpld_downtime time, elotte int, utana int, utana_part int );
	insert into #seged 
	select wo_lot, wo_seq,wo_part, wo_est_run,wo_start_date, wo_start_time, wo_end_time, wo_pld_downtime, wo_unpld_downtime
	, (
		select max(wo_seq) from dbo.hetiUtemterv where wo_seq < most.wo_seq
	) as elotte
	, (
		select min(wo_seq) from dbo.hetiUtemterv where wo_seq > most.wo_seq
	) as utana,
	 (
		select wo_part from dbo.hetiUtemterv where wo_seq = (select min(wo_seq) from dbo.hetiUtemterv where wo_seq > most.wo_seq)
	 )as utana_part

	from wo_mstr most
	where most.wo_line = @line
	and datepart(week, most.wo_start_date) = @week ;

	with #utemterv (wo_lot,elotte, seq,wo_part, wo_start_time,wo_end_time,wo_pld_downtime, wo_unpld_downtime )
	as
	(
	
		select 
			elso.wo_lot as wo_lot,
			elso.elotte as elotte,
			elso.seq as seq,
			elso.wo_part as wo_part,
			dbo.segedDatumIdoSum(cast(elso.wo_start_date as datetime), @start_time) as wo_start_time,
			dbo.segedDatumIdoSum(dbo.segedDatumIdoSum(cast(elso.wo_start_date as datetime), @start_time), elso.est_run),
			iif(elso.utana is not null,iif(elso.wo_part <> elso.utana_part, (select chg_time from CHG_MSTR where (elso.wo_part = chg_from and elso.utana_part = chg_to) or (elso.wo_part = chg_to and elso.utana_part = chg_from) ), '00:00' ), null) as wo_pld_downtime
			,elso.wo_unpld_downtime as wo_pld_down_time
			
		from #seged elso
		where elso.seq = (select min(seq) from #seged)

		union all

		select 
			most.wo_lot as wo_lot
			,most.elotte as elotte
			,most.seq as seq
			,most.wo_part as wo_part
			,dbo.segedDatumIdoSum( dbo.segedDatumIdoSum(elotte.wo_end_time, elotte.wo_pld_downtime), elotte.wo_unpld_downtime)--mostani start
			, dbo.segedDatumIdoSum(dbo.segedDatumIdoSum( dbo.segedDatumIdoSum(elotte.wo_end_time, elotte.wo_pld_downtime), elotte.wo_unpld_downtime), most.est_run)--mostani end
			,iif(most.utana is not null,iif(most.wo_part <> most.utana_part, (select chg_time from CHG_MSTR where (most.wo_part = chg_from and most.utana_part = chg_to) or (most.wo_part = chg_to and most.utana_part = chg_from) ), '00:00' ), null) --pld_downtime
			,most.wo_unpld_downtime --unpld
		from #seged most inner join #utemterv elotte on most.elotte = elotte.seq
	

	)
	update wo
	set wo.wo_start_time = ut.wo_start_time
		,wo.wo_end_time = ut.wo_end_time
		,wo.wo_pld_downtime = ut.wo_pld_downtime
		--,wo.wo_unpld_downtime = ut.wo_unpld_downtime
	from #utemterv ut inner join WO_MSTR wo on ut.wo_lot = wo.wo_lot
	
	
	drop table #seged

	/*összehasonlítás képpen*/
	--go

	--create table #seged (wo_lot int, seq int, wo_part int, est_run time,  wo_start_time time, wo_end_time time, wo_pld_downtime time, wo_unpld_downtime time, elotte int, utana int, utana_part int );
	--insert into #seged 
	--select wo_lot, wo_seq,wo_part, est_run, null, null, wo_pld_downtime, wo_unpld_downtime
	--, (
	--	select max(wo_seq) from dbo.hetiUtemterv where wo_seq < most.wo_seq
	--) as elotte
	--, (
	--	select min(wo_seq) from dbo.hetiUtemterv where wo_seq > most.wo_seq
	--) as utana,
	-- (
	--	select wo_part from dbo.hetiUtemterv where wo_seq = (select min(wo_seq) from dbo.hetiUtemterv where wo_seq > most.wo_seq)
	-- )as utana_part

	--from dbo.hetiUtemterv most
	--where most.wo_line = 'line_01'
	--and datepart(week, most.wo_start_date) = 1 ;

	--update #seged
	--set wo_start_time = '08:00'
	--from #seged
	--where seq = (select min(seq) from #seged)

	--update most
	--set 
	--most.wo_end_time = cast(cast(most.est_run as datetime) + cast(most.wo_start_time as datetime) as time) --dateadd(s,datepart(s,most.est_run), dateadd(mi, datepart(mi,most.est_run),dateadd(hh,datepart(hh,most.est_run),most.wo_start_time)))
	--	, wo_pld_downtime =iif(most.wo_part = utana.wo_part, cast('00:00'  as time), (select chg_time from CHG_MSTR where (most.wo_part = chg_from and utana.wo_part = chg_to) or (most.wo_part = chg_to and utana.wo_part = chg_from) ) )
	--from #seged most left outer join #seged utana on most.utana = utana.seq
	--where most.seq = (select min(seq) from #seged) ;


	--declare @index int = 0, @length int = (select count(*) from #seged)
	--while(@index < @length)
	--begin
	--	update most
	--	set most.wo_start_time = iif(elotte.seq is not null, cast(cast(elotte.wo_end_time as datetime) + cast(elotte.wo_pld_downtime as datetime) as time) , '00:00')
	--	, most.wo_end_time = cast(cast(most.est_run as datetime) + cast(elotte.wo_end_time as datetime) + cast(elotte.wo_pld_downtime as datetime) as time)
	--		, most.wo_pld_downtime = iif(most.wo_part = utana.wo_part, cast('00:00'  as time), (select chg_time from CHG_MSTR where (most.wo_part = chg_from and utana.wo_part = chg_to) or (most.wo_part = chg_to and utana.wo_part = chg_from))  )
	--	--select most.seq as most, elotte.seq as elotte, utana.seq as utana
	--	from  #seged most left outer join #seged utana on most.utana = utana.seq
	--										left outer join #seged elotte on most.elotte = elotte.seq
	--	where most.seq = (select min(seq) from #seged where wo_start_time is null);
	--	set @index = @index + 1;
	--end
	--select * from #seged
	--order by seq
	
	--drop table #seged
	
end
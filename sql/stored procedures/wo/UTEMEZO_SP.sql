create proc scheduleWo
(
@week int, @line varchar(8)
)
as
begin
	create table #seged (wo_lot int, seq int, wo_part int, est_run time,  wo_start_time time, wo_end_time time, wo_pld_downtime time, wo_unpld_downtime time, elotte int, utana int );
	insert into #seged 
	select wo_lot, wo_seq,wo_part, est_run, null, null, wo_pld_downtime, wo_unpld_downtime
	, (
		select max(wo_seq) from dbo.hetiUtemterv where wo_seq < most.wo_seq
	) as elotte
	, (
		select min(wo_seq) from dbo.hetiUtemterv where wo_seq > most.wo_seq
	) as utana

	from dbo.hetiUtemterv most
	where most.wo_line = 'line_01'
	and datepart(week, most.wo_start_date) = 1 ;

	update #seged
	set wo_start_time = '08:00'
	from #seged
	where seq = (select min(seq) from #seged)

	update most
	set 
	most.wo_end_time = cast(cast(most.est_run as datetime) + cast(most.wo_start_time as datetime) as time) --dateadd(s,datepart(s,most.est_run), dateadd(mi, datepart(mi,most.est_run),dateadd(hh,datepart(hh,most.est_run),most.wo_start_time)))
		, wo_pld_downtime =iif(most.wo_part = utana.wo_part, cast('00:00'  as time), (select chg_time from CHG_MSTR where (most.wo_part = chg_from and utana.wo_part = chg_to) or (most.wo_part = chg_to and utana.wo_part = chg_from) ) )
	from #seged most left outer join #seged utana on most.utana = utana.seq
	where most.seq = (select min(seq) from #seged) ;


	declare @index int = 0, @length int = (select count(*) from #seged)
	while(@index < @length)
	begin
		update most
		set most.wo_start_time = iif(elotte.seq is not null, cast(cast(elotte.wo_end_time as datetime) + cast(elotte.wo_pld_downtime as datetime) as time) , '00:00')
		, most.wo_end_time = cast(cast(most.est_run as datetime) + cast(elotte.wo_end_time as datetime) + cast(elotte.wo_pld_downtime as datetime) as time)
			, most.wo_pld_downtime = iif(most.wo_part = utana.wo_part, cast('00:00'  as time), (select chg_time from CHG_MSTR where (most.wo_part = chg_from and utana.wo_part = chg_to) or (most.wo_part = chg_to and utana.wo_part = chg_from))  )
		--select most.seq as most, elotte.seq as elotte, utana.seq as utana
		from  #seged most left outer join #seged utana on most.utana = utana.seq
											left outer join #seged elotte on most.elotte = elotte.seq
		where most.seq = (select min(seq) from #seged where wo_start_time is null);
		set @index = @index + 1;
	end
	select * from #seged
	order by seq
	
	drop table #seged



	
end

--declare @eSorszam int;

	--update most
	--set 
	--most.wo_end_time = cast(cast(most.est_run as datetime) + cast(most.wo_start_time as datetime) as time) --dateadd(s,datepart(s,most.est_run), dateadd(mi, datepart(mi,most.est_run),dateadd(hh,datepart(hh,most.est_run),most.wo_start_time)))
	--	, wo_pld_downtime =iif(most.wo_part = utana.wo_part, cast('00:00'  as time), (select chg_time from CHG_MSTR where (most.wo_part = chg_from and utana.wo_part = chg_to) or (most.wo_part = chg_to and utana.wo_part = chg_from) ) )
	--from #seged most left outer join #seged utana on most.utana = utana.seq
	--where most.seq = (select min(seq) from #seged) ;
	

	--update most
	--set
	--	 most.wo_start_time =  cast(cast(elotte.wo_end_time as datetime) + cast(elotte.wo_pld_downtime as datetime) as time)
	--	, most.wo_end_time = cast(cast(most.est_run as datetime) + cast(elotte.wo_end_time as datetime) + cast(elotte.wo_pld_downtime as datetime) as time)
	--	, most.wo_pld_downtime =iif(most.wo_part = utana.wo_part, cast('00:00'  as time), (select chg_time from CHG_MSTR where (most.wo_part = chg_from and utana.wo_part = chg_to) or (most.wo_part = chg_to and utana.wo_part = chg_from))  )
	--from #seged most inner join #seged elotte on most.elotte = elotte.seq
	--			  left outer join #seged utana on most.utana = utana.seq
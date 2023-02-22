alter proc scheduleWo
(
@week int, @line varchar(8), @start_time time, @year char(4)
)
as
begin
	create table #seged (wo_lot int, seq int, wo_part int, est_run time, wo_start_date date,  wo_start_time datetime, wo_end_time datetime, wo_pld_downtime time, wo_unpld_downtime time, elotte int, utana int, utana_part int );
	insert into #seged 
	select wo_lot, wo_seq,wo_part, wo_est_run,wo_start_date, wo_start_time, wo_end_time, wo_pld_downtime, wo_unpld_downtime
	, (
		select max(wo_seq) from dbo.hetiUtemterv where wo_seq < most.wo_seq  and datepart(week, wo_start_date) = @week and cast(datepart(YYYY, wo_start_date) as char(4)) = @year
	) as elotte
	, (
		select min(wo_seq) from dbo.hetiUtemterv where wo_seq > most.wo_seq  and datepart(week, wo_start_date) = @week and cast(datepart(YYYY, wo_start_date) as char(4)) = @year
	) as utana,
	 (
		select wo_part from dbo.hetiUtemterv where wo_seq = (select min(wo_seq) from dbo.hetiUtemterv where wo_seq > most.wo_seq  and datepart(week, wo_start_date) = @week and cast(datepart(YYYY, wo_start_date) as char(4)) = @year) and datepart(week, wo_start_date) = @week and cast(datepart(YYYY, wo_start_date) as char(4)) = @year
	 )as utana_part

	from wo_mstr most
	where most.wo_line = @line
	and datepart(week, most.wo_start_date) = @week
	and cast(datepart(YYYY, most.wo_start_date) as char(4)) = @year;

	if(0 = (select count(*) from #seged where seq is null))
		begin
		create table #segedUtemterv (wo_lot int,elotte int, seq int,wo_part int, wo_start_time datetime,wo_end_time datetime, wo_pld_downtime time, wo_unpld_downtime time);
			with #utemterv (wo_lot,elotte, seq,wo_part, wo_start_time,wo_end_time,wo_pld_downtime, wo_unpld_downtime )
			as
			(
	
				select 
					elso.wo_lot as wo_lot,
					elso.elotte as elotte,
					elso.seq as seq,
					elso.wo_part as wo_part,
					dbo.segedDatumIdoSum(cast(elso.wo_start_date as datetime), cast('00:00' as time)) as wo_start_time,
					dbo.segedDatumIdoSum(dbo.segedDatumIdoSum(cast(elso.wo_start_date as datetime), cast('00:00' as time)), elso.est_run),
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
			insert into #segedUtemterv
			select * from #utemterv

			update wo
			set wo.wo_start_time = ut.wo_start_time
				,wo.wo_end_time = ut.wo_end_time
				,wo.wo_pld_downtime = ut.wo_pld_downtime
			from #segedUtemterv ut inner join WO_MSTR wo on ut.wo_lot = wo.wo_lot

			declare @versionOfSch tinyint;
			set @versionOfSch = isnull((select max(xwo_version) from XWO_HIST where xwo_week =@week ), 0)+1;

			insert into XWO_HIST
			select @year, @week, su.wo_lot, @versionOfSch, wo.wo_est_run, su.seq, wo.wo_start_date, su.wo_start_time, su.wo_end_time, su.wo_pld_downtime, su.wo_unpld_downtime
			from #segedUtemterv su inner join WO_MSTR wo on su.wo_lot = wo.wo_lot

			select *
			from hetiutemterv
			where wo_line = @line
			and datepart(week, wo_start_date) = @week
			and datepart(YYYY, wo_start_date) = @year;

			drop table #segedUtemterv
	end
	else
		raiserror('NOT_ALL_SEQ_DEFINED', 18,10);
	drop table #seged
end


--exec scheduleWo 1, 'line_01', '00:00', '2023'	

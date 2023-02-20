alter proc newLad
(
	@ladPart int, @ladPar int, @LadLot int, @ladComp int, @ladExpire datetime, @ladAmount decimal(18,5)
	
)
as
begin
	declare @letezik int = (
							select COUNT(*) 
							from LAD_DET 
							where lad_part = @ladPart
							and lad_par = @ladPar
							and lad_lot = @LadLot
							and lad_comp = @ladComp 
							and lad_expire = cast(@ladExpire as date)
							);

	if(@letezik > 0)
		begin
			update lad
			set lad_qty_rsrv = @ladAmount
			from LAD_DET lad
			where lad_part = @ladPart
			and lad_par = @ladPar
			and lad_lot = @LadLot
			and lad_comp = @ladComp 
			and lad_expire = cast(@ladExpire as date)
		end
	else
		begin
		insert into LAD_DET values (@ladPart, @ladPar, @LadLot, @ladComp, cast(@ladExpire as date), @ladAmount, null);
		end
end

--exec newLad 1000,	1000,	10000,	1001,	'2030-01-01',	10.00000


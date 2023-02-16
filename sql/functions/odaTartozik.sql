create function odaTartozik
(
	@part int, @par int, @mat int, @lot int
)
returns int
as
begin
	declare @rsrv decimal(18,5), @eredmeny bit = 0;

	return(select COUNT(*)
	from wom_det
	where wom_part = @part
	and wom_par = @par
	and wom_mat = @mat
	and wom_lot = @lot)

end


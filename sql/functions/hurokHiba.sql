-----ps mstr constraint
-----ne lehessen olyan szerkezetet felvinni, ahol a késztermék egyik beépülõje saját maga
create function hurokHiba (@par int, @comp int) --1-et ad vissza, ha talált hurkot, 0-t, ha nincs hurok
returns int
as
begin
	declare @vissza int;
	with fa(par)
	as
	(
		select @par as par
		union all 
		select PS.ps_par from PS_MSTR PS inner join fa on PS.ps_comp = fa.par
	)
	select @vissza = count(*) from fa where fa.par = @comp
	
return @vissza
end
go
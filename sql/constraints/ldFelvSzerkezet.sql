--------készlet constraint -> nem lehet szerkezete a felvivendõ anyagnak
create function ldPartNotInSzerkezetes(@part int)
	
	returns bit
	as
	BEGIN
        declare @benne bit
		if (@part in (select * from szerkezetesAnyagok))
			set @benne = 1
		if (@part not in (select * from szerkezetesAnyagok))
			set @benne = 0
		return @benne
    END

ALTER TABLE ld_det ADD CONSTRAINT CK_Szerkezetes_anyagok check(dbo.ldPartNotInSzerkezetes(ld_part) = 0)
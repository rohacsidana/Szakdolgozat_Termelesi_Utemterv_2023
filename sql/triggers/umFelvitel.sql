alter trigger mertekegysFelv on PT_MSTR
after insert
as 
begin
	declare @um varchar(10)
	select @um = LOWER(pt_um) from inserted

	if @um not in (select "value" from DICTIONARY where "type" = 'um')
	begin
		insert into DICTIONARY values(LOWER(@um), 'um', NULL)
	end
end
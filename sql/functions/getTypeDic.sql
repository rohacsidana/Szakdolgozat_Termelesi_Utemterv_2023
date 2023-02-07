create function getTypeDic
(
	@value varchar(10)
)
returns varchar(10)
as
begin
declare @type varchar(10)
	select @type = d.type
	from DICTIONARY d
	where d.value = @value

	return @type
end
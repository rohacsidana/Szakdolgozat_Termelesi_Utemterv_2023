CREATE TRIGGER szerkezetesLdPart
ON ld_det
AFTER  insert
AS
declare @insertedPart int
select @insertedPart=ld_part from inserted
if 'Has Structure' in (select dbo.szerkezetesE(@insertedPart))
rollback


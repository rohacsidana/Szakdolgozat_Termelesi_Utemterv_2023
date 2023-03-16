
alter TRIGGER UpdateStatus 
   on WO_MSTR
   AFTER UPDATE
AS 
BEGIN
	SET NOCOUNT ON;
	declare @oldStatus varchar(10), @newStatus varchar(10), @kellRB bit = 0, @wo_lot int , @wo_part int, @wo_qty_ord int

	select @oldStatus = wo_status
	from deleted

	select @newStatus = wo_status, @wo_lot = wo_lot, @wo_part = wo_part, @wo_qty_ord = wo_qty_ord
	from inserted


	if(@oldStatus <> @newStatus)
	begin
		set @kellRB = case
			when @oldStatus = 'waiting' and @newStatus <> 'accepted' then 1
			when @oldStatus = 'accepted' and @newStatus <> 'ongoing' then 1
			when @oldStatus = 'ongoing' and @newStatus <> 'completed' then 1
			when @oldStatus = 'completed' and @newStatus <> 'completed' then 1
			else 0
		end;
	end
	
	if(@kellRB <> 1 and @oldStatus = 'waiting' and @newStatus = 'accepted')
		begin
			exec newStructure @wo_lot , @wo_part , @wo_qty_ord 
		end

	if(@kellRB = 1)
		rollback
END


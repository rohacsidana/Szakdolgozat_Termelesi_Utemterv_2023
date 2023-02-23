alter function runningLine
(
	@line varchar(8)
)
returns int
as
begin
	return (
				select count(*)
				from WO_MSTR
				where wo_line = @line
				and wo_status = 'ongoing'
			)
end

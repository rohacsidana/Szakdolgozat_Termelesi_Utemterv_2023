alter proc changePwByAdminUser
(
	 @email varchar(50), @pw varchar(32), @role int
)
as
if(1 = @role)
begin
	update u
	set "password" = @pw
	from "USER" u
	where email = @email
end
else 
	raiserror('Access denied!',18,1)
	
	--exec changePwByAdminUser 190, 'jelszó', 1
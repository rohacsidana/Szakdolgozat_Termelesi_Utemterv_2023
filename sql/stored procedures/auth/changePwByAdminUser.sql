alter proc changePwByAdminUser
(
	 @user_id int, @pw varchar(32), @role int
)
as
if(3 = @role)
begin
	update u
	set "password" = @pw
	from "USER" u
	where "user_id" = @user_id
end
else 
	raiserror('Access denied!',18,1)
	
	--exec changePwByAdminUser 190, 'jelszó', 3
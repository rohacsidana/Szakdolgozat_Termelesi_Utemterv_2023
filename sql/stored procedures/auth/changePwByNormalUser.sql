create proc changePwByNormalUser
(
	 @user_id int, @pw varchar(32)
)
as
update u
set "password" = @pw
from "USER" u
where "user_id" = @user_id
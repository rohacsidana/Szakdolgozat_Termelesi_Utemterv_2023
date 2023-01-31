--------**USER**-----------
create proc userList
as 
select user_id, name, birth_date, email, post
from "user"
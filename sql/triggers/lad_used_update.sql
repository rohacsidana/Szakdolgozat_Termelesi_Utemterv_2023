USE [Utemterv]
GO
/****** Object:  Trigger [dbo].[lad_used_update]    Script Date: 2023. 02. 23. 20:03:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER trigger [dbo].[lad_used_update]
	on [dbo].[LAD_DET]
	after update
	as
begin
	declare @oldUsed decimal(18,5),  @newUsed decimal(18,5), @kellRB int = 0;
	select @oldUsed = lad_qty_used from deleted;
	select @newUsed= lad_qty_used from inserted;
	if(@newUsed is not null)
	begin
		declare @rsrv decimal(18,5) = (select lad_qty_rsrv from inserted);
			set @kellRB = 
			case
				when @newUsed is null then 1
				when @newUsed >  @rsrv then 1
				when  @newUsed < 0 then 1
				else 0
			end
		if(@kellRB = 0)
		begin
	
			if(@oldUsed is  null)
			begin
				update LD_DET
				set ld_qty_oh += lad_qty_rsrv - @newUsed
				, ld_qty_rsrv -= lad_qty_rsrv - @newUsed
				from LD_DET  inner join inserted  on ld_part = lad_comp and ld_expire = lad_expire

	
			end
			else
				begin
					if(@oldUsed < @newUsed)
							begin
								update LD_DET
								set ld_qty_oh -= @newUsed - @oldUsed
								, ld_qty_rsrv +=  @newUsed - @oldUsed
								from LD_DET  inner join inserted  on ld_part = lad_comp and ld_expire = lad_expire
							end
						else
							begin
								update LD_DET
								set ld_qty_oh += @oldUsed - @newUsed 
								, ld_qty_rsrv -=  @oldUsed - @newUsed 
								from LD_DET  inner join inserted  on ld_part = lad_comp and ld_expire = lad_expire
							end

				end
		
			
		
		
		end
		else
			begin
				rollback
			end
	end
	
end


alter trigger seq_update on wo_mstr
	after update
as
begin
	if( (select count(*)
		 from inserted i inner join deleted d on i.wo_lot = d.wo_lot
		 where d.wo_seq is not null
		 and i.wo_seq is not null
		 and d.wo_status <> 'accepted'
		 and d.wo_seq <> i.wo_seq) > 0)	
			rollback
		

end
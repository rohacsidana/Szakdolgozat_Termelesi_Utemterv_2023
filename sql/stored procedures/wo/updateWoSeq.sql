
ALTER proc updateWoSeq
(
	@lot int, @seq int
)
as
	update WO_MSTR
	set wo_seq = @seq
	where wo_lot = @lot

--exec updateWoSeq 10010, 9
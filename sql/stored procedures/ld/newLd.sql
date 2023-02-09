alter proc newLd
	   @part int = null,
       @expire varchar(8)= null,
	   @oh decimal(18,5) = null
as 
	insert into LD_DET values(@part, cast(@expire as date), @oh, 0, 0)

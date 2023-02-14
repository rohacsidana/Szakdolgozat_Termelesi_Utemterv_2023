alter FUNCTION dbo.GetPSTreeStructure (@ps_par INT)
RETURNS @Structure TABLE (
    ps_par INT,
    ps_comp INT,
    level INT,
    ps_qty_per decimal(18,5)
)
AS
BEGIN
    WITH temp AS (
    SELECT ps_par, ps_comp, 1 AS level, CAST(ps_qty_per AS decimal(18, 5)) AS ps_qty_per
    FROM PS_MSTR
    WHERE ps_par = @ps_par
UNION ALL
    SELECT PS_MSTR.ps_par, PS_MSTR.ps_comp, temp.level + 1, CAST(temp.ps_qty_per * PS_MSTR.ps_qty_per AS decimal(18, 5)) AS ps_qty_per
    FROM PS_MSTR
    JOIN temp ON temp.ps_comp = PS_MSTR.ps_par
)
    INSERT INTO @Structure (ps_par, ps_comp, level, ps_qty_per)
    SELECT ps_par, ps_comp, level, ps_qty_per
    FROM temp, PT_MSTR par, PT_MSTR comp where ps_par = par.pt_part and ps_comp = comp.pt_part
    ORDER BY level desc
    RETURN
END


--select * from dbo.GetPSTreeStructure (1007)

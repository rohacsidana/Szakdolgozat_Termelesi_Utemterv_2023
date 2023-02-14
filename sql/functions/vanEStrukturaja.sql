CREATE FUNCTION dbo.vanEStrukturaja (@ps_par int)
RETURNS varchar(50)
AS
BEGIN
    DECLARE @structure varchar(50);
    
    SELECT @structure = CASE 
        WHEN ps_comp IS NULL THEN 'No Structure'
        WHEN EXISTS (
            SELECT 1
            FROM PS_MSTR
            WHERE ps_par = @ps_par
            AND ps_comp = ps.ps_comp
        ) THEN 'Has Structure'
        ELSE 'No Structure'
    END
    FROM PS_MSTR ps
    WHERE ps.ps_par = @ps_par;

    RETURN @structure;
END
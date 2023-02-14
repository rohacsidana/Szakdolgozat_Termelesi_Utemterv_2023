create view nincsSzerkezete as
SELECT DISTINCT ps_comp
FROM PS_MSTR
WHERE ps_comp NOT IN (
    SELECT DISTINCT ps_par
    FROM PS_MSTR
    WHERE ps_par IS NOT NULL
)
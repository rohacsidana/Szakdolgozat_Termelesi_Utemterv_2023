ALTER TABLE CHG_MSTR ADD CONSTRAINT FromAndToNotSame CHECK(dbo.checkSameFromTo(chg_line,chg_from,chg_to)=0)
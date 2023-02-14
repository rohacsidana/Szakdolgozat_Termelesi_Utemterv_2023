USE [Utemterv]
GO

ALTER TABLE [dbo].[CHG_MSTR]  WITH CHECK ADD  CONSTRAINT [csakKesztermekek] CHECK  (([dbo].[isChgInSzerkezetesAnyagok]([chg_from],[chg_to])=(1)))
GO

ALTER TABLE [dbo].[CHG_MSTR] CHECK CONSTRAINT [csakKesztermekek]
GO



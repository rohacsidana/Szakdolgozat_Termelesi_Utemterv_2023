USE [Utemterv]
GO

ALTER TABLE [dbo].[CHG_MSTR]  WITH CHECK ADD  CONSTRAINT [partInLnd] CHECK  (([dbo].[getLnd]([chg_line],[chg_from])=(1) AND [dbo].[getLnd]([chg_line],[chg_to])=(1)))
GO

ALTER TABLE [dbo].[CHG_MSTR] CHECK CONSTRAINT [partInLnd]
GO



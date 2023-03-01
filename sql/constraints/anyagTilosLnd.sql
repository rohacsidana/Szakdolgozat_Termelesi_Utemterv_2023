USE [Utemterv]
GO

ALTER TABLE [dbo].[LND_DET]  WITH CHECK ADD  CONSTRAINT [anyagTilos] CHECK  (([dbo].[anyagE]([lnd_part])=(1)))
GO

ALTER TABLE [dbo].[LND_DET] CHECK CONSTRAINT [anyagTilos]
GO



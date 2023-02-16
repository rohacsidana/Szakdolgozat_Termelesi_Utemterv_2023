USE [Utemterv]
GO
INSERT [dbo].[LD_DET] ([ld_part], [ld_expire], [ld_qty_oh], [ld_qty_rsrv], [ld_qty_scrp]) VALUES (1001, CAST(N'2030-01-01' AS Date), CAST(990.00000 AS Decimal(18, 5)), CAST(10.00000 AS Decimal(18, 5)), CAST(0.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[LD_DET] ([ld_part], [ld_expire], [ld_qty_oh], [ld_qty_rsrv], [ld_qty_scrp]) VALUES (1004, CAST(N'2030-01-01' AS Date), CAST(960.00000 AS Decimal(18, 5)), CAST(40.00000 AS Decimal(18, 5)), CAST(0.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[LD_DET] ([ld_part], [ld_expire], [ld_qty_oh], [ld_qty_rsrv], [ld_qty_scrp]) VALUES (1006, CAST(N'2030-01-01' AS Date), CAST(880.00000 AS Decimal(18, 5)), CAST(120.00000 AS Decimal(18, 5)), CAST(0.00000 AS Decimal(18, 5)))
GO
SET IDENTITY_INSERT [dbo].[LAD_DET] ON 
GO
INSERT [dbo].[LAD_DET] ([lad_id], [lad_part], [lad_par], [lad_lot], [lad_comp], [lad_expire], [lad_qty_rsrv], [lad_qty_used]) VALUES (20030, 1000, 1000, 10000, 1001, CAST(N'2030-01-01' AS Date), CAST(10.00000 AS Decimal(18, 5)), CAST(0.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[LAD_DET] ([lad_id], [lad_part], [lad_par], [lad_lot], [lad_comp], [lad_expire], [lad_qty_rsrv], [lad_qty_used]) VALUES (20040, 1002, 1000, 10000, 1004, CAST(N'2030-01-01' AS Date), CAST(40.00000 AS Decimal(18, 5)), CAST(0.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[LAD_DET] ([lad_id], [lad_part], [lad_par], [lad_lot], [lad_comp], [lad_expire], [lad_qty_rsrv], [lad_qty_used]) VALUES (20050, 1003, 1002, 10000, 1006, CAST(N'2030-01-01' AS Date), CAST(120.00000 AS Decimal(18, 5)), CAST(0.00000 AS Decimal(18, 5)))
GO
SET IDENTITY_INSERT [dbo].[LAD_DET] OFF
GO

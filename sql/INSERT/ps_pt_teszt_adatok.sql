USE [Utemterv]
GO

--INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1000, N'asztal', N'db', NULL)
--GO
--INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1001, N'asztal lap', N'db', NULL)
--GO
--INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1002, N'asztallb kész', N'db', NULL)
--GO
--INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1003, N'asztal láb', N'db', NULL)
--GO
--INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1004, N'csúszásgátló', N'db', NULL)
SET IDENTITY_INSERT [dbo].[PT_MSTR] ON 
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (10051, N'Műzli szelet', N'db', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (10061, N'bevonat', N'réteg', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (10071, N'Szék', N'db', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (10091, N'Hát-rész', N'db', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (10101, N'Szék-láb', N'db', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (10111, N'Ülés', N'db', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (10131, N'Láb-rész', N'db', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (10141, N'Karfa', N'pár', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (10151, N'Háttámla', N'db', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (10171, N'Gesztenye Ember', N'db', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (10181, N'Gesztenye', N'db', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (10191, N'Fogpiszkáló', N'db', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (10201, N'Kész műzliszelet', N'db', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (10211, N'Műzliszelet', N'db', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (10221, N'Csomagolóanyag', N'm2', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (10251, N'Műzlirúd', N'db', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (10261, N'Csokibevonat', N'ml', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (10271, N'Műzlikeverék', N'dkg', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (10281, N'Méz', N'g', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (10291, N'Csokipor', N'g', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (10301, N'Tej', N'dl', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (10311, N'Kukipehely', N'dkg', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (10321, N'Búzadara', N'dkg', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (10331, N'Nátrium-glutamát', N'g', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (10341, N'Mogyoró', N'dkg', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (10351, N'Napraforgómag', N'dkg', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (10361, N'Szék-láb alap', N'db', NULL)
GO
SET IDENTITY_INSERT [dbo].[PT_MSTR] OFF
GO
--INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1000, 1001, CAST(1.00000 AS Decimal(18, 5)))
--GO
--INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1000, 1002, CAST(4.00000 AS Decimal(18, 5)))
--GO
--INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1002, 1003, CAST(1.00000 AS Decimal(18, 5)))
--GO
--INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1002, 1004, CAST(1.00000 AS Decimal(18, 5)))
--GO
--INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1003, 1006, CAST(3.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (10071, 10091, CAST(1.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (10071, 10111, CAST(1.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (10071, 10131, CAST(1.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (10091, 10151, CAST(1.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (10101, 1004, CAST(1.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (10101, 10361, CAST(1.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (10131, 10101, CAST(4.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (10131, 10141, CAST(1.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (10171, 10181, CAST(2.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (10171, 10191, CAST(5.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (10201, 10211, CAST(1.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (10201, 10221, CAST(0.10000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (10211, 10251, CAST(1.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (10211, 10261, CAST(150.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (10251, 10271, CAST(30.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (10251, 10281, CAST(30.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (10261, 10291, CAST(25.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (10261, 10301, CAST(2.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (10271, 10311, CAST(10.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (10271, 10321, CAST(40.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (10271, 10331, CAST(6.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (10271, 10341, CAST(25.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (10271, 10351, CAST(15.00000 AS Decimal(18, 5)))
GO

USE [Utemterv]
GO
SET IDENTITY_INSERT [dbo].[PT_MSTR] ON
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1000, N'asztal', N'db', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1001, N'asztal lap', N'db', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1002, N'asztallb kész', N'db', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1003, N'asztal láb', N'db', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1004, N'csúszásgátló', N'db', NULL)
SET IDENTITY_INSERT [dbo].[PT_MSTR] ON 
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1005, N'Műzli szelet', N'db', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1006, N'bevonat', N'réteg', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1007, N'Szék', N'db', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1009, N'Hát-rész', N'db', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1010, N'Szék-láb', N'db', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1011, N'Ülés', N'db', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1013, N'Láb-rész', N'db', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1014, N'Karfa', N'pár', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1015, N'Háttámla', N'db', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1017, N'Gesztenye Ember', N'db', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1018, N'Gesztenye', N'db', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1019, N'Fogpiszkáló', N'db', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1020, N'Kész műzliszelet', N'db', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1021, N'Műzliszelet', N'db', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1022, N'Csomagolóanyag', N'm2', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1025, N'Műzlirúd', N'db', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1026, N'Csokibevonat', N'ml', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1027, N'Műzlikeverék', N'dkg', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1028, N'Méz', N'g', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1029, N'Csokipor', N'g', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1030, N'Tej', N'dl', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1031, N'Kukipehely', N'dkg', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1032, N'Búzadara', N'dkg', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1033, N'Nátrium-glutamát', N'g', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1034, N'Mogyoró', N'dkg', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1035, N'Napraforgómag', N'dkg', NULL)
GO
INSERT [dbo].[PT_MSTR] ([pt_part], [pt_desc], [pt_um], [pt_qty_oh]) VALUES (1036, N'Szék-láb alap', N'db', NULL)
GO
SET IDENTITY_INSERT [dbo].[PT_MSTR] OFF
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1000, 1001, CAST(1.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1000, 1002, CAST(4.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1002, 1003, CAST(1.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1002, 1004, CAST(1.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1003, 1006, CAST(3.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1007, 1009, CAST(1.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1007, 1011, CAST(1.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1007, 1013, CAST(1.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1009, 1015, CAST(1.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1010, 1004, CAST(1.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1010, 1036, CAST(1.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1013, 1010, CAST(4.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1013, 1014, CAST(1.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1017, 1018, CAST(2.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1017, 1019, CAST(5.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1020, 1021, CAST(1.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1020, 1022, CAST(0.10000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1021, 1025, CAST(1.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1021, 1026, CAST(150.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1025, 1027, CAST(30.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1025, 1028, CAST(30.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1026, 1029, CAST(25.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1026, 1030, CAST(2.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1027, 1031, CAST(10.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1027, 1032, CAST(40.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1027, 1033, CAST(6.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1027, 1034, CAST(25.00000 AS Decimal(18, 5)))
GO
INSERT [dbo].[PS_MSTR] ([ps_par], [ps_comp], [ps_qty_per]) VALUES (1027, 1035, CAST(15.00000 AS Decimal(18, 5)))
GO

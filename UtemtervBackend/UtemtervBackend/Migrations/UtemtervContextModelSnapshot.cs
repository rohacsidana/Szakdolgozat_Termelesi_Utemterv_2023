﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using UtemtervBackend.Models;

#nullable disable

namespace UtemtervBackend.Migrations
{
    [DbContext(typeof(UtemtervContext))]
    partial class UtemtervContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("UtemtervBackend.Models.ChgMstr", b =>
                {
                    b.Property<string>("ChgLine")
                        .HasMaxLength(8)
                        .IsUnicode(false)
                        .HasColumnType("varchar(8)")
                        .HasColumnName("chg_line");

                    b.Property<int>("ChgFrom")
                        .HasColumnType("int")
                        .HasColumnName("chg_from");

                    b.Property<int>("ChgTo")
                        .HasColumnType("int")
                        .HasColumnName("chg_to");

                    b.Property<TimeSpan>("ChgTime")
                        .HasPrecision(0)
                        .HasColumnType("time(0)")
                        .HasColumnName("chg_time");

                    b.HasKey("ChgLine", "ChgFrom", "ChgTo")
                        .HasName("PK__CHG_MSTR__5E79CE4520D3D4E5");

                    b.HasIndex("ChgFrom");

                    b.HasIndex("ChgTo");

                    b.ToTable("CHG_MSTR", (string)null);
                });

            modelBuilder.Entity("UtemtervBackend.Models.Dictionary", b =>
                {
                    b.Property<string>("Value")
                        .HasMaxLength(10)
                        .IsUnicode(false)
                        .HasColumnType("varchar(10)")
                        .HasColumnName("value");

                    b.Property<string>("Type")
                        .HasMaxLength(10)
                        .IsUnicode(false)
                        .HasColumnType("varchar(10)")
                        .HasColumnName("type");

                    b.Property<string>("Desc")
                        .HasMaxLength(40)
                        .IsUnicode(false)
                        .HasColumnType("varchar(40)")
                        .HasColumnName("desc");

                    b.HasKey("Value", "Type")
                        .HasName("PK__DICTIONA__CE846F1FFCA6B506");

                    b.ToTable("DICTIONARY", (string)null);
                });

            modelBuilder.Entity("UtemtervBackend.Models.LadDet", b =>
                {
                    b.Property<int>("LadId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("lad_id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("LadId"));

                    b.Property<int?>("LadComp")
                        .HasColumnType("int")
                        .HasColumnName("lad_comp");

                    b.Property<DateTime?>("LadExpire")
                        .HasColumnType("date")
                        .HasColumnName("lad_expire");

                    b.Property<int?>("LadLot")
                        .HasColumnType("int")
                        .HasColumnName("lad_lot");

                    b.Property<int?>("LadPar")
                        .HasColumnType("int")
                        .HasColumnName("lad_par");

                    b.Property<int?>("LadPart")
                        .HasColumnType("int")
                        .HasColumnName("lad_part");

                    b.Property<decimal?>("LadQtyRsrv")
                        .HasColumnType("decimal(18, 5)")
                        .HasColumnName("lad_qty_rsrv");

                    b.Property<decimal?>("LadQtyUsed")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("decimal(18, 5)")
                        .HasColumnName("lad_qty_used")
                        .HasDefaultValueSql("((0))");

                    b.HasKey("LadId")
                        .HasName("PK__LAD_DET__24E373655BEE47CF");

                    b.HasIndex("LadComp", "LadExpire");

                    b.HasIndex("LadPart", "LadPar", "LadLot");

                    b.ToTable("LAD_DET", (string)null);
                });

            modelBuilder.Entity("UtemtervBackend.Models.LdDet", b =>
                {
                    b.Property<int>("LdPart")
                        .HasColumnType("int")
                        .HasColumnName("ld_part");

                    b.Property<DateTime>("LdExpire")
                        .HasColumnType("date")
                        .HasColumnName("ld_expire");

                    b.Property<decimal>("LdQtyOh")
                        .HasColumnType("decimal(18, 5)")
                        .HasColumnName("ld_qty_oh");

                    b.Property<decimal>("LdQtyRsrv")
                        .HasColumnType("decimal(18, 5)")
                        .HasColumnName("ld_qty_rsrv");

                    b.Property<decimal>("LdQtyScrp")
                        .HasColumnType("decimal(18, 5)")
                        .HasColumnName("ld_qty_scrp");

                    b.HasKey("LdPart", "LdExpire")
                        .HasName("PK__LD_DET__DA795338DCFDE6BB");

                    b.ToTable("LD_DET", (string)null);
                });

            modelBuilder.Entity("UtemtervBackend.Models.LnMstr", b =>
                {
                    b.Property<string>("LnLine")
                        .HasMaxLength(8)
                        .IsUnicode(false)
                        .HasColumnType("varchar(8)")
                        .HasColumnName("ln_line");

                    b.Property<string>("LnDesc")
                        .HasMaxLength(24)
                        .IsUnicode(false)
                        .HasColumnType("varchar(24)")
                        .HasColumnName("ln_desc");

                    b.HasKey("LnLine")
                        .HasName("PK__LN_MSTR__BDECFD606F55BBCE");

                    b.ToTable("LN_MSTR", (string)null);
                });

            modelBuilder.Entity("UtemtervBackend.Models.LndDet", b =>
                {
                    b.Property<string>("LndLine")
                        .HasMaxLength(8)
                        .IsUnicode(false)
                        .HasColumnType("varchar(8)")
                        .HasColumnName("lnd_line");

                    b.Property<int>("LndPart")
                        .HasColumnType("int")
                        .HasColumnName("lnd_part");

                    b.Property<decimal>("LndRate")
                        .HasColumnType("decimal(18, 5)")
                        .HasColumnName("lnd_rate");

                    b.HasKey("LndLine", "LndPart")
                        .HasName("PK__LND_DET__92C8E766940552F0");

                    b.HasIndex("LndPart");

                    b.ToTable("LND_DET", (string)null);
                });

            modelBuilder.Entity("UtemtervBackend.Models.PsMstr", b =>
                {
                    b.Property<int>("PsPar")
                        .HasColumnType("int")
                        .HasColumnName("ps_par");

                    b.Property<int>("PsComp")
                        .HasColumnType("int")
                        .HasColumnName("ps_comp");

                    b.Property<decimal>("PsQtyPer")
                        .HasColumnType("decimal(18, 5)")
                        .HasColumnName("ps_qty_per");

                    b.HasKey("PsPar", "PsComp")
                        .HasName("PK__PS_MSTR__E959B426488FEB91");

                    b.HasIndex("PsComp");

                    b.ToTable("PS_MSTR", (string)null);
                });

            modelBuilder.Entity("UtemtervBackend.Models.PtMstr", b =>
                {
                    b.Property<int>("PtPart")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("pt_part");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PtPart"));

                    b.Property<string>("PtDesc")
                        .IsRequired()
                        .HasMaxLength(24)
                        .IsUnicode(false)
                        .HasColumnType("varchar(24)")
                        .HasColumnName("pt_desc");

                    b.Property<decimal?>("PtQtyOh")
                        .HasColumnType("decimal(18, 5)")
                        .HasColumnName("pt_qty_oh");

                    b.Property<string>("PtUm")
                        .IsRequired()
                        .HasMaxLength(10)
                        .IsUnicode(false)
                        .HasColumnType("varchar(10)")
                        .HasColumnName("pt_um");

                    b.HasKey("PtPart")
                        .HasName("PK__PT_MSTR__1C5FB95773B10C3E");

                    b.ToTable("PT_MSTR", (string)null);
                });

            modelBuilder.Entity("UtemtervBackend.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("user_id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<DateTime>("BirthDate")
                        .HasColumnType("date")
                        .HasColumnName("birth_date");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("email");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(30)
                        .IsUnicode(false)
                        .HasColumnType("varchar(30)")
                        .HasColumnName("name");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(32)
                        .IsUnicode(false)
                        .HasColumnType("varchar(32)")
                        .HasColumnName("password");

                    b.Property<string>("Post")
                        .IsRequired()
                        .HasMaxLength(10)
                        .IsUnicode(false)
                        .HasColumnType("varchar(10)")
                        .HasColumnName("post");

                    b.HasKey("UserId")
                        .HasName("PK__USER__B9BE370FF8D2242F");

                    b.HasIndex(new[] { "Email" }, "UQ__USER__AB6E6164D56515FA")
                        .IsUnique();

                    b.ToTable("USER", (string)null);
                });

            modelBuilder.Entity("UtemtervBackend.Models.WoMstr", b =>
                {
                    b.Property<int>("WoLot")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("wo_lot");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("WoLot"));

                    b.Property<bool>("WoActivated")
                        .HasColumnType("bit")
                        .HasColumnName("wo_activated");

                    b.Property<DateTime>("WoDueDate")
                        .HasColumnType("date")
                        .HasColumnName("wo_due_date");

                    b.Property<DateTime?>("WoEndTime")
                        .HasColumnType("datetime")
                        .HasColumnName("wo_end_time");

                    b.Property<TimeSpan?>("WoEstRun")
                        .HasPrecision(0)
                        .HasColumnType("time(0)")
                        .HasColumnName("wo_est_run");

                    b.Property<string>("WoLine")
                        .HasMaxLength(8)
                        .IsUnicode(false)
                        .HasColumnType("varchar(8)")
                        .HasColumnName("wo_line");

                    b.Property<string>("WoNbr")
                        .IsRequired()
                        .HasMaxLength(18)
                        .IsUnicode(false)
                        .HasColumnType("varchar(18)")
                        .HasColumnName("wo_nbr");

                    b.Property<DateTime>("WoOrdDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime")
                        .HasColumnName("wo_ord_date")
                        .HasDefaultValueSql("(getdate())");

                    b.Property<int>("WoPart")
                        .HasColumnType("int")
                        .HasColumnName("wo_part");

                    b.Property<TimeSpan?>("WoPldDowntime")
                        .HasPrecision(0)
                        .HasColumnType("time(0)")
                        .HasColumnName("wo_pld_downtime");

                    b.Property<int>("WoQtyOrd")
                        .HasColumnType("int")
                        .HasColumnName("wo_qty_ord");

                    b.Property<DateTime?>("WoRelDate")
                        .HasColumnType("date")
                        .HasColumnName("wo_rel_date");

                    b.Property<int?>("WoSeq")
                        .HasColumnType("int")
                        .HasColumnName("wo_seq");

                    b.Property<DateTime?>("WoStartDate")
                        .HasColumnType("date")
                        .HasColumnName("wo_start_date");

                    b.Property<TimeSpan?>("WoStartTime")
                        .HasPrecision(0)
                        .HasColumnType("time(0)")
                        .HasColumnName("wo_start_time");

                    b.Property<string>("WoStatus")
                        .HasMaxLength(10)
                        .IsUnicode(false)
                        .HasColumnType("varchar(10)")
                        .HasColumnName("wo_status");

                    b.Property<TimeSpan?>("WoUnpldDowntime")
                        .HasPrecision(0)
                        .HasColumnType("time(0)")
                        .HasColumnName("wo_unpld_downtime");

                    b.Property<int?>("WoUser")
                        .HasColumnType("int")
                        .HasColumnName("wo_user");

                    b.HasKey("WoLot")
                        .HasName("PK__WO_MSTR__5FD13D21C483C18C");

                    b.HasIndex("WoLine");

                    b.HasIndex("WoPart");

                    b.HasIndex("WoUser");

                    b.ToTable("WO_MSTR", (string)null);
                });

            modelBuilder.Entity("UtemtervBackend.Models.WodDet", b =>
                {
                    b.Property<int>("WodPart")
                        .HasColumnType("int")
                        .HasColumnName("wod_part");

                    b.Property<int>("WodPar")
                        .HasColumnType("int")
                        .HasColumnName("wod_par");

                    b.Property<int>("WodLot")
                        .HasColumnType("int")
                        .HasColumnName("wod_lot");

                    b.Property<int>("WodQtyCompl")
                        .HasColumnType("int")
                        .HasColumnName("wod_qty_compl");

                    b.Property<decimal>("WodQtyReq")
                        .HasColumnType("decimal(18, 5)")
                        .HasColumnName("wod_qty_req");

                    b.Property<int>("WodQtyRjct")
                        .HasColumnType("int")
                        .HasColumnName("wod_qty_rjct");

                    b.HasKey("WodPart", "WodPar", "WodLot")
                        .HasName("PK__WOD_DET__0041D0AE4CFA5873");

                    b.HasIndex("WodLot");

                    b.HasIndex("WodPar");

                    b.ToTable("WOD_DET", (string)null);
                });

            modelBuilder.Entity("UtemtervBackend.Models.WomDet", b =>
                {
                    b.Property<int>("WomPart")
                        .HasColumnType("int")
                        .HasColumnName("wom_part");

                    b.Property<int>("WomPar")
                        .HasColumnType("int")
                        .HasColumnName("wom_par");

                    b.Property<int>("WomLot")
                        .HasColumnType("int")
                        .HasColumnName("wom_lot");

                    b.Property<int?>("WomMat")
                        .HasColumnType("int")
                        .HasColumnName("wom_mat");

                    b.Property<decimal?>("WomReq")
                        .HasColumnType("decimal(18, 5)")
                        .HasColumnName("wom_req");

                    b.Property<decimal>("WomRsrv")
                        .HasColumnType("decimal(18, 5)")
                        .HasColumnName("wom_rsrv");

                    b.HasKey("WomPart", "WomPar", "WomLot")
                        .HasName("PK__WOM_DET__65C8E8EF684C2280");

                    b.HasIndex("WomMat");

                    b.ToTable("WOM_DET", (string)null);
                });

            modelBuilder.Entity("UtemtervBackend.Models.XwoHist", b =>
                {
                    b.Property<string>("XwoYear")
                        .HasMaxLength(4)
                        .IsUnicode(false)
                        .HasColumnType("char(4)")
                        .HasColumnName("xwo_year")
                        .IsFixedLength();

                    b.Property<string>("XwoWeek")
                        .HasMaxLength(2)
                        .IsUnicode(false)
                        .HasColumnType("char(2)")
                        .HasColumnName("xwo_week")
                        .IsFixedLength();

                    b.Property<int>("XwoLot")
                        .HasColumnType("int")
                        .HasColumnName("xwo_lot");

                    b.Property<byte>("XwoVersion")
                        .HasColumnType("tinyint")
                        .HasColumnName("xwo_version");

                    b.Property<DateTime?>("XwoEndTime")
                        .HasColumnType("datetime")
                        .HasColumnName("xwo_end_time");

                    b.Property<TimeSpan?>("XwoEstRun")
                        .HasPrecision(0)
                        .HasColumnType("time(0)")
                        .HasColumnName("xwo_est_run");

                    b.Property<TimeSpan?>("XwoPldDowntime")
                        .HasPrecision(0)
                        .HasColumnType("time(0)")
                        .HasColumnName("xwo_pld_downtime");

                    b.Property<int?>("XwoSeq")
                        .HasColumnType("int")
                        .HasColumnName("xwo_seq");

                    b.Property<DateTime?>("XwoStartDate")
                        .HasColumnType("date")
                        .HasColumnName("xwo_start_date");

                    b.Property<TimeSpan?>("XwoStartTime")
                        .HasPrecision(0)
                        .HasColumnType("time(0)")
                        .HasColumnName("xwo_start_time");

                    b.Property<TimeSpan?>("XwoUnpldDowntime")
                        .HasPrecision(0)
                        .HasColumnType("time(0)")
                        .HasColumnName("xwo_unpld_downtime");

                    b.HasKey("XwoYear", "XwoWeek", "XwoLot", "XwoVersion")
                        .HasName("PK__XWO_HIST__E9FB120CC62E77CD");

                    b.HasIndex("XwoLot");

                    b.ToTable("XWO_HIST", (string)null);
                });

            modelBuilder.Entity("UtemtervBackend.Views.UserList", b =>
                {
                    b.Property<DateTime>("BirthDate")
                        .HasColumnType("date")
                        .HasColumnName("birth_date");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("email");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(30)
                        .IsUnicode(false)
                        .HasColumnType("varchar(30)")
                        .HasColumnName("name");

                    b.Property<string>("Post")
                        .IsRequired()
                        .HasMaxLength(10)
                        .IsUnicode(false)
                        .HasColumnType("varchar(10)")
                        .HasColumnName("post");

                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("user_id");

                    b.ToTable((string)null);

                    b.ToView("userList", (string)null);
                });

            modelBuilder.Entity("UtemtervBackend.Models.ChgMstr", b =>
                {
                    b.HasOne("UtemtervBackend.Models.PtMstr", "ChgFromNavigation")
                        .WithMany("ChgMstrChgFromNavigations")
                        .HasForeignKey("ChgFrom")
                        .IsRequired()
                        .HasConstraintName("FK__CHG_MSTR__chg_fr__5EBF139D");

                    b.HasOne("UtemtervBackend.Models.LnMstr", "ChgLineNavigation")
                        .WithMany("ChgMstrs")
                        .HasForeignKey("ChgLine")
                        .IsRequired()
                        .HasConstraintName("FK__CHG_MSTR__chg_li__5DCAEF64");

                    b.HasOne("UtemtervBackend.Models.PtMstr", "ChgToNavigation")
                        .WithMany("ChgMstrChgToNavigations")
                        .HasForeignKey("ChgTo")
                        .IsRequired()
                        .HasConstraintName("FK__CHG_MSTR__chg_to__5FB337D6");

                    b.Navigation("ChgFromNavigation");

                    b.Navigation("ChgLineNavigation");

                    b.Navigation("ChgToNavigation");
                });

            modelBuilder.Entity("UtemtervBackend.Models.LadDet", b =>
                {
                    b.HasOne("UtemtervBackend.Models.LdDet", "Lad")
                        .WithMany("LadDets")
                        .HasForeignKey("LadComp", "LadExpire")
                        .HasConstraintName("FK__LAD_DET__693CA210");

                    b.HasOne("UtemtervBackend.Models.WodDet", "LadNavigation")
                        .WithMany("LadDets")
                        .HasForeignKey("LadPart", "LadPar", "LadLot")
                        .HasConstraintName("FK__LAD_DET__68487DD7");

                    b.Navigation("Lad");

                    b.Navigation("LadNavigation");
                });

            modelBuilder.Entity("UtemtervBackend.Models.LdDet", b =>
                {
                    b.HasOne("UtemtervBackend.Models.PtMstr", "LdPartNavigation")
                        .WithMany("LdDets")
                        .HasForeignKey("LdPart")
                        .IsRequired()
                        .HasConstraintName("FK__LD_DET__ld_part__5AEE82B9");

                    b.Navigation("LdPartNavigation");
                });

            modelBuilder.Entity("UtemtervBackend.Models.LndDet", b =>
                {
                    b.HasOne("UtemtervBackend.Models.LnMstr", "LndLineNavigation")
                        .WithMany("LndDets")
                        .HasForeignKey("LndLine")
                        .IsRequired()
                        .HasConstraintName("FK__LND_DET__lnd_lin__5BE2A6F2");

                    b.HasOne("UtemtervBackend.Models.PtMstr", "LndPartNavigation")
                        .WithMany("LndDets")
                        .HasForeignKey("LndPart")
                        .IsRequired()
                        .HasConstraintName("FK__LND_DET__lnd_par__5CD6CB2B");

                    b.Navigation("LndLineNavigation");

                    b.Navigation("LndPartNavigation");
                });

            modelBuilder.Entity("UtemtervBackend.Models.PsMstr", b =>
                {
                    b.HasOne("UtemtervBackend.Models.PtMstr", "PsCompNavigation")
                        .WithMany("PsMstrPsCompNavigations")
                        .HasForeignKey("PsComp")
                        .IsRequired()
                        .HasConstraintName("FK__PS_MSTR__ps_comp__59FA5E80");

                    b.HasOne("UtemtervBackend.Models.PtMstr", "PsParNavigation")
                        .WithMany("PsMstrPsParNavigations")
                        .HasForeignKey("PsPar")
                        .IsRequired()
                        .HasConstraintName("FK__PS_MSTR__ps_par__59063A47");

                    b.Navigation("PsCompNavigation");

                    b.Navigation("PsParNavigation");
                });

            modelBuilder.Entity("UtemtervBackend.Models.WoMstr", b =>
                {
                    b.HasOne("UtemtervBackend.Models.LnMstr", "WoLineNavigation")
                        .WithMany("WoMstrs")
                        .HasForeignKey("WoLine")
                        .HasConstraintName("FK__WO_MSTR__wo_line__628FA481");

                    b.HasOne("UtemtervBackend.Models.PtMstr", "WoPartNavigation")
                        .WithMany("WoMstrs")
                        .HasForeignKey("WoPart")
                        .IsRequired()
                        .HasConstraintName("FK__WO_MSTR__wo_part__619B8048");

                    b.HasOne("UtemtervBackend.Models.User", "WoUserNavigation")
                        .WithMany("WoMstrs")
                        .HasForeignKey("WoUser")
                        .HasConstraintName("FK__WO_MSTR__wo_user__60A75C0F");

                    b.Navigation("WoLineNavigation");

                    b.Navigation("WoPartNavigation");

                    b.Navigation("WoUserNavigation");
                });

            modelBuilder.Entity("UtemtervBackend.Models.WodDet", b =>
                {
                    b.HasOne("UtemtervBackend.Models.WoMstr", "WodLotNavigation")
                        .WithMany("WodDets")
                        .HasForeignKey("WodLot")
                        .IsRequired()
                        .HasConstraintName("FK__WOD_DET__wod_lot__656C112C");

                    b.HasOne("UtemtervBackend.Models.PtMstr", "WodParNavigation")
                        .WithMany("WodDetWodParNavigations")
                        .HasForeignKey("WodPar")
                        .IsRequired()
                        .HasConstraintName("FK__WOD_DET__wod_par__6477ECF3");

                    b.HasOne("UtemtervBackend.Models.PtMstr", "WodPartNavigation")
                        .WithMany("WodDetWodPartNavigations")
                        .HasForeignKey("WodPart")
                        .IsRequired()
                        .HasConstraintName("FK__WOD_DET__wod_par__6383C8BA");

                    b.Navigation("WodLotNavigation");

                    b.Navigation("WodParNavigation");

                    b.Navigation("WodPartNavigation");
                });

            modelBuilder.Entity("UtemtervBackend.Models.WomDet", b =>
                {
                    b.HasOne("UtemtervBackend.Models.PtMstr", "WomMatNavigation")
                        .WithMany("WomDets")
                        .HasForeignKey("WomMat")
                        .HasConstraintName("FK__WOM_DET__wom_mat__6754599E");

                    b.HasOne("UtemtervBackend.Models.WodDet", "Wom")
                        .WithOne("WomDet")
                        .HasForeignKey("UtemtervBackend.Models.WomDet", "WomPart", "WomPar", "WomLot")
                        .IsRequired()
                        .HasConstraintName("FK__WOM_DET__66603565");

                    b.Navigation("Wom");

                    b.Navigation("WomMatNavigation");
                });

            modelBuilder.Entity("UtemtervBackend.Models.XwoHist", b =>
                {
                    b.HasOne("UtemtervBackend.Models.WoMstr", "XwoLotNavigation")
                        .WithMany("XwoHists")
                        .HasForeignKey("XwoLot")
                        .IsRequired()
                        .HasConstraintName("FK__XWO_HIST__xwo_lo__6A30C649");

                    b.Navigation("XwoLotNavigation");
                });

            modelBuilder.Entity("UtemtervBackend.Models.LdDet", b =>
                {
                    b.Navigation("LadDets");
                });

            modelBuilder.Entity("UtemtervBackend.Models.LnMstr", b =>
                {
                    b.Navigation("ChgMstrs");

                    b.Navigation("LndDets");

                    b.Navigation("WoMstrs");
                });

            modelBuilder.Entity("UtemtervBackend.Models.PtMstr", b =>
                {
                    b.Navigation("ChgMstrChgFromNavigations");

                    b.Navigation("ChgMstrChgToNavigations");

                    b.Navigation("LdDets");

                    b.Navigation("LndDets");

                    b.Navigation("PsMstrPsCompNavigations");

                    b.Navigation("PsMstrPsParNavigations");

                    b.Navigation("WoMstrs");

                    b.Navigation("WodDetWodParNavigations");

                    b.Navigation("WodDetWodPartNavigations");

                    b.Navigation("WomDets");
                });

            modelBuilder.Entity("UtemtervBackend.Models.User", b =>
                {
                    b.Navigation("WoMstrs");
                });

            modelBuilder.Entity("UtemtervBackend.Models.WoMstr", b =>
                {
                    b.Navigation("WodDets");

                    b.Navigation("XwoHists");
                });

            modelBuilder.Entity("UtemtervBackend.Models.WodDet", b =>
                {
                    b.Navigation("LadDets");

                    b.Navigation("WomDet");
                });
#pragma warning restore 612, 618
        }
    }
}

using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using UtemtervBackend.Views;

namespace UtemtervBackend.Models;

public partial class UtemtervContext : DbContext
{
    public UtemtervContext()
    {
    }

    public UtemtervContext(DbContextOptions<UtemtervContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ChgMstr> ChgMstrs { get; set; }

    public virtual DbSet<Dictionary> Dictionaries { get; set; }

    public virtual DbSet<LadDet> LadDets { get; set; }

    public virtual DbSet<LdDet> LdDets { get; set; }

    public virtual DbSet<LnMstr> LnMstrs { get; set; }

    public virtual DbSet<LndDet> LndDets { get; set; }

    public virtual DbSet<PsMstr> PsMstrs { get; set; }

    public virtual DbSet<PtMstr> PtMstrs { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<WoMstr> WoMstrs { get; set; }

    public virtual DbSet<WodDet> WodDets { get; set; }

    public virtual DbSet<WomDet> WomDets { get; set; }

    public virtual DbSet<XwoHist> XwoHists { get; set; }

    public virtual DbSet<LdList> LdLists { get; set; }

    public virtual DbSet<VwWod> VwWods { get; set; }

    public virtual DbSet<HetiUtemterv> HetiUtemtervs { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=localhost;Initial Catalog=Utemterv;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ChgMstr>(entity =>
        {
            entity.HasKey(e => new { e.ChgLine, e.ChgFrom, e.ChgTo }).HasName("PK__CHG_MSTR__5E79CE4520D3D4E5");

            entity.ToTable("CHG_MSTR");

            entity.Property(e => e.ChgLine)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("chg_line");
            entity.Property(e => e.ChgFrom).HasColumnName("chg_from");
            entity.Property(e => e.ChgTo).HasColumnName("chg_to");
            entity.Property(e => e.ChgTime)
                .HasPrecision(0)
                .HasColumnName("chg_time");

            entity.HasOne(d => d.ChgFromNavigation).WithMany(p => p.ChgMstrChgFromNavigations)
                .HasForeignKey(d => d.ChgFrom)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CHG_MSTR__chg_fr__5EBF139D");

            entity.HasOne(d => d.ChgLineNavigation).WithMany(p => p.ChgMstrs)
                .HasForeignKey(d => d.ChgLine)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CHG_MSTR__chg_li__5DCAEF64");

            entity.HasOne(d => d.ChgToNavigation).WithMany(p => p.ChgMstrChgToNavigations)
                .HasForeignKey(d => d.ChgTo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CHG_MSTR__chg_to__5FB337D6");
        });

        modelBuilder.Entity<Dictionary>(entity =>
        {
            entity.HasKey(e => new { e.Value, e.Type }).HasName("PK__DICTIONA__CE846F1FFCA6B506");

            entity.ToTable("DICTIONARY");

            entity.Property(e => e.Value)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("value");
            entity.Property(e => e.Type)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("type");
            entity.Property(e => e.Desc)
                .HasMaxLength(40)
                .IsUnicode(false)
                .HasColumnName("desc");
        });

        modelBuilder.Entity<LadDet>(entity =>
        {
            entity.HasKey(e => e.LadId).HasName("PK__LAD_DET__24E37365A97F565C");

            entity.ToTable("LAD_DET", tb =>
            {
                tb.HasTrigger("Lad_reserve");
                tb.HasTrigger("lad_update");
            });

            entity.Property(e => e.LadId).HasColumnName("lad_id");
            entity.Property(e => e.LadComp).HasColumnName("lad_comp");
            entity.Property(e => e.LadExpire)
                .HasColumnType("date")
                .HasColumnName("lad_expire");
            entity.Property(e => e.LadLot).HasColumnName("lad_lot");
            entity.Property(e => e.LadPar).HasColumnName("lad_par");
            entity.Property(e => e.LadPart).HasColumnName("lad_part");
            entity.Property(e => e.LadQtyRsrv)
                .HasColumnType("decimal(18, 5)")
                .HasColumnName("lad_qty_rsrv");
            entity.Property(e => e.LadQtyUsed)
                .HasColumnType("decimal(18, 5)")
                .HasColumnName("lad_qty_used");

            entity.HasOne(d => d.Lad).WithMany(p => p.LadDets)
                .HasForeignKey(d => new { d.LadComp, d.LadExpire })
                .HasConstraintName("FK__LAD_DET__5812160E");

            entity.HasOne(d => d.LadNavigation).WithMany(p => p.LadDets)
                .HasForeignKey(d => new { d.LadPart, d.LadPar, d.LadLot, d.LadComp })
                .HasConstraintName("FK__LAD_DET__571DF1D5");
        });

        modelBuilder.Entity<LdDet>(entity =>
        {
            entity.HasKey(e => new { e.LdPart, e.LdExpire }).HasName("PK__LD_DET__DA7953388426B81A");

            entity.ToTable("LD_DET", tb =>
            {
                tb.HasTrigger("ldDetInsert");
                tb.HasTrigger("torleskorPtUpdate");
                tb.HasTrigger("updatedLd");
            });

            entity.Property(e => e.LdPart).HasColumnName("ld_part");
            entity.Property(e => e.LdExpire)
                .HasColumnType("date")
                .HasColumnName("ld_expire");
            entity.Property(e => e.LdQtyOh)
                .HasColumnType("decimal(18, 5)")
                .HasColumnName("ld_qty_oh");
            entity.Property(e => e.LdQtyRsrv)
                .HasColumnType("decimal(18, 5)")
                .HasColumnName("ld_qty_rsrv");
            entity.Property(e => e.LdQtyScrp)
                .HasColumnType("decimal(18, 5)")
                .HasColumnName("ld_qty_scrp");

            entity.HasOne(d => d.LdPartNavigation).WithMany(p => p.LdDets)
                .HasForeignKey(d => d.LdPart)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__LD_DET__ld_part__59063A47");
        });

        modelBuilder.Entity<LnMstr>(entity =>
        {
            entity.HasKey(e => e.LnLine).HasName("PK__LN_MSTR__BDECFD606F55BBCE");

            entity.ToTable("LN_MSTR");

            entity.Property(e => e.LnLine)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("ln_line");
            entity.Property(e => e.LnDesc)
                .HasMaxLength(24)
                .IsUnicode(false)
                .HasColumnName("ln_desc");
        });

        modelBuilder.Entity<LndDet>(entity =>
        {
            entity.HasKey(e => new { e.LndLine, e.LndPart }).HasName("PK__LND_DET__92C8E766940552F0");

            entity.ToTable("LND_DET");

            entity.Property(e => e.LndLine)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("lnd_line");
            entity.Property(e => e.LndPart).HasColumnName("lnd_part");
            entity.Property(e => e.LndRate)
                .HasColumnType("decimal(18, 5)")
                .HasColumnName("lnd_rate");

            entity.HasOne(d => d.LndLineNavigation).WithMany(p => p.LndDets)
                .HasForeignKey(d => d.LndLine)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__LND_DET__lnd_lin__5BE2A6F2");

            entity.HasOne(d => d.LndPartNavigation).WithMany(p => p.LndDets)
                .HasForeignKey(d => d.LndPart)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__LND_DET__lnd_par__5CD6CB2B");
        });

        modelBuilder.Entity<PsMstr>(entity =>
        {
            entity.HasKey(e => new { e.PsPar, e.PsComp }).HasName("PK__PS_MSTR__E959B426488FEB91");

            entity.ToTable("PS_MSTR");

            entity.Property(e => e.PsPar).HasColumnName("ps_par");
            entity.Property(e => e.PsComp).HasColumnName("ps_comp");
            entity.Property(e => e.PsQtyPer)
                .HasColumnType("decimal(18, 5)")
                .HasColumnName("ps_qty_per");

            entity.HasOne(d => d.PsCompNavigation).WithMany(p => p.PsMstrPsCompNavigations)
                .HasForeignKey(d => d.PsComp)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__PS_MSTR__ps_comp__59FA5E80");

            entity.HasOne(d => d.PsParNavigation).WithMany(p => p.PsMstrPsParNavigations)
                .HasForeignKey(d => d.PsPar)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__PS_MSTR__ps_par__59063A47");
        });

        modelBuilder.Entity<PtMstr>(entity =>
        {
            entity.HasKey(e => e.PtPart).HasName("PK__PT_MSTR__1C5FB95773B10C3E");

            entity.ToTable("PT_MSTR");

            entity.Property(e => e.PtPart).HasColumnName("pt_part");
            entity.Property(e => e.PtDesc)
                .HasMaxLength(24)
                .IsUnicode(false)
                .HasColumnName("pt_desc");
            entity.Property(e => e.PtQtyOh)
                .HasColumnType("decimal(18, 5)")
                .HasColumnName("pt_qty_oh");
            entity.Property(e => e.PtUm)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("pt_um");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__USER__B9BE370FF8D2242F");

            entity.ToTable("USER");

            entity.HasIndex(e => e.Email, "UQ__USER__AB6E6164D56515FA").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.BirthDate)
                .HasColumnType("date")
                .HasColumnName("birth_date");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Name)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(32)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.Post)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("post");
        });

        modelBuilder.Entity<WoMstr>(entity =>
        {
            entity.HasKey(e => e.WoLot).HasName("PK__WO_MSTR__5FD13D21F5F5BCBB");

            entity.ToTable("WO_MSTR", tb => tb.HasTrigger("UpdateStatus"));

            entity.Property(e => e.WoLot).HasColumnName("wo_lot");
            entity.Property(e => e.WoActivated).HasColumnName("wo_activated");
            entity.Property(e => e.WoDueDate)
                .HasColumnType("date")
                .HasColumnName("wo_due_date");
            entity.Property(e => e.WoEndTime)
                .HasColumnType("datetime")
                .HasColumnName("wo_end_time");
            entity.Property(e => e.WoEstRun)
                .HasComputedColumnSql("(CONVERT([time],CONVERT([varchar],dateadd(second,([wo_qty_ord]/[dbo].[orankentiEgyseg]([wo_part],[wo_line]))*(3600),(0)),(108))))", false)
                .HasColumnName("wo_est_run");
            entity.Property(e => e.WoLine)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("wo_line");
            entity.Property(e => e.WoNbr)
                .HasMaxLength(18)
                .IsUnicode(false)
                .HasColumnName("wo_nbr");
            entity.Property(e => e.WoOrdDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("wo_ord_date");
            entity.Property(e => e.WoPart).HasColumnName("wo_part");
            entity.Property(e => e.WoPldDowntime)
                .HasPrecision(0)
                .HasColumnName("wo_pld_downtime");
            entity.Property(e => e.WoQtyOrd).HasColumnName("wo_qty_ord");
            entity.Property(e => e.WoRelDate)
                .HasColumnType("date")
                .HasColumnName("wo_rel_date");
            entity.Property(e => e.WoSeq).HasColumnName("wo_seq");
            entity.Property(e => e.WoStartDate)
                .HasColumnType("date")
                .HasColumnName("wo_start_date");
            entity.Property(e => e.WoStartTime)
                .HasColumnType("datetime")
                .HasColumnName("wo_start_time");
            entity.Property(e => e.WoStatus)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("wo_status");
            entity.Property(e => e.WoUnpldDowntime)
                .HasPrecision(0)
                .HasColumnName("wo_unpld_downtime");
            entity.Property(e => e.WoUser).HasColumnName("wo_user");

            entity.HasOne(d => d.WoLineNavigation).WithMany(p => p.WoMstrs)
                .HasForeignKey(d => d.WoLine)
                .HasConstraintName("FK__WO_MSTR__wo_line__5DCAEF64");

            entity.HasOne(d => d.WoPartNavigation).WithMany(p => p.WoMstrs)
                .HasForeignKey(d => d.WoPart)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__WO_MSTR__wo_part__5EBF139D");

            entity.HasOne(d => d.WoUserNavigation).WithMany(p => p.WoMstrs)
                .HasForeignKey(d => d.WoUser)
                .HasConstraintName("FK__WO_MSTR__wo_user__5FB337D6");
        });

        modelBuilder.Entity<WodDet>(entity =>
        {
            entity.HasKey(e => new { e.WodPart, e.WodPar, e.WodLot }).HasName("PK__WOD_DET__0041D0AEB650DC6D");

            entity.ToTable("WOD_DET");

            entity.Property(e => e.WodPart).HasColumnName("wod_part");
            entity.Property(e => e.WodPar).HasColumnName("wod_par");
            entity.Property(e => e.WodLot).HasColumnName("wod_lot");
            entity.Property(e => e.WodQtyCompl).HasColumnName("wod_qty_compl");
            entity.Property(e => e.WodQtyReq)
                .HasColumnType("decimal(18, 5)")
                .HasColumnName("wod_qty_req");
            entity.Property(e => e.WodQtyRjct).HasColumnName("wod_qty_rjct");

            entity.HasOne(d => d.WodLotNavigation).WithMany(p => p.WodDets)
                .HasForeignKey(d => d.WodLot)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__WOD_DET__wod_lot__60A75C0F");

            entity.HasOne(d => d.WodParNavigation).WithMany(p => p.WodDetWodParNavigations)
                .HasForeignKey(d => d.WodPar)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__WOD_DET__wod_par__628FA481");

            entity.HasOne(d => d.WodPartNavigation).WithMany(p => p.WodDetWodPartNavigations)
                .HasForeignKey(d => d.WodPart)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__WOD_DET__wod_par__619B8048");
        });

        modelBuilder.Entity<WomDet>(entity =>
        {
            entity.HasKey(e => new { e.WomPart, e.WomPar, e.WomLot, e.WomMat }).HasName("PK__WOM_DET__B98536D6C4588D08");

            entity.ToTable("WOM_DET", tb => tb.HasTrigger("Wom_pt_qty_oh"));

            entity.Property(e => e.WomPart).HasColumnName("wom_part");
            entity.Property(e => e.WomPar).HasColumnName("wom_par");
            entity.Property(e => e.WomLot).HasColumnName("wom_lot");
            entity.Property(e => e.WomMat).HasColumnName("wom_mat");
            entity.Property(e => e.WomReq)
                .HasColumnType("decimal(18, 5)")
                .HasColumnName("wom_req");
            entity.Property(e => e.WomRsrv)
                .HasColumnType("decimal(18, 5)")
                .HasColumnName("wom_rsrv");

            entity.HasOne(d => d.Wom).WithMany(p => p.WomDets)
                .HasForeignKey(d => new { d.WomPart, d.WomMat })
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__WOM_DET__6383C8BA");

            entity.HasOne(d => d.WomNavigation).WithMany(p => p.WomDets)
                .HasForeignKey(d => new { d.WomPart, d.WomPar, d.WomLot })
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__WOM_DET__6477ECF3");
        });

        modelBuilder.Entity<XwoHist>(entity =>
        {
            entity.HasKey(e => new { e.XwoYear, e.XwoWeek, e.XwoLot, e.XwoVersion }).HasName("PK__XWO_HIST__E9FB120CC62E77CD");

            entity.ToTable("XWO_HIST");

            entity.Property(e => e.XwoYear)
                .HasMaxLength(4)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("xwo_year");
            entity.Property(e => e.XwoWeek)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("xwo_week");
            entity.Property(e => e.XwoLot).HasColumnName("xwo_lot");
            entity.Property(e => e.XwoVersion).HasColumnName("xwo_version");
            entity.Property(e => e.XwoEndTime)
                .HasColumnType("datetime")
                .HasColumnName("xwo_end_time");
            entity.Property(e => e.XwoEstRun)
                .HasPrecision(0)
                .HasColumnName("xwo_est_run");
            entity.Property(e => e.XwoPldDowntime)
                .HasPrecision(0)
                .HasColumnName("xwo_pld_downtime");
            entity.Property(e => e.XwoSeq).HasColumnName("xwo_seq");
            entity.Property(e => e.XwoStartDate)
                .HasColumnType("date")
                .HasColumnName("xwo_start_date");
            entity.Property(e => e.XwoStartTime)
                .HasPrecision(0)
                .HasColumnName("xwo_start_time");
            entity.Property(e => e.XwoUnpldDowntime)
                .HasPrecision(0)
                .HasColumnName("xwo_unpld_downtime");

            entity.HasOne(d => d.XwoLotNavigation).WithMany(p => p.XwoHists)
                .HasForeignKey(d => d.XwoLot)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__XWO_HIST__xwo_lo__6A30C649");
        });
        //modelBuilder.Entity<UserList>(entity =>
        //{
        //    entity
        //        .HasNoKey()
        //        .ToView("userList");

        //    entity.Property(e => e.BirthDate)
        //        .HasColumnType("date")
        //        .HasColumnName("birth_date");
        //    entity.Property(e => e.Email)
        //        .HasMaxLength(50)
        //        .IsUnicode(false)
        //        .HasColumnName("email");
        //    entity.Property(e => e.Name)
        //        .HasMaxLength(30)
        //        .IsUnicode(false)
        //        .HasColumnName("name");
        //    entity.Property(e => e.Post)
        //        .HasMaxLength(10)
        //        .IsUnicode(false)
        //        .HasColumnName("post");
        //    entity.Property(e => e.UserId)
        //        .ValueGeneratedOnAdd()
        //        .HasColumnName("user_id");
        //});
        modelBuilder.Entity<LdList>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("ldList");


            entity.Property(e => e.LdExpire)
                .HasColumnType("date")
                .HasColumnName("ld_expire");
            entity.Property(e => e.LdPart).HasColumnName("ld_part");
            entity.Property(e => e.LdQtyOh)
                .HasColumnType("decimal(18, 5)")
                .HasColumnName("ld_qty_oh");
            entity.Property(e => e.LdQtyRsrv)
                .HasColumnType("decimal(18, 5)")
                .HasColumnName("ld_qty_rsrv");
            entity.Property(e => e.LdQtyScrp)
                .HasColumnType("decimal(18, 5)")
                .HasColumnName("ld_qty_scrp");
        });

        modelBuilder.Entity<VwWod>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vw_Wod");

            entity.Property(e => e.Lot).HasColumnName("lot");
            entity.Property(e => e.Parent).HasColumnName("parent");
            entity.Property(e => e.ParentName)
                .HasMaxLength(24)
                .IsUnicode(false)
                .HasColumnName("parent_name");
            entity.Property(e => e.Part).HasColumnName("part");
            entity.Property(e => e.PartName)
                .HasMaxLength(24)
                .IsUnicode(false)
                .HasColumnName("part_name");
            entity.Property(e => e.PartUm)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("part_um");
            entity.Property(e => e.QtyCompl).HasColumnName("qty_compl");
            entity.Property(e => e.QtyReq)
                .HasColumnType("decimal(18, 5)")
                .HasColumnName("qty_req");
            entity.Property(e => e.QtyRjct).HasColumnName("qty_rjct");
        });

        modelBuilder.Entity<HetiUtemterv>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("hetiUtemterv");

            entity.Property(e => e.Egys)
                .HasColumnType("decimal(18, 5)")
                .HasColumnName("egys");
            entity.Property(e => e.EstRun).HasColumnName("est_run");
            entity.Property(e => e.LnDesc)
                .HasMaxLength(24)
                .IsUnicode(false)
                .HasColumnName("ln_desc");
            entity.Property(e => e.PtDesc)
                .HasMaxLength(24)
                .IsUnicode(false)
                .HasColumnName("pt_desc");
            entity.Property(e => e.PtUm)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("pt_um");
            entity.Property(e => e.WoEndTime).HasColumnName("wo_end_time");
            entity.Property(e => e.WoLine)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("wo_line");
            entity.Property(e => e.WoLot).HasColumnName("wo_lot");
            entity.Property(e => e.WoNbr)
                .HasMaxLength(18)
                .IsUnicode(false)
                .HasColumnName("wo_nbr");
            entity.Property(e => e.WoPart).HasColumnName("wo_part");
            entity.Property(e => e.WoPldDowntime)
                .HasPrecision(0)
                .HasColumnName("wo_pld_downtime");
            entity.Property(e => e.WoQtyOrd).HasColumnName("wo_qty_ord");
            entity.Property(e => e.WoRelDate)
                .HasColumnType("date")
                .HasColumnName("wo_rel_date");
            entity.Property(e => e.WoSeq).HasColumnName("wo_seq");
            entity.Property(e => e.WoStartDate)
                .HasColumnType("date")
                .HasColumnName("wo_start_date");
            entity.Property(e => e.WoStartTime)
                .HasPrecision(0)
                .HasColumnName("wo_start_time");
            entity.Property(e => e.WoUnpldDowntime)
                .HasPrecision(0)
                .HasColumnName("wo_unpld_downtime");
        });


        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

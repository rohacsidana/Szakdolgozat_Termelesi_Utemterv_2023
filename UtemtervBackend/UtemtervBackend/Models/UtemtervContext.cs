using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

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

    public virtual DbSet<Ptp> Ptps { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<WoMstr> WoMstrs { get; set; }

    public virtual DbSet<WodDet> WodDets { get; set; }

    public virtual DbSet<WomDet> WomDets { get; set; }

    public virtual DbSet<XwoHist> XwoHists { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=localhost;Initial Catalog=Utemterv;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ChgMstr>(entity =>
        {
            entity.HasKey(e => new { e.ChgLine, e.ChgFrom, e.ChgTo }).HasName("PK__CHG_MSTR__5E79CE4529A86F9F");

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
                .HasConstraintName("FK__CHG_MSTR__chg_fr__5CD6CB2B");

            entity.HasOne(d => d.ChgLineNavigation).WithMany(p => p.ChgMstrs)
                .HasForeignKey(d => d.ChgLine)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CHG_MSTR__chg_li__5BE2A6F2");

            entity.HasOne(d => d.ChgToNavigation).WithMany(p => p.ChgMstrChgToNavigations)
                .HasForeignKey(d => d.ChgTo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CHG_MSTR__chg_to__5DCAEF64");
        });

        modelBuilder.Entity<Dictionary>(entity =>
        {
            entity.HasKey(e => new { e.Value, e.Type }).HasName("PK__DICTIONA__CE846F1F90203AD7");

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
            entity.HasKey(e => e.LadId).HasName("PK__LAD_DET__24E373656DDED893");

            entity.ToTable("LAD_DET");

            entity.Property(e => e.LadId).HasColumnName("lad_id");
            entity.Property(e => e.LadComp).HasColumnName("lad_comp");
            entity.Property(e => e.LadExpire)
                .HasColumnType("date")
                .HasColumnName("lad_expire");
            entity.Property(e => e.LadLot).HasColumnName("lad_lot");
            entity.Property(e => e.LadPar).HasColumnName("lad_par");
            entity.Property(e => e.LadPart).HasColumnName("lad_part");
            entity.Property(e => e.LadQtyRsrv)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("lad_qty_rsrv");

            entity.HasOne(d => d.Lad).WithMany(p => p.LadDets)
                .HasForeignKey(d => new { d.LadComp, d.LadExpire })
                .HasConstraintName("FK__LAD_DET__6754599E");

            entity.HasOne(d => d.LadNavigation).WithMany(p => p.LadDets)
                .HasForeignKey(d => new { d.LadPart, d.LadPar, d.LadLot })
                .HasConstraintName("FK__LAD_DET__66603565");
        });

        modelBuilder.Entity<LdDet>(entity =>
        {
            entity.HasKey(e => new { e.LdPart, e.LdExpire }).HasName("PK__LD_DET__DA795338B02347BD");

            entity.ToTable("LD_DET");

            entity.Property(e => e.LdPart).HasColumnName("ld_part");
            entity.Property(e => e.LdExpire)
                .HasColumnType("date")
                .HasColumnName("ld_expire");
            entity.Property(e => e.LdQtyOh)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("ld_qty_oh");
            entity.Property(e => e.LdQtyRsrv)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("ld_qty_rsrv");
            entity.Property(e => e.LdQtyScrp)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("ld_qty_scrp");

            entity.HasOne(d => d.LdPartNavigation).WithMany(p => p.LdDets)
                .HasForeignKey(d => d.LdPart)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__LD_DET__ld_part__59063A47");
        });

        modelBuilder.Entity<LnMstr>(entity =>
        {
            entity.HasKey(e => e.LnLine).HasName("PK__LN_MSTR__BDECFD603202DBB7");

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
            entity.HasKey(e => new { e.LndLine, e.LndPart }).HasName("PK__LND_DET__92C8E766D2F586B9");

            entity.ToTable("LND_DET");

            entity.Property(e => e.LndLine)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("lnd_line");
            entity.Property(e => e.LndPart).HasColumnName("lnd_part");
            entity.Property(e => e.LndRate)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("lnd_rate");

            entity.HasOne(d => d.LndLineNavigation).WithMany(p => p.LndDets)
                .HasForeignKey(d => d.LndLine)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__LND_DET__lnd_lin__59FA5E80");

            entity.HasOne(d => d.LndPartNavigation).WithMany(p => p.LndDets)
                .HasForeignKey(d => d.LndPart)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__LND_DET__lnd_par__5AEE82B9");
        });

        modelBuilder.Entity<PsMstr>(entity =>
        {
            entity.HasKey(e => new { e.PsPar, e.PsComp }).HasName("PK__PS_MSTR__E959B4269D592C04");

            entity.ToTable("PS_MSTR");

            entity.Property(e => e.PsPar).HasColumnName("ps_par");
            entity.Property(e => e.PsComp).HasColumnName("ps_comp");
            entity.Property(e => e.PsQtyPer)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("ps_qty_per");

            entity.HasOne(d => d.PsCompNavigation).WithMany(p => p.PsMstrPsCompNavigations)
                .HasForeignKey(d => d.PsComp)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__PS_MSTR__ps_comp__5812160E");

            entity.HasOne(d => d.PsParNavigation).WithMany(p => p.PsMstrPsParNavigations)
                .HasForeignKey(d => d.PsPar)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__PS_MSTR__ps_par__571DF1D5");
        });

        modelBuilder.Entity<PtMstr>(entity =>
        {
            entity.HasKey(e => e.PtPart).HasName("PK__PT_MSTR__1C5FB9577F4DDAF6");

            entity.ToTable("PT_MSTR");

            entity.Property(e => e.PtPart).HasColumnName("pt_part");
            entity.Property(e => e.PtDesc)
                .HasMaxLength(24)
                .IsUnicode(false)
                .HasColumnName("pt_desc");
            entity.Property(e => e.PtUm)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("pt_um");
        });

        modelBuilder.Entity<Ptp>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("ptps");

            entity.Property(e => e.Child).HasColumnName("child");
            entity.Property(e => e.ChildDesc)
                .HasMaxLength(24)
                .IsUnicode(false)
                .HasColumnName("child_desc");
            entity.Property(e => e.ChildPerPar)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("child_per_par");
            entity.Property(e => e.ChildUm)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("child_um");
            entity.Property(e => e.Parent).HasColumnName("parent");
            entity.Property(e => e.ParentDesc)
                .HasMaxLength(24)
                .IsUnicode(false)
                .HasColumnName("parent_desc");
            entity.Property(e => e.ParentUm)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("parent_um");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__USER__B9BE370F46E32FF5");

            entity.ToTable("USER");

            entity.HasIndex(e => e.Email, "UQ__USER__AB6E6164755F7CBC").IsUnique();

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
            entity.HasKey(e => e.WoLot).HasName("PK__WO_MSTR__5FD13D218711DB1A");

            entity.ToTable("WO_MSTR");

            entity.Property(e => e.WoLot).HasColumnName("wo_lot");
            entity.Property(e => e.WoActivated).HasColumnName("wo_activated");
            entity.Property(e => e.WoDueDate)
                .HasColumnType("date")
                .HasColumnName("wo_due_date");
            entity.Property(e => e.WoEndTime)
                .HasColumnType("datetime")
                .HasColumnName("wo_end_time");
            entity.Property(e => e.WoEstRun)
                .HasPrecision(0)
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
                .HasPrecision(0)
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
                .HasConstraintName("FK__WO_MSTR__wo_line__60A75C0F");

            entity.HasOne(d => d.WoPartNavigation).WithMany(p => p.WoMstrs)
                .HasForeignKey(d => d.WoPart)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__WO_MSTR__wo_part__5FB337D6");

            entity.HasOne(d => d.WoUserNavigation).WithMany(p => p.WoMstrs)
                .HasForeignKey(d => d.WoUser)
                .HasConstraintName("FK__WO_MSTR__wo_user__5EBF139D");
        });

        modelBuilder.Entity<WodDet>(entity =>
        {
            entity.HasKey(e => new { e.WodPart, e.WodPar, e.WodLot }).HasName("PK__WOD_DET__0041D0AE2029F755");

            entity.ToTable("WOD_DET");

            entity.Property(e => e.WodPart).HasColumnName("wod_part");
            entity.Property(e => e.WodPar).HasColumnName("wod_par");
            entity.Property(e => e.WodLot).HasColumnName("wod_lot");
            entity.Property(e => e.WodQtyCompl).HasColumnName("wod_qty_compl");
            entity.Property(e => e.WodQtyReq)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("wod_qty_req");
            entity.Property(e => e.WodQtyRjct).HasColumnName("wod_qty_rjct");

            entity.HasOne(d => d.WodLotNavigation).WithMany(p => p.WodDets)
                .HasForeignKey(d => d.WodLot)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__WOD_DET__wod_lot__6383C8BA");

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
            entity.HasKey(e => new { e.WomPart, e.WomPar, e.WomLot }).HasName("PK__WOM_DET__65C8E8EFAEC6C7A1");

            entity.ToTable("WOM_DET");

            entity.Property(e => e.WomPart).HasColumnName("wom_part");
            entity.Property(e => e.WomPar).HasColumnName("wom_par");
            entity.Property(e => e.WomLot).HasColumnName("wom_lot");
            entity.Property(e => e.WomMat).HasColumnName("wom_mat");
            entity.Property(e => e.WomReq)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("wom_req");
            entity.Property(e => e.WomRsrv)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("wom_rsrv");

            entity.HasOne(d => d.WomMatNavigation).WithMany(p => p.WomDets)
                .HasForeignKey(d => d.WomMat)
                .HasConstraintName("FK__WOM_DET__wom_mat__656C112C");

            entity.HasOne(d => d.Wom).WithOne(p => p.WomDet)
                .HasForeignKey<WomDet>(d => new { d.WomPart, d.WomPar, d.WomLot })
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__WOM_DET__6477ECF3");
        });

        modelBuilder.Entity<XwoHist>(entity =>
        {
            entity.HasKey(e => new { e.XwoYear, e.XwoWeek, e.XwoLot, e.XwoVersion }).HasName("PK__XWO_HIST__E9FB120CE5BBD787");

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
                .HasConstraintName("FK__XWO_HIST__xwo_lo__68487DD7");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UtemtervBackend.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DICTIONARY",
                columns: table => new
                {
                    value = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    type = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    desc = table.Column<string>(type: "varchar(40)", unicode: false, maxLength: 40, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__DICTIONA__CE846F1F45FBD884", x => new { x.value, x.type });
                });

            migrationBuilder.CreateTable(
                name: "LN_MSTR",
                columns: table => new
                {
                    lnline = table.Column<string>(name: "ln_line", type: "varchar(8)", unicode: false, maxLength: 8, nullable: false),
                    lndesc = table.Column<string>(name: "ln_desc", type: "varchar(24)", unicode: false, maxLength: 24, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__LN_MSTR__BDECFD60AD33DB48", x => x.lnline);
                });

            migrationBuilder.CreateTable(
                name: "PT_MSTR",
                columns: table => new
                {
                    ptpart = table.Column<int>(name: "pt_part", type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ptdesc = table.Column<string>(name: "pt_desc", type: "varchar(24)", unicode: false, maxLength: 24, nullable: false),
                    ptum = table.Column<string>(name: "pt_um", type: "varchar(10)", unicode: false, maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__PT_MSTR__1C5FB9576953044A", x => x.ptpart);
                });

            migrationBuilder.CreateTable(
                name: "USER",
                columns: table => new
                {
                    userid = table.Column<int>(name: "user_id", type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: false),
                    birthdate = table.Column<DateTime>(name: "birth_date", type: "date", nullable: false),
                    email = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    password = table.Column<string>(type: "varchar(32)", unicode: false, maxLength: 32, nullable: false),
                    post = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__USER__B9BE370FE4AFCA94", x => x.userid);
                });

            migrationBuilder.CreateTable(
                name: "CHG_MSTR",
                columns: table => new
                {
                    chgline = table.Column<string>(name: "chg_line", type: "varchar(8)", unicode: false, maxLength: 8, nullable: false),
                    chgfrom = table.Column<int>(name: "chg_from", type: "int", nullable: false),
                    chgto = table.Column<int>(name: "chg_to", type: "int", nullable: false),
                    chgtime = table.Column<TimeSpan>(name: "chg_time", type: "time(0)", precision: 0, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__CHG_MSTR__5E79CE45F128E237", x => new { x.chgline, x.chgfrom, x.chgto });
                    table.ForeignKey(
                        name: "FK__CHG_MSTR__chg_fr__5CD6CB2B",
                        column: x => x.chgfrom,
                        principalTable: "PT_MSTR",
                        principalColumn: "pt_part");
                    table.ForeignKey(
                        name: "FK__CHG_MSTR__chg_li__5BE2A6F2",
                        column: x => x.chgline,
                        principalTable: "LN_MSTR",
                        principalColumn: "ln_line");
                    table.ForeignKey(
                        name: "FK__CHG_MSTR__chg_to__5DCAEF64",
                        column: x => x.chgto,
                        principalTable: "PT_MSTR",
                        principalColumn: "pt_part");
                });

            migrationBuilder.CreateTable(
                name: "LD_DET",
                columns: table => new
                {
                    ldpart = table.Column<int>(name: "ld_part", type: "int", nullable: false),
                    ldexpire = table.Column<DateTime>(name: "ld_expire", type: "date", nullable: false),
                    ldqtyoh = table.Column<decimal>(name: "ld_qty_oh", type: "decimal(18,5)", nullable: false),
                    ldqtyrsrv = table.Column<decimal>(name: "ld_qty_rsrv", type: "decimal(18,5)", nullable: false),
                    ldqtyscrp = table.Column<decimal>(name: "ld_qty_scrp", type: "decimal(18,5)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__LD_DET__DA79533852185E7B", x => new { x.ldpart, x.ldexpire });
                    table.ForeignKey(
                        name: "FK__LD_DET__ld_part__59063A47",
                        column: x => x.ldpart,
                        principalTable: "PT_MSTR",
                        principalColumn: "pt_part");
                });

            migrationBuilder.CreateTable(
                name: "LND_DET",
                columns: table => new
                {
                    lndline = table.Column<string>(name: "lnd_line", type: "varchar(8)", unicode: false, maxLength: 8, nullable: false),
                    lndpart = table.Column<int>(name: "lnd_part", type: "int", nullable: false),
                    lndrate = table.Column<decimal>(name: "lnd_rate", type: "decimal(18,5)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__LND_DET__92C8E766B9535070", x => new { x.lndline, x.lndpart });
                    table.ForeignKey(
                        name: "FK__LND_DET__lnd_lin__59FA5E80",
                        column: x => x.lndline,
                        principalTable: "LN_MSTR",
                        principalColumn: "ln_line");
                    table.ForeignKey(
                        name: "FK__LND_DET__lnd_par__5AEE82B9",
                        column: x => x.lndpart,
                        principalTable: "PT_MSTR",
                        principalColumn: "pt_part");
                });

            migrationBuilder.CreateTable(
                name: "PS_MSTR",
                columns: table => new
                {
                    pspar = table.Column<int>(name: "ps_par", type: "int", nullable: false),
                    pscomp = table.Column<int>(name: "ps_comp", type: "int", nullable: false),
                    psqtyper = table.Column<decimal>(name: "ps_qty_per", type: "decimal(18,5)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__PS_MSTR__E959B4269697369B", x => new { x.pspar, x.pscomp });
                    table.ForeignKey(
                        name: "FK__PS_MSTR__ps_comp__5812160E",
                        column: x => x.pscomp,
                        principalTable: "PT_MSTR",
                        principalColumn: "pt_part");
                    table.ForeignKey(
                        name: "FK__PS_MSTR__ps_par__571DF1D5",
                        column: x => x.pspar,
                        principalTable: "PT_MSTR",
                        principalColumn: "pt_part");
                });

            migrationBuilder.CreateTable(
                name: "WO_MSTR",
                columns: table => new
                {
                    wolot = table.Column<int>(name: "wo_lot", type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    wonbr = table.Column<string>(name: "wo_nbr", type: "varchar(18)", unicode: false, maxLength: 18, nullable: false),
                    wouser = table.Column<int>(name: "wo_user", type: "int", nullable: true),
                    wopart = table.Column<int>(name: "wo_part", type: "int", nullable: false),
                    woline = table.Column<string>(name: "wo_line", type: "varchar(8)", unicode: false, maxLength: 8, nullable: true),
                    woseq = table.Column<int>(name: "wo_seq", type: "int", nullable: true),
                    woqtyord = table.Column<int>(name: "wo_qty_ord", type: "int", nullable: false),
                    woorddate = table.Column<DateTime>(name: "wo_ord_date", type: "datetime", nullable: false, defaultValueSql: "(getdate())"),
                    woduedate = table.Column<DateTime>(name: "wo_due_date", type: "date", nullable: false),
                    wostartdate = table.Column<DateTime>(name: "wo_start_date", type: "date", nullable: true),
                    woreldate = table.Column<DateTime>(name: "wo_rel_date", type: "date", nullable: true),
                    woestrun = table.Column<TimeSpan>(name: "wo_est_run", type: "time(0)", precision: 0, nullable: true),
                    wostarttime = table.Column<TimeSpan>(name: "wo_start_time", type: "time(0)", precision: 0, nullable: true),
                    woendtime = table.Column<DateTime>(name: "wo_end_time", type: "datetime", nullable: true),
                    woplddowntime = table.Column<TimeSpan>(name: "wo_pld_downtime", type: "time(0)", precision: 0, nullable: true),
                    wounplddowntime = table.Column<TimeSpan>(name: "wo_unpld_downtime", type: "time(0)", precision: 0, nullable: true),
                    woactivated = table.Column<bool>(name: "wo_activated", type: "bit", nullable: false),
                    wostatus = table.Column<string>(name: "wo_status", type: "varchar(10)", unicode: false, maxLength: 10, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__WO_MSTR__5FD13D21D1259879", x => x.wolot);
                    table.ForeignKey(
                        name: "FK__WO_MSTR__wo_line__60A75C0F",
                        column: x => x.woline,
                        principalTable: "LN_MSTR",
                        principalColumn: "ln_line");
                    table.ForeignKey(
                        name: "FK__WO_MSTR__wo_part__5FB337D6",
                        column: x => x.wopart,
                        principalTable: "PT_MSTR",
                        principalColumn: "pt_part");
                    table.ForeignKey(
                        name: "FK__WO_MSTR__wo_user__5EBF139D",
                        column: x => x.wouser,
                        principalTable: "USER",
                        principalColumn: "user_id");
                });

            migrationBuilder.CreateTable(
                name: "WOD_DET",
                columns: table => new
                {
                    wodpart = table.Column<int>(name: "wod_part", type: "int", nullable: false),
                    wodpar = table.Column<int>(name: "wod_par", type: "int", nullable: false),
                    wodlot = table.Column<int>(name: "wod_lot", type: "int", nullable: false),
                    wodqtyreq = table.Column<decimal>(name: "wod_qty_req", type: "decimal(18,5)", nullable: false),
                    wodqtycompl = table.Column<int>(name: "wod_qty_compl", type: "int", nullable: false),
                    wodqtyrjct = table.Column<int>(name: "wod_qty_rjct", type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__WOD_DET__0041D0AEF376A034", x => new { x.wodpart, x.wodpar, x.wodlot });
                    table.ForeignKey(
                        name: "FK__WOD_DET__wod_lot__6383C8BA",
                        column: x => x.wodlot,
                        principalTable: "WO_MSTR",
                        principalColumn: "wo_lot");
                    table.ForeignKey(
                        name: "FK__WOD_DET__wod_par__619B8048",
                        column: x => x.wodpart,
                        principalTable: "PT_MSTR",
                        principalColumn: "pt_part");
                    table.ForeignKey(
                        name: "FK__WOD_DET__wod_par__628FA481",
                        column: x => x.wodpar,
                        principalTable: "PT_MSTR",
                        principalColumn: "pt_part");
                });

            migrationBuilder.CreateTable(
                name: "XWO_HIST",
                columns: table => new
                {
                    xwoyear = table.Column<string>(name: "xwo_year", type: "char(4)", unicode: false, fixedLength: true, maxLength: 4, nullable: false),
                    xwoweek = table.Column<string>(name: "xwo_week", type: "char(2)", unicode: false, fixedLength: true, maxLength: 2, nullable: false),
                    xwolot = table.Column<int>(name: "xwo_lot", type: "int", nullable: false),
                    xwoversion = table.Column<byte>(name: "xwo_version", type: "tinyint", nullable: false),
                    xwoestrun = table.Column<TimeSpan>(name: "xwo_est_run", type: "time(0)", precision: 0, nullable: true),
                    xwoseq = table.Column<int>(name: "xwo_seq", type: "int", nullable: true),
                    xwostartdate = table.Column<DateTime>(name: "xwo_start_date", type: "date", nullable: true),
                    xwostarttime = table.Column<TimeSpan>(name: "xwo_start_time", type: "time(0)", precision: 0, nullable: true),
                    xwoendtime = table.Column<DateTime>(name: "xwo_end_time", type: "datetime", nullable: true),
                    xwoplddowntime = table.Column<TimeSpan>(name: "xwo_pld_downtime", type: "time(0)", precision: 0, nullable: true),
                    xwounplddowntime = table.Column<TimeSpan>(name: "xwo_unpld_downtime", type: "time(0)", precision: 0, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__XWO_HIST__E9FB120C91D046C4", x => new { x.xwoyear, x.xwoweek, x.xwolot, x.xwoversion });
                    table.ForeignKey(
                        name: "FK__XWO_HIST__xwo_lo__68487DD7",
                        column: x => x.xwolot,
                        principalTable: "WO_MSTR",
                        principalColumn: "wo_lot");
                });

            migrationBuilder.CreateTable(
                name: "LAD_DET",
                columns: table => new
                {
                    ladid = table.Column<int>(name: "lad_id", type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ladpart = table.Column<int>(name: "lad_part", type: "int", nullable: true),
                    ladpar = table.Column<int>(name: "lad_par", type: "int", nullable: true),
                    ladlot = table.Column<int>(name: "lad_lot", type: "int", nullable: true),
                    ladcomp = table.Column<int>(name: "lad_comp", type: "int", nullable: true),
                    ladexpire = table.Column<DateTime>(name: "lad_expire", type: "date", nullable: true),
                    ladqtyrsrv = table.Column<decimal>(name: "lad_qty_rsrv", type: "decimal(18,5)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__LAD_DET__24E37365F9619728", x => x.ladid);
                    table.ForeignKey(
                        name: "FK__LAD_DET__66603565",
                        columns: x => new { x.ladpart, x.ladpar, x.ladlot },
                        principalTable: "WOD_DET",
                        principalColumns: new[] { "wod_part", "wod_par", "wod_lot" });
                    table.ForeignKey(
                        name: "FK__LAD_DET__6754599E",
                        columns: x => new { x.ladcomp, x.ladexpire },
                        principalTable: "LD_DET",
                        principalColumns: new[] { "ld_part", "ld_expire" });
                });

            migrationBuilder.CreateTable(
                name: "WOM_DET",
                columns: table => new
                {
                    wompart = table.Column<int>(name: "wom_part", type: "int", nullable: false),
                    wompar = table.Column<int>(name: "wom_par", type: "int", nullable: false),
                    womlot = table.Column<int>(name: "wom_lot", type: "int", nullable: false),
                    wommat = table.Column<int>(name: "wom_mat", type: "int", nullable: true),
                    womreq = table.Column<decimal>(name: "wom_req", type: "decimal(18,5)", nullable: true),
                    womrsrv = table.Column<decimal>(name: "wom_rsrv", type: "decimal(18,5)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__WOM_DET__65C8E8EFD8CB7F06", x => new { x.wompart, x.wompar, x.womlot });
                    table.ForeignKey(
                        name: "FK__WOM_DET__6477ECF3",
                        columns: x => new { x.wompart, x.wompar, x.womlot },
                        principalTable: "WOD_DET",
                        principalColumns: new[] { "wod_part", "wod_par", "wod_lot" });
                    table.ForeignKey(
                        name: "FK__WOM_DET__wom_mat__656C112C",
                        column: x => x.wommat,
                        principalTable: "PT_MSTR",
                        principalColumn: "pt_part");
                });

            migrationBuilder.CreateIndex(
                name: "IX_CHG_MSTR_chg_from",
                table: "CHG_MSTR",
                column: "chg_from");

            migrationBuilder.CreateIndex(
                name: "IX_CHG_MSTR_chg_to",
                table: "CHG_MSTR",
                column: "chg_to");

            migrationBuilder.CreateIndex(
                name: "IX_LAD_DET_lad_comp_lad_expire",
                table: "LAD_DET",
                columns: new[] { "lad_comp", "lad_expire" });

            migrationBuilder.CreateIndex(
                name: "IX_LAD_DET_lad_part_lad_par_lad_lot",
                table: "LAD_DET",
                columns: new[] { "lad_part", "lad_par", "lad_lot" });

            migrationBuilder.CreateIndex(
                name: "IX_LND_DET_lnd_part",
                table: "LND_DET",
                column: "lnd_part");

            migrationBuilder.CreateIndex(
                name: "IX_PS_MSTR_ps_comp",
                table: "PS_MSTR",
                column: "ps_comp");

            migrationBuilder.CreateIndex(
                name: "UQ__USER__AB6E6164B23BA5AE",
                table: "USER",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_WO_MSTR_wo_line",
                table: "WO_MSTR",
                column: "wo_line");

            migrationBuilder.CreateIndex(
                name: "IX_WO_MSTR_wo_part",
                table: "WO_MSTR",
                column: "wo_part");

            migrationBuilder.CreateIndex(
                name: "IX_WO_MSTR_wo_user",
                table: "WO_MSTR",
                column: "wo_user");

            migrationBuilder.CreateIndex(
                name: "IX_WOD_DET_wod_lot",
                table: "WOD_DET",
                column: "wod_lot");

            migrationBuilder.CreateIndex(
                name: "IX_WOD_DET_wod_par",
                table: "WOD_DET",
                column: "wod_par");

            migrationBuilder.CreateIndex(
                name: "IX_WOM_DET_wom_mat",
                table: "WOM_DET",
                column: "wom_mat");

            migrationBuilder.CreateIndex(
                name: "IX_XWO_HIST_xwo_lot",
                table: "XWO_HIST",
                column: "xwo_lot");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CHG_MSTR");

            migrationBuilder.DropTable(
                name: "DICTIONARY");

            migrationBuilder.DropTable(
                name: "LAD_DET");

            migrationBuilder.DropTable(
                name: "LND_DET");

            migrationBuilder.DropTable(
                name: "PS_MSTR");

            migrationBuilder.DropTable(
                name: "WOM_DET");

            migrationBuilder.DropTable(
                name: "XWO_HIST");

            migrationBuilder.DropTable(
                name: "LD_DET");

            migrationBuilder.DropTable(
                name: "WOD_DET");

            migrationBuilder.DropTable(
                name: "WO_MSTR");

            migrationBuilder.DropTable(
                name: "LN_MSTR");

            migrationBuilder.DropTable(
                name: "PT_MSTR");

            migrationBuilder.DropTable(
                name: "USER");
        }
    }
}

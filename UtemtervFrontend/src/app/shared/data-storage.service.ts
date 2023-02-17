import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { WoService } from '../workorder/wo.service';
import { LnService } from '../ln/ln.service';
import { LndService } from '../lnd/lnd.service';
import { LdService } from '../ld/ld.service';
import { ChgService } from '../chg/chg.service';
import {
  Lad,
  Ld,
  Ln,
  Pt,
  User,
  Wo,
  Wod,
  Ps,
  Lnd,
  psDisplay,
  Chg,
} from './interfaces';
import { PartService } from '../parts/pt/pt.service';
import { throwError } from 'rxjs';
import { PartStrService } from '../parts/ps/ps.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private woService: WoService,
    private userService: UserService,
    private lnService: LnService,
    private lndService: LndService,
    private ldService: LdService,
    private chgService: ChgService,
    private ptService: PartService,
    private partStrService: PartStrService
  ) {}

  formatDate(dateToFormat: Date): string {
    //átírom olyan formátumra, hogy érthető legyen az sql-nek --> string-ként, nem date-ként adom át

    let monthZero: string = dateToFormat.getMonth() + 1 < 10 ? '0' : '';
    let dayZero: string = dateToFormat.getDate() < 10 ? '0' : '';
    let formattedDate: string =
      '' +
      dateToFormat.getFullYear() +
      monthZero +
      (dateToFormat.getMonth() + 1) +
      dayZero +
      dateToFormat.getDate();

    //console.log(formattedDate);

    return formattedDate;

    // a kimenet ilyen lesz: 19950506
    // sql ben varchar(8)-ra lesz jó, ott majd castolni kell date-re
  }

  fetchAllWo() {
    this.http
      .get<WoResponse[]>(URL + '/workorder/list')
      .pipe(
        map((woData) => {
          const woDataNew = woData.map((data) => {
            const sor = {
              wo_lot: data.woLot,
              wo_nbr: data.woNbr,
              wo_user: data.woUser,
              wo_part: data.woPart,
              wo_line: data.woLine,
              wo_seq: data.woSeq,
              wo_qty_ord: data.woQtyOrd,
              wo_ord_date: data.woOrdDate,
              wo_due_date:
                data.woDueDate === null
                  ? null
                  : new Date(data.woDueDate).toISOString().split('T')[0],
              wo_start_date:
                data.woStartDate === null
                  ? null
                  : new Date(data.woStartDate).toISOString().split('T')[0],
              wo_rel_date:
                data.woRelDate === null
                  ? null
                  : new Date(data.woRelDate).toISOString().split('T')[0],
              wo_est_run: data.woEstRun,
              wo_start_time: data.woStartTime,
              wo_end_time: data.woEndTime,
              wo_pld_downtime: data.woPldDowntime,
              wo_unpld_downtime: data.woUnpldDowntime,
              wo_activated: data.woActivated,
              wo_status: data.woStatus,
            };

            return { ...sor };
          });

          return woDataNew;
        }),
        tap({
          next: (data) => {
            this.woService.setWoData(data.slice());
          },
          error: (error) => console.log(error),
        })
      )
      .subscribe();
  }

  fetchUsers() {
    this.http
      .get<
        {
          birthDate: Date;
          email: string;
          name: string;
          post: string;
          userId: number;
        }[]
      >(URL + '/user/list')
      .pipe(
        map((users) => {
          const userData = users.map((user) => {
            const record = {
              user_id: user.userId,
              name: user.name,
              birth_date: new Date(user.birthDate),
              email: user.email,
              post: user.post,
            };
            return { ...record };
          });

          return userData;
        }),
        tap({
          next: (data) => this.userService.setUsers(data.slice()),
          error: (error) => console.log(error),
        })
      )
      .subscribe();
  }

  newUser(user: User) {
    user.password = 'changeme';
    console.log('New User: ' + user);
    return this.http
      .post<any>(URL + '/user/new', {
        name: user.name,
        birthDate: this.formatDate(user.birth_date),
        email: user.email,
        password: user.password,
        post: user.post,
      })
      .pipe(
        tap({
          next: (res) => {
            let u = {
              user_id: res[0].userId,
              name: user.name,
              birth_date: user.birth_date,
              email: user.email,
              post: user.post,
            };
            this.userService.saveUser(u);
          },
          error: (error) => {
            console.log(error);
          },
        })
      );
  }

  updateUser(user: User) {
    //console.log("Updated User: "+user);
    let changedUser = {
      userID: user.user_id,
      name: user.name,
      birthDate: this.formatDate(user.birth_date),
      email: user.email,
      password: '',
      post: user.post,
    };

    return this.http
      .put(URL + '/user/update', changedUser)
      .pipe(
        tap({
          next: (res: number) => {
            console.log('Number of rows updated: ' + res);
            if (res == 1) {
              this.userService.updateUser(user);
            }
          },
          error: (error) => {
            console.log(error);
          },
        })
      )
      .subscribe();
  }

  deleteUser(id: number) {
    // DELETE user/delete/id
    console.log('UserID to delete: ' + id);

    return this.http
      .delete(URL + `/user/delete/${id}`)
      .pipe(
        tap({
          next: (res: number) => {
            console.log('Number of deleted users: ' + res);
            if (res == 1) {
              this.userService.deleteUser(id);
            }
          },
          error: (error) => console.log(error),
        })
      )
      .subscribe();
  }

  fetchPts() {
    console.log('fetching pt');

    return this.http
      .get<
        {
          ptPart: number;
          ptDesc: string;
          ptUm: string;
          ptQtyOh: number;
        }[]
      >(URL + '/pt/list')
      .pipe(
        map((pts) => {
          const ptData = pts.map((pt) => {
            const record: Pt = {
              pt_part: pt.ptPart,
              pt_desc: pt.ptDesc,
              pt_um: pt.ptUm,
              pt_qty_oh: pt.ptQtyOh,
            };
            return { ...record };
          });
          return ptData;
        }),
        tap({
          next: (data) => {
            this.ptService.setPts(data.slice());
          },
          error: (error) => console.log(error),
        })
      )
      .subscribe();
  }

  fetchPsS() {
    console.log('fetching ps');

    return this.http
      .get<
        {
          psPar: number;
          psComp: number;
          psQtyPer: number;
        }[]
      >(URL + '/ps/list')
      .pipe(
        map((strs) => {
          const psData = strs.map((ps) => {
            const record: Ps = {
              ps_par: ps.psPar,
              ps_comp: ps.psComp,
              ps_qty_per: ps.psQtyPer,
            };
            return { ...record };
          });
          //console.log(psData);

          return psData;
        }),
        tap({
          next: (data) => {
            this.partStrService.setPartStrs(data);
          },
          error: (error) => console.log(error),
        })
      )
      .subscribe();
  }

  newPs(ps: Ps) {
    console.log('New Ps: ');
    console.log(ps);

    return this.http
      .post<any>(URL + '/ps/new', {
        psPar: ps.ps_par,
        psComp: ps.ps_comp,
        psQtyPer: ps.ps_qty_per,
      })
      .pipe(
        tap({
          next: (res) => {
            if (res) {
              let str = {
                ps_par: ps.ps_par,
                ps_comp: ps.ps_comp,
                ps_qty_per: ps.ps_qty_per,
              };
              this.partStrService.savePartStr(str);
            }
          },
          error: (error) => console.log(error),
        })
      );
  }

  updatePs(ps: Ps) {
    return this.http
      .put<number>(URL + '/ps/update', {
        psPar: ps.ps_par,
        psComp: ps.ps_comp,
        psQtyPer: ps.ps_qty_per,
      })
      .pipe(
        tap({
          next: (res) => {
            console.log('update response:');
            console.log(res);

            if (res > 0) {
              this.partStrService.savePartStr(ps);
            }
          },
          error: (error) => {
            console.log(error);
          },
        })
      )
      .subscribe();
  }

  deletePs(par, comp) {
    return this.http
      .delete<any>(URL + '/ps/delete/' + par + '/' + comp)
      .pipe(
        tap({
          next: (res: number) => {
            console.log('Number of deleted partstr: ' + res);
            if (res > 0) {
              this.partStrService.deletePartStr(par, comp);
            }
          },
          error: (error) => console.log(error),
        })
      )
      .subscribe();
  }

  fetchLds() {
    console.log('fetching lds');

    this.http
      .get<
        {
          ldPart: number;
          ldExpire: Date;
          ldQtyOh: number;
          ldQtyRsrv: number;
          ldQtyScrp: number;
        }[]
      >(URL + '/ld/list')
      .pipe(
        map((users) => {
          const ldData = users.map((ld) => {
            const record: Ld = {
              ld_part: ld.ldPart,
              ld_expire: new Date(ld.ldExpire),
              ld_qty_oh: ld.ldQtyOh,
              ld_qty_rsrv: ld.ldQtyRsrv,
              ld_qty_scrp: ld.ldQtyScrp,
            };
            return { ...record };
          });
          return ldData;
        }),
        tap({
          next: (data) => {
            this.ldService.setLds(data.slice());
          },
          error: (error) => console.log(error),
        })
      )
      .subscribe();
  }
  newLd(ld: Ld) {
    /*
    console.log('New Ld: ');
    console.log(ld); */

    return this.http
      .post<any>(URL + '/ld/new', {
        ldPart: ld.ld_part,
        ldExpire: this.formatDate(ld.ld_expire),
        ldQtyOh: ld.ld_qty_oh,
        ldQtyRsrv: ld.ld_qty_rsrv,
        ldQtyScrp: ld.ld_qty_scrp,
      })
      .pipe(
        tap({
          next: (res) => {
            if (res) {
              let newLd = {
                ld_part: ld.ld_part,
                ld_expire: ld.ld_expire,
                ld_qty_oh: ld.ld_qty_oh,
                ld_qty_rsrv: ld.ld_qty_rsrv,
                ld_qty_scrp: ld.ld_qty_scrp,
              };
              this.ldService.saveLd(newLd, 'new');
              console.log(res);
            }
          },
          error: (error) => console.log(error),
        })
      )
      .subscribe();
  }

  updateLd(ld: Ld) {}
  par: { ldPart: number; ldExpire: Date };
  deleteLd(part: number, exp: Date) {
    return this.http
      .delete<any>(URL + '/ld/delete/' + part + '/' + this.formatDate(exp))
      .pipe(
        tap({
          next: (res: number) => {
            console.log('Number of deleted lds: ' + res);
            if (res > 0) {
              this.ldService.deleteLd(part, exp);
            }
          },
          error: (error) => console.log(error),
        })
      )
      .subscribe();
  }

  fetchWo(id: number) {
    /* let api = "workorder/" + id; */
    return this.http.get<WoResponse[]>(URL + '/workorder/' + id).pipe(
      map((woData) => {
        const woDataNew: Wo[] = woData.map((data) => {
          return {
            wo_lot: data.woLot,
            wo_nbr: data.woNbr,
            wo_part: data.woPart,
            wo_qty_ord: data.woQtyOrd,
            wo_ord_date: data.woOrdDate,
            wo_seq: data.woSeq,
            wo_due_date:
              data.woDueDate === null
                ? null
                : new Date(data.woDueDate).toISOString().split('T')[0],
            wo_line: data.woLine,
            wo_est_run: data.woEstRun,
            wo_start_date:
              data.woStartDate === null
                ? null
                : new Date(data.woStartDate).toISOString().split('T')[0],
            wo_start_time: data.woStartTime,
            wo_end_time: data.woEndTime,
            wo_pld_downtime: data.woPldDowntime,
            wo_unpld_downtime: data.woUnpldDowntime,
            wo_activated: data.woActivated,
            wo_status: data.woStatus,
            wo_rel_date:
              data.woRelDate === null
                ? null
                : new Date(data.woRelDate).toISOString().split('T')[0],
            wo_user: data.woUser,
          };
        });

        return { ...woDataNew[0] };
      }) /* ,

        tap({
          next: (data) => console.log(data),
          error: (error) => console.error(error),
        }) */
    );
  }

  fetchLad(id: number) {
    return this.http.get<any>(URL + '/lad/' + id).pipe(
      map((lads) => {
        const newLads = lads.map((lad) => {
          const newLad: Lad = {
            lad_id: lad.ladId,
            lad_part: lad.ladPart,
            lad_par: lad.ladPar,
            lad_lot: lad.ladLot,
            lad_comp: lad.ladComp,
            lad_expire: lad.ladExpire,
            lad_qty_rsrv: lad.ladQtyRsrv,
            lad_qty_used: lad.ladQtyUsed,
          };
          return { ...newLad };
        });
        return newLads;
      })
    );
  }

  fetchWod(id: number) {
    return this.http.get<any>(URL + '/wod/' + id).pipe(
      map((wodData) => {
        const newWods: Wod[] = wodData.map((wod) => {
          const newWod: Wod = {
            wod_part: wod.part,
            part_name: wod.partName,
            wod_par: wod.parent,
            par_name: wod.parentName,
            wod_qty_req: wod.qtyReq,
            part_um: wod.partUm,
            wod_qty_compl: wod.qtyCompl,
            wod_qty_rjct: wod.qtyRjct,
          };
          return { ...newWod };
        });
        return newWods;
      })
    );
  }

  postWo(wo) {
    return this.http.post<any>(URL + '/workorder/new', wo).pipe(
      map((res) => {
        const woA = res.map((data) => {
          const wo = {
            wo_lot: data.woLot,
            wo_nbr: data.woNbr,
            wo_part: data.woPart,
            wo_qty_ord: data.woQtyOrd,
            wo_ord_date: data.woOrdDate,
            wo_seq: data.woSeq,
            wo_due_date: data.woDueDate,
            wo_line: data.woLine,
            wo_est_run: data.woEstRun,
            wo_start_date: data.woStartDate,
            wo_start_time: data.woStartTime,
            wo_end_time: data.woEndTime,
            wo_pld_downtime: data.woPldDowntime,
            wo_unpld_downtime: data.woUnpldDowntime,
            wo_activated: data.woActivated,
            wo_status: data.woStatus,
            wo_rel_date: data.woRelDate,
            wo_user: data.woUser,
          };
          return { ...wo };
        });
        return { ...woA[0] };
      })
    );
  }

  updateWo(wo) {
    console.log(wo);
    let lot: number = +wo.wo_lot;
    let vegpont = URL + '/workorder/update';
    return this.http.put<any>(vegpont, wo).pipe(
      map((res) => {
        const woA = res.map((data) => {
          const wo = {
            wo_lot: data.woLot,
            wo_nbr: data.woNbr,
            wo_part: data.woPart,
            wo_qty_ord: data.woQtyOrd,
            wo_ord_date: data.woOrdDate,
            wo_seq: data.woSeq,
            wo_due_date: data.woDueDate,
            wo_line: data.woLine,
            wo_est_run: data.woEstRun,
            wo_start_date: data.woStartDate,
            wo_start_time: data.woStartTime,
            wo_end_time: data.woEndTime,
            wo_pld_downtime: data.woPldDowntime,
            wo_unpld_downtime: data.woUnpldDowntime,
            wo_activated: data.woActivated,
            wo_status: data.woStatus,
            wo_rel_date: data.woRelDate,
            wo_user: data.woUser,
          };
          return { ...wo };
        });
        return { ...woA[0] };
      })
    );
  }

  deleteWo(id: number) {
    return this.http.delete(URL + '/workorder' + '/delete/' + id);
  }

  fetchGyartosorok() {
    console.log('fetching gys');

    this.http
      .get<
        {
          lnLine: string;
          lnDesc: string;
        }[]
      >(URL + '/ln/list')
      .pipe(
        map((gysek) => {
          const gysData = gysek.map((gys) => {
            const record = {
              ln_line: gys.lnLine,
              ln_desc: gys.lnDesc,
            };
            return { ...record };
          });
          return gysData;
        }),
        tap({
          next: (data) => this.lnService.setLines(data.slice()),
          error: (error) => console.log(error),
        })
      )
      .subscribe();
  }

  newLn(ln: Ln) {
    console.log('üdvözlet a newLn től!');
    this.http
      .post<any>(URL + '/ln/new', {
        lnLine: ln.ln_line,
        lnDesc: ln.ln_desc,
      })
      .pipe(
        tap({
          next: (res) => {
            /* console.log("res line:");
            console.log(res[0].lnLine); */
            let l = {
              ln_line: res[0].lnLine,
              ln_desc: res[0].lnDesc,
            };
            console.log(l);

            this.lnService.newLine(l);
          },
          error: (error) => console.log(error),
        })
      )
      .subscribe();
  }

  updateLn(ln: Ln) {
    //console.log("Updated User: "+user);
    let updatedLn = {
      Line: ln.ln_line,
      NewDesc: ln.ln_desc,
    };

    return this.http
      .put(URL + '/ln/update', updatedLn)
      .pipe(
        tap({
          next: (res: number) => {
            console.log('Number of rows updated: ' + res);
            if (res == 1) {
              this.lnService.editLine(ln.ln_line, ln.ln_desc);
            }
          },
          error: (error) => {
            console.log(error);
          },
        })
      )
      .subscribe();
  }

  deleteLn(line: string) {
    this.http
      .delete(URL + '/ln/delete/' + line)
      .pipe(
        tap({
          next: (res: number) => {
            if (res == 1) {
              this.lnService.deleteLine(line);
              console.log('töröltem');
            } else {
              console.log('nem töröltem');
            }
          },
          error: (error) => console.log(error),
        })
      )
      .subscribe();
  }

  fetchLnds() {
    this.http
      .get<
        {
          lndLine: string;
          lndPart: number;
          lndRate: number;
        }[]
      >(URL + '/lnd/list')
      .pipe(
        map((lnds) => {
          const lndData = lnds.map((lnd) => {
            const record = {
              lnd_line: lnd.lndLine,
              lnd_part: lnd.lndPart,
              lnd_rate: lnd.lndRate,
            };
            return { ...record };
          });
          return lndData;
        }),
        tap({
          next: (data) => this.lndService.setLnds(data.slice()),
          error: (error) => console.log(error),
        })
      )
      .subscribe();
  }

  newLnd(lnd: Lnd) {
    console.log('üdvözlet a newLnd től!');
    this.http
      .post<any>(URL + '/lnd/new', {
        lndLine: lnd.lnd_line,
        lndPart: lnd.lnd_part,
        lndRate: lnd.lnd_rate,
      })
      .pipe(
        tap({
          next: (res) => {
            /* console.log("res line:");
            console.log(res[0].lnLine); */
            let l = {
              lnd_line: res[0].lndLine,
              lnd_part: res[0].lndPart,
              lnd_rate: res[0].lndRate,
            };
            console.log(l);

            this.lndService.newRate(l);
          },
          error: (error) => console.log(error),
        })
      )
      .subscribe();
  }

  updateLnd(lnd: Lnd) {
    console.log('Updated Lnd: ' + lnd);
    let updatedLnd = {
      LndLine: lnd.lnd_line,
      LndPart: lnd.lnd_part,
      LndRate: lnd.lnd_rate,
    };

    return this.http
      .put(URL + '/lnd/update', updatedLnd)
      .pipe(
        tap({
          next: (res: number) => {
            if (res == 1) {
              this.lndService.editLnd(lnd);
            }
          },
          error: (error) => {
            console.log(error);
          },
        })
      )
      .subscribe();
  }

  deleteLnd(lnd: Lnd) {
    console.log('üdv a deleteLnd ből');

    this.http
      .delete(URL + '/lnd/delete/' + lnd.lnd_line + '/' + lnd.lnd_part)
      .pipe(
        tap({
          next: (res: number) => {
            if (res == 1) {
              this.lndService.deleteLine(lnd.lnd_line, lnd.lnd_part);
              console.log(res);
            } else {
              console.log(res);
            }
          },
          error: (error) => console.log(error),
        })
      )
      .subscribe();
  }

  fetchChgs() {
    this.http
      .get<
        {
          chgLine: string;
          chgFrom: number;
          chgTo: number;
          chgTime: string;
        }[]
      >(URL + '/chg/list')
      .pipe(
        map((chgs) => {
          const chgData = chgs.map((chg) => {
            const record = {
              chg_line: chg.chgLine,
              chg_from: chg.chgFrom,
              chg_to: chg.chgTo,
              chg_time: chg.chgTime,
            };
            return { ...record };
          });
          return chgData;
        }),
        tap({
          next: (data) => this.chgService.setChangeTimes(data.slice()),
          error: (error) => console.log(error),
        })
      )
      .subscribe();
  }

  newChg(chg: Chg) {
    console.log('üdvözlet a newChg tól!');
    this.http
      .post<any>(URL + '/chg/new', {
        chgLine: chg.chg_line,
        chgFrom: chg.chg_from,
        chgTo: chg.chg_to,
        chgTime: chg.chg_time,
      })
      .pipe(
        tap({
          next: (res) => {
            let c: Chg = {
              chg_line: res[0].chgLine,
              chg_from: res[0].chgFrom,
              chg_to: res[0].chgTo,
              chg_time: res[0].chgTime,
            };
            console.log(c);

            this.chgService.newChg(c);
          },
          error: (error) => console.log(error),
        })
      )
      .subscribe();
  }

  updateChg(chg: Chg) {
    console.log('Updated Chg: ' + chg);
    let updatedChg = {
      chgLine: chg.chg_line,
      chgFrom: chg.chg_from,
      chgTo: chg.chg_to,
      chgTime: chg.chg_time,
    };

    return this.http
      .put(URL + '/chg/update', updatedChg)
      .pipe(
        tap({
          next: (res: number) => {
            if (res == 1) {
              this.chgService.editChg(chg);
            }
          },
          error: (error) => {
            console.log(error);
          },
        })
      )
      .subscribe();
  }

  deleteChg(chg: Chg) {
    console.log('üdv a deleteChg ból');

    this.http
      .delete(
        URL +
          '/chg/delete/' +
          chg.chg_line +
          '/' +
          chg.chg_from +
          '/' +
          chg.chg_to
      )
      .pipe(
        tap({
          next: (res: number) => {
            if (res == 1) {
              this.chgService.deleteChg(chg.chg_line, chg.chg_from, chg.chg_to);
              console.log(res);
            } else {
              console.log(res);
            }
          },
          error: (error) => console.log(error),
        })
      )
      .subscribe();
  }

  fetchUtemterv(week: number, line: string){
     return this.http.get<any>(URL + "/workorder/prodsch/"+line+'/'+week )
        .pipe(
          map(
            (res)=>{
              
              
               const wos = res.map(
              (data)=>{
                 const e_wo = {
                  wo_lot: data.woLot,
                  wo_nbr: data.woNbr,
                  wo_part: data.woPart,
                  pt_desc: data.ptDesc,
                  wo_qty_ord: data.woQtyOrd,
                  part_um: data.ptUm,
                  wo_line: data.woLine,
                  ln_desc: data.lnDesc,
                  item_per_hour: data.egys,
                  wo_est_run: data.estRun,
                  wo_seq: data.woSeq,
                  wo_rel_date: data.woRelDate,
                  wo_start_date: data.woStartDate,
                  wo_start_time: data.woStartTime,
                  wo_end_time: data.woEndTime,
                  wo_pld_downtime: data.woPldDowntime,
                  wo_unpld_downtime: data.woUnpldDowntime,
                } 
                return{...e_wo}
              } 
              )
              console.log(wos);
              return wos;
            }
          )
        )

  }


}

export const URL = 'https://localhost:7075/api';
interface WoResponse {
  woLot: number;
  woNbr: string;
  woPart: number;
  woQtyOrd: number;
  woOrdDate: string;
  woSeq: number;
  woDueDate: string;
  woLine: string;
  woEstRun: string;
  woStartDate: string;
  woStartTime: string;
  woEndTime: string;
  woPldDowntime: string;
  woUnpldDowntime: string;
  woActivated: boolean;
  woStatus: string;
  woRelDate: string;
  woUser: number;
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { pipe } from 'rxjs-compat';
import { map, tap, take, catchError } from 'rxjs/operators';
import { Ld, User, Wo } from '../data-table/data-table.service';
import { UserService } from '../user/user.service';
import { WoService } from '../workorder/wo.service';
import { LnService } from '../ln/ln.service';
import { LdService } from '../ld/ld.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private woService: WoService,
    private userService: UserService,
    private router: Router,
    private lnService: LnService,
    private ldService: LdService
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
              wo_due_date: data.woDueDate,
              wo_start_date: data.woStartDate,
              wo_rel_date: data.woRelDate,
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

    //console.log(formattedDate);

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
          error: (error) => console.log(error),
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

  fetchLd() {
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
  fetchWo(id: number) {
    /* let api = "workorder/" + id; */
    return this.http
      .get<WoResponse[]>(URL + '/workorder/' + id)
      .pipe(
        map((woData) => {
          const woDataNew: Wo[] = woData.map((wo) => {
            return {
              wo_lot: wo.woLot,
              wo_nbr: wo.woNbr,
              wo_part: wo.woPart,
              wo_qty_ord: wo.woQtyOrd,
              wo_ord_date: wo.woOrdDate,
              wo_seq: wo.woSeq,
              wo_due_date: wo.woDueDate,
              wo_line: wo.woLine,
              wo_est_run: wo.woEstRun,
              wo_start_date: wo.woStartDate,
              wo_start_time: wo.woStartTime,
              wo_end_time: wo.woEndTime,
              wo_pld_downtime: wo.woPldDowntime,
              wo_unpld_downtime: wo.woUnpldDowntime,
              wo_activated: wo.woActivated,
              wo_status: wo.woStatus,
              wo_rel_date: wo.woRelDate,
              wo_user: wo.woUser,
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

  fetchLad(id: number) {}

  fetchWod(id: number) {}

  postWo(wo) {
    return this.http.post<any>(URL + '/workorder/new', wo)
    .pipe(
      map(
        (res) => {
          const woA = res.map((data) => {
            const wo = {wo_lot: data.woLot,
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
              wo_user: data.woUser,}
            return {...wo}
          });
          return { ...woA[0] };
        }
      )

    )
  }
  updateWo(wo) {
    console.log(wo);
    let lot: number = +wo.wo_lot;
    let vegpont =  URL + '/workorder/update';
    return this.http.put<any>(vegpont, wo)
    .pipe(
      map(
        (res) => {
          const woA = res.map((data) => {
            const wo = {wo_lot: data.woLot,
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
              wo_user: data.woUser,}
            return {...wo}
          });
          return { ...woA[0] };
        }
      )

    )
  }
  deleteWo(id: number) {}

  fetchGyartosorok() {
    this.http
      .get<
        {
          lnLine: string;
          lnDesc: string;
        }[]
      >(URL + '/gys/list')
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

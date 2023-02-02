import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { pipe } from 'rxjs-compat';
import { map, tap, take, catchError } from 'rxjs/operators';
import { User, Wo } from '../data-table/data-table.service';
import { UserService } from '../user/user.service';
import { WoService } from '../workorder/wo.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private woService: WoService,
    private userService: UserService
  ) {}
  fetchAllWo() {
    this.http
      .get<WoResponse[]>('https://localhost:7075/workorder/list')
      .pipe(
        map((woData) => {
          const woDataNew = woData.map((data) => {
            const sor = {
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
    /* const userT = {
      name: 'Kemény Kálmán',
      birthDate: '2006-02-02T09:53:34.983Z',
      email: 'kami@kamu.com',
      password: 'szeretlek',
      post: 6,
    }; */

    user.password = 'tutalibetalibe';
    console.log(user);

    return this.http.post<any>(URL + '/user/new', user).pipe(
      tap({
        next: (res) => {
          console.log();
          let u = {
            user_id: res[0].userId,
            name: user.name,
            birth_date: user.birth_date,
            email: user.email,
            post: user.post,
          };
          console.log(u.birth_date);
          this.userService.saveUser(u);
        },
        error: (error) => console.log(error),
      })
    );
  }

  fetchWo(id: number) {
    /* let api = "workorder/" + id; */
    return this.http
      .get<WoResponse[]>('https://localhost:7075/workorder/' + id)
      .pipe(
        map((woData) => {
          const woDataNew = woData.map((wo) => {
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

          return { ...woDataNew };
        }),

        tap({
          next: (data) => console.log(data),
          error: (error) => console.error(error),
        })
      );
  }

  fetchLad(id: number) {}

  fetchWod(id: number) {}

  postWo(wo: Wo) {}
  updateWo(wo: Wo) {}
  deleteWo(id: number) {}
}

export const URL = 'https://localhost:7075';
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

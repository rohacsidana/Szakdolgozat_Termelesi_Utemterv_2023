import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
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

  fetchUsers() {
    console.log('fetching users');

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

  fetchAllWo() {
    this.http
      .get<
        {
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
        }[]
      >(URL + '/workorder/list')
      .pipe(
        map((woData) => {
          console.log(woData);

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
            console.log(sor);

            return { ...sor };
          });
          console.log(woData);
          console.log(woDataNew);

          return woDataNew;
        }),
        tap({
          next: (data) => {
            console.log(typeof data);
            console.log(data);
            this.woService.setWoData(data.slice());
          },
          error: (error) => console.log(error),
        })
      )
      .subscribe();
  }
  fetchWo(id: number) {}

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

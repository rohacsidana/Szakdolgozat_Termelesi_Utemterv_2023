import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of, Subscription, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Wo } from '../../../shared/interfaces';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { WoService } from '../../wo.service';
import { Time } from '@angular/common';

@Component({
  selector: 'app-wo-form',
  templateUrl: 'wo-form.component.html',
})
export class WoFormComponent implements OnInit, OnDestroy {
  selectedMode: boolean = false;
  selectedWoLot: number;

  editing: boolean = false;
  newMode: boolean = false;
  selectedWo: Wo = {
    wo_lot: null,
    wo_nbr: null,
    wo_part: null,
    wo_qty_ord: null,
    wo_ord_date: null,
    wo_seq: null,
    wo_due_date: null,
    wo_line: null,
    wo_est_run: null,
    wo_start_date: null,
    wo_start_time: null,
    wo_end_time: null,
    wo_pld_downtime: null,
    wo_unpld_downtime: null,
    wo_activated: null,
    wo_status: null,
    wo_rel_date: null,
    wo_user: null,
  };
  @ViewChild('woForm') woForm: NgForm;
  woFormActData = {
    woLot: null,
    order: '',
    part: null,
    status: '',
    line: '',
    qtyOrd: null,
    ordDate: '',
    estTime: '',
    seq: null,
    dueDate: '',
    startDate: '',
    startTime: '',
    endTime: '',
    pldDown: '',
    unpldDown: '',
    activated: false,
    relDate: '',
    user: null,
  };
  error: string = null;
  errorSub: Subscription;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private woService: WoService,
    private DataStorageService: DataStorageService
  ) {}
  ngOnInit() {
    this.errorSub = this.woService.errorChanged.subscribe((error) => {
      this.error = error;
    });

    this.route.params.subscribe((params: Params) => {
      this.selectedWoLot = +params['lot'];
      this.selectedMode = params['lot'] != null;
      this.newMode = this.router.url === '/workorder/new';

      this.initForm();
    });
  }

  initForm() {
    if (this.selectedMode) {
      this.selectedWo = this.woService.getSelectedWo();

      if (this.selectedWo === null) {
        this.DataStorageService.fetchWo(this.selectedWoLot)
          .pipe(
            tap({
              next: (data) => {
                this.woService.setSelectedWo({ ...data });
                this.selectedWo = { ...data };

                this.initFormData();
              },
              error: (error) => this.handleError(error),
            })
          )
          .subscribe();
      } else {
        this.initFormData();
      }
    } else if (this.newMode) {
      this.editing = true;
      this.woService.setEditing(this.editing);
    }
  }
  onHandleError() {
    this.error = null;
    this.woService.woError = null;
    if (this.woFormActData.woLot != null) {
      this.woFormActData.woLot = this.selectedWo.wo_lot;
    }
  }

  handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Ismeretlen hiba történt.';

    switch (errorRes.error) {
      case 'WO_NOT_FOUND':
        //errorMessage = 'Workorder not found';
        errorMessage = 'Gyártási rendelés nem található.';
        break;
      case 'STATUS_ERROR':
        //errorMessage = 'Due of the status value you can not change that.';
        errorMessage = 'A státusz értéke miatt ez nem változtatható.';
        break;
      case 'WO_NOT_COMPLETED':
        //errorMessage = 'Due of the status value you can not change that.';
        errorMessage = 'Csak \"completed\" státuszal rendelkező gyártási rendelésre lehet nem tervezett átállási időt leadni.';
        break;
      case 'UNKNOWN_ERROR':
        //errorMessage = 'An unknown error occurred';
        errorMessage = 'Ismeretlen hiba történt.';
        break;
      default:
        //errorMessage = 'An unknown error occurred';
        errorMessage = 'Ismeretlen hiba történt.';
        break;
    }

    this.error = errorMessage;
    this.woService.woError = this.error;
    return throwError(errorMessage);
  }

  initFormData() {
    this.woFormActData.woLot = this.selectedWo.wo_lot;
    this.woFormActData.order = this.selectedWo.wo_nbr;
    this.woFormActData.part = this.selectedWo.wo_part;
    this.woFormActData.status = this.selectedWo.wo_status;
    this.woFormActData.line = this.selectedWo.wo_line;
    this.woFormActData.qtyOrd = this.selectedWo.wo_qty_ord;
    this.woFormActData.ordDate = this.selectedWo.wo_ord_date;
    this.woFormActData.estTime = this.selectedWo.wo_est_run;
    this.woFormActData.seq = this.selectedWo.wo_seq;
    this.woFormActData.dueDate = this.selectedWo.wo_due_date;
    this.woFormActData.startDate = this.selectedWo.wo_start_date;
    this.woFormActData.startTime = this.selectedWo.wo_start_time;
    this.woFormActData.endTime = this.selectedWo.wo_end_time;
    this.woFormActData.pldDown = this.selectedWo.wo_pld_downtime;
    this.woFormActData.unpldDown = this.selectedWo.wo_unpld_downtime;
    this.woFormActData.activated = this.selectedWo.wo_activated;
    this.woFormActData.relDate = this.selectedWo.wo_rel_date;
    this.woFormActData.user = this.selectedWo.wo_user;
  }

  search() {
    this.DataStorageService.fetchWo(this.woFormActData.woLot)
      .pipe(
        tap({
          next: (data) => {
            this.woService.setSelectedWo({ ...data });
            this.router.navigate(['./', 'workorder', this.woFormActData.woLot]);
          },
          error: (error) => this.handleError(error),
        })
      )
      .subscribe();
  }

  new() {
    if (this.newMode) {
      this.editing = !this.editing;
      this.woService.setEditing(this.editing);
    } else {
      this.router.navigate(['workorder', 'new']);
    }
  }

  cancel() {
    if (this.newMode) {
      this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      this.editing = false;
      this.woService.setEditing(this.editing);
      this.initForm();
    }
  }

  edit() {
    this.initFormData();
    this.editing = true;
    this.woService.setEditing(this.editing);
  }

  save() {
    if (this.selectedMode) {
      this.DataStorageService.updateWo({
        woNbr: this.woFormActData.order,
        woPart: this.woFormActData.part,
        woQtyOrd: this.woFormActData.qtyOrd,
        woDueDate: this.woFormActData.dueDate,
        woLot: this.woFormActData.woLot,
        woLine: this.woFormActData.line,
        woStartDate: this.woFormActData.startDate,
        woRelDate: this.woFormActData.relDate,
        woActivated: this.woFormActData.activated,
        woStatus: this.woFormActData.status,
      })
        .pipe(
          tap({
            next: (data) => {
              if (
                this.selectedWo.wo_status == 'waiting' &&
                this.woFormActData.status == 'accepted'
              ) {
                this.DataStorageService.fetchLad(this.selectedWo.wo_lot)
                  .pipe(
                    tap({
                      next: (data) => this.woService.setWodData([...data]),
                      error: (error) => {
                        if (this.woService.woError === null) {
                          this.woService.setWodData([]);
                        }
                        return;
                      },
                    })
                  )
                  .subscribe();
                this.DataStorageService.fetchWod(this.selectedWo.wo_lot)
                  .pipe(
                    tap({
                      next: (data) => this.woService.setWodData([...data]),
                      error: (error) => {
                        if (this.woService.woError === null) {
                          this.woService.setWodData([]);
                        }
                        return;
                      },
                    })
                  )
                  .subscribe();
              }
              this.woService.setSelectedWo({ ...data });
              this.selectedWo = { ...data };
              this.initFormData();
              this.editing = false;
              this.woService.setEditing(this.editing);
            },
            error: (error) => this.handleError(error),
          })
        )
        .subscribe();
    } else {
      this.DataStorageService.postWo({
        woNbr: this.woFormActData.order,
        woPart: this.woFormActData.part,
        woQtyOrd: this.woFormActData.qtyOrd,
        woDueDate: this.woFormActData.dueDate,
      })
        .pipe(
          tap({
            next: (data) => {
              this.woService.setSelectedWo({ ...data });
              this.router.navigate(['../', 'workorder', data.wo_lot]);
            },
            error: (error) => this.handleError(error),
          })
        )
        .subscribe();
    }
  }

  delete() {
    this.DataStorageService.deleteWo(this.woFormActData.woLot)
      .pipe(
        tap({
          next: (data) => this.woService.deleteWo(this.woFormActData.woLot),
          error: (error) => this.handleError(error),
        })
      )
      .subscribe(() => {
        this.woService.setSelectedWo(null);
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }

  onRepUnpldDowntime(time){
    this.DataStorageService.unpldDowntime(this.selectedWoLot, time)
    .pipe(
      tap({
        next: (res)=>{
          console.log(res);
        },
        error: (err)=>{
          this.handleError(err)
        }
      })
    )
    .subscribe()
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Wo } from 'src/app/data-table/data-table.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { WoService } from '../../wo.service';

@Component({
  selector: 'app-wo-form',
  templateUrl: 'wo-form.component.html',
})
export class WoFormComponent implements OnInit, OnDestroy {
  selectedMode: boolean = false;
  selectedWoLot: number;

  editing: boolean = false;
  newMode: boolean = false;
  selectedWo: Wo;
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
    user: null
  };
  error: string = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private woService: WoService,
    private DataStorageService: DataStorageService
  ) { }
  ngOnInit() {
    /* this.newMode = this.woService.newMode; */
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
        this.selectedWo = this.woService.getWo(this.selectedWoLot);
      } else {
        this.initFormData();
      }
      if (this.selectedWo === null) {

        this.DataStorageService.fetchWo(this.selectedWoLot).pipe(
          tap(
            {
              next: (data) => console.log(data),
              error: (error) => this.handleError(error),
            }
          ),
        )
          .subscribe((data) => {
            this.selectedWo = data;
            this.initFormData();
          });
      } else {

        this.initFormData();
      }
    } else if (this.newMode) {
      this.editing = true;
    }
  }
  onHandleError() {
    this.error = null;
    if (this.woFormActData.woLot === null) {
      this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      this.woFormActData.woLot = this.selectedWo.wo_lot;
    }
  }

  handleError(errorRes: HttpErrorResponse) {

    let errorMessage = 'An unknown error occurred!';
    if (errorRes.error !== null) {
      this.error = errorRes.error;
      errorMessage = errorRes.error;
    } else {
      this.error = errorMessage;
    }
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


  onSubmit() {
    console.log(this.woFormActData);
  }

  search() {
    let wo = this.woService.getWo(+this.woFormActData.woLot);
    if (wo !== null) {
      this.woService.setSelectedWo(wo);
      this.router.navigate(['./', 'workorder', +this.woFormActData.woLot]);
    } else {
      this.DataStorageService.fetchWo(this.woFormActData.woLot).pipe(
        tap(
          {
            next: (data) => console.log(data),
            error: (error) => this.handleError(error),
          }
        ),
      )
        .subscribe((data) => {
          this.woService.setSelectedWo(data);
          this.router.navigate(['./', 'workorder', this.woFormActData.woLot]);

        });
    }

  }

  new() {
    if (this.newMode) {
      //this.initForm();
      this.editing = !this.editing;
    } else {
      this.router.navigate(['workorder', 'new']);
    }
  }

  cancel() {
    if (this.newMode) {
      this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      this.editing = false;
      this.initForm();
    }
  }

  edit() {
    this.editing = true;
    //this.initForm();

    //formot enable
  }

  save() {
    /*Response alapján eldönteni az editinget. */
    //this.editing = false;
    if (this.selectedMode) {
      this.DataStorageService.updateWo({woNbr: this.woFormActData.order,woPart: this.woFormActData.part, woQtyOrd: this.woFormActData.qtyOrd, woDueDate: this.woFormActData.dueDate, woLot: this.woFormActData.woLot,woLine: this.woFormActData.line, woStartDate: this.woFormActData.startDate, woRelDate: this.woFormActData.relDate,woActivated:this.woFormActData.activated, woStatus: this.woFormActData.status})
      .pipe(
        tap(
          {
            next: (data) => this.woService.updateWo(data),
            error: (error) => this.handleError(error),
          }
        ))
        .subscribe();
    } else {

      this.DataStorageService.postWo({ woNbr: this.woFormActData.order, woPart: this.woFormActData.part, woQtyOrd: this.woFormActData.qtyOrd, woDueDate: this.woFormActData.dueDate })
        .pipe(
          tap(
            {
              next: (data) => this.woService.addWoData(data),
              error: (error) => this.handleError(error),
            }
          ),

        )
        .subscribe(
          (resp) => {
            this.router.navigate(['../','workorder', resp.wo_lot]);

          }
        );
      ;
      //this.router.navigate(['workorder']);
    }
  }

  delete() {
    this.DataStorageService.deleteWo(this.woFormActData.woLot);

    this.editing = false;
  }

  ngOnDestroy(): void {

  }
}

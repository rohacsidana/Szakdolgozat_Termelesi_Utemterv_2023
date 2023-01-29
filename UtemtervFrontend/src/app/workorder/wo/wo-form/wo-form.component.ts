import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { subscribeOn } from 'rxjs-compat/operator/subscribeOn';
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
  woForm: FormGroup;
  editing: boolean = false;
  newMode: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private woService: WoService,
    private DataStorageService: DataStorageService
  ) {}
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
    let woLot: number;
    let order = '';
    let part: number;
    let status = '';
    let line = '';
    let qtyOrd: number;
    let ordDate = '';
    let estTime = '';
    let seq: number;
    let dueDate = '';
    let startDate = '';
    let startTime = '';
    let endTime = '';
    let pldDown = '';
    let unpldDown = '';
    let activated = false;
    let relDate = '';
    let user: number;

    if (this.selectedMode) {
      /* const ascF =  */

      
      let wo = this.woService.getWo(this.selectedWoLot);
      
      

      if (wo === null) {
        wo;
        this.DataStorageService.fetchWo(this.selectedWoLot).subscribe((data)=>{

          wo = data[0]});
        
      }
      
      if (wo != null) {
        woLot = wo.wo_lot;
        order = wo.wo_nbr;
        part = wo.wo_part;
        status = wo.wo_status;
        line = wo.wo_line;
        qtyOrd = wo.wo_qty_ord;
        ordDate = wo.wo_ord_date;
        estTime = wo.wo_est_run;
        seq = wo.wo_seq;
        dueDate = wo.wo_due_date;
        startDate = wo.wo_start_date;
        startTime = wo.wo_start_time;
        endTime = wo.wo_end_time;
        pldDown = wo.wo_pld_downtime;
        unpldDown = wo.wo_unpld_downtime;
        activated = wo.wo_activated;
        relDate = wo.wo_rel_date;
        user = wo.wo_user;
      } else {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    } else {
      if (this.newMode) {
        this.editing = true;
      }
    }

    this.woForm = new FormGroup({
      woLot: new FormControl({ value: woLot, disabled: this.editing }),
      order: new FormControl({ value: order, disabled: !this.editing }),
      part: new FormControl({ value: part, disabled: !this.editing }),
      status: new FormControl({ value: status, disabled: !this.editing }),
      line: new FormControl({ value: line, disabled: !this.editing }),
      qtyOrd: new FormControl({ value: qtyOrd, disabled: !this.editing }),
      ordDate: new FormControl({ value: ordDate, disabled: true }),
      estTime: new FormControl({ value: estTime, disabled: true }),
      seq: new FormControl({ value: seq, disabled: true }),
      dueDate: new FormControl({ value: dueDate, disabled: !this.editing }),
      startDate: new FormControl({ value: startDate, disabled: !this.editing }),
      startTime: new FormControl({ value: startTime, disabled: true }),
      endTime: new FormControl({ value: endTime, disabled: true }),
      pldDown: new FormControl({ value: pldDown, disabled: true }),
      unpldDown: new FormControl({ value: unpldDown, disabled: true }),
      activated: new FormControl({ value: activated, disabled: true }),
      relDate: new FormControl({ value: relDate, disabled: !this.editing }),
      user: new FormControl({ value: user, disabled: true }),
    });
  }

  onSubmit() {}

  search() {
    this.router.navigate(['./', 'workorder', this.woForm.value.woLot]);
  }

  new() {
    if (this.newMode) {
      this.initForm();
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
    this.initForm();

    //formot enable
  }

  save() {
    //this.editing = false;
    if (this.editing) {
      this.DataStorageService.updateWo(this.woForm.value);
    } else {
      this.DataStorageService.postWo(this.woForm.value);
      //this.router.navigate(['workorder']);
    }
  }

  delete() {
    this.DataStorageService.deleteWo(this.woForm.value.woLot);

    this.editing = false;
  }
  /*   getWo(){
    return this.woService.getWo(this.selectedWoLot);
  } */

  ngOnDestroy(): void {
  }
}

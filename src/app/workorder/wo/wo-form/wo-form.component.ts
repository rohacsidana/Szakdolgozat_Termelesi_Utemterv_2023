import { Component, OnInit, OnDestroy} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { WoService } from "../../wo.service";

@Component({
    selector: 'app-wo-form',
    templateUrl: 'wo-form.component.html'
})

export class WoFormComponent implements OnInit, OnDestroy {
    selectedMode: boolean = false;
    selectedWoLot: number;
    woForm: FormGroup;
    edit: boolean = false;
    newMode: boolean = false;
  
    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private woService: WoService
    ) {}
    ngOnInit() {
      this.route.params.subscribe((params: Params) => {
        this.selectedWoLot = +params['part'];
        this.selectedMode = params['part'] != null;
        this.initForm();
      });
      this.initForm();
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
        const wo = this.woService.getWo(this.selectedWoLot);
  
        
          if (wo != null) {
            console.log('wo nem null');
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
        
      }
  
      this.woForm = new FormGroup({
        woLot: new FormControl(woLot),
        order: new FormControl(order),
        part: new FormControl(part),
        status: new FormControl(status),
        line: new FormControl(line),
        qtyOrd: new FormControl(qtyOrd),
        ordDate: new FormControl(ordDate),
        estTime: new FormControl(estTime),
        seq: new FormControl(seq),
        dueDate: new FormControl(dueDate),
        startDate: new FormControl(startDate),
        startTime: new FormControl(startTime),
        endTime: new FormControl(endTime),
        pldDown: new FormControl(pldDown),
        unpldDown: new FormControl(unpldDown),
        activated: new FormControl(activated),
        relDate: new FormControl(relDate),
        user: new FormControl(user),
      });
    }
  
    onSubmit() {}
  
    search() {
      this.router.navigate(['./', 'workorder', this.woForm.value.woLot]);
    }
  
    changeMode() {
      this.selectedMode = !this.selectedMode;
    }
  
    new() {
      this.router.navigate(['workorder/', -1]);
      this.woForm.reset();
      this.edit = true;
    }
  
    editing() {
      this.edit = true;
    }
  
    ngOnDestroy(): void {
      console.log('destoryed');
    }
  }
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    private woService: WoService
  ) {}
  ngOnInit() {
    /* this.newMode = this.woService.newMode; */
    this.route.params.subscribe((params: Params) => {
      this.selectedWoLot = +params['part'];
      this.selectedMode = params['part'] != null;
      this.newMode = this.router.url === '/workorder/new';
      
      
      
      this.initForm();
    });
  }

  initForm() {
    console.log("eleje");
    
    console.log('editmode:' + this.editing);
    console.log('new mode:' + this.newMode);
    console.log('selected mode:' + this.selectedMode);
    
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
        this.router.navigate(['../'],{relativeTo: this.route});
      }
    }else{
      if(this.newMode){
        this.editing = true;
      }else{
        this.editing = false;
      }
    }
    console.log("vég");
    
    console.log('editmode:' + this.editing);
    console.log('new mode:' + this.newMode);
    console.log('selected mode:' + this.selectedMode);

    this.woForm = new FormGroup({
      woLot: new FormControl({value: woLot, disabled: false}),
      order: new FormControl({value: order, disabled:true}),
      part: new FormControl({value:part, disabled:true}),
      status: new FormControl({value:status, disabled:true}),
      line: new FormControl({value: line, disabled:true}),
      qtyOrd: new FormControl({value: qtyOrd, disabled:true}),
      ordDate: new FormControl({value: ordDate, disabled:true}),
      estTime: new FormControl({value:estTime, disabled:true}),
      seq: new FormControl({value:seq, disabled:true}),
      dueDate: new FormControl({value:dueDate, disabled:true}),
      startDate: new FormControl({value:startDate, disabled:true}),
      startTime: new FormControl({value:startTime, disabled:true}),
      endTime: new FormControl({value:endTime, disabled:true}),
      pldDown: new FormControl({value:pldDown, disabled:true}),
      unpldDown: new FormControl({value:unpldDown, disabled:true}),
      activated: new FormControl({value:activated, disabled:true}),
      relDate: new FormControl({value:relDate, disabled:true}),
      user: new FormControl({value:user, disabled:true}),
    });
  }

  onSubmit() {}

  search() {
    this.router.navigate(['./', 'workorder', this.woForm.value.woLot]);
  }



  new(){
    if(this.newMode){
      this.initForm();
    }else{

      this.router.navigate(['workorder', 'new'])
    }
  }

  cancel(){
    if(this.newMode){
      this.router.navigate(['../'],{relativeTo: this.route});
    }else{
      this.editing = false;
      this.initForm();
    }

  }

  edit(){
    this.editing = true;
    //formot enable
  }

  save(){
   /*  if(this.newMode){

    }else{

    } */
    this.editing = false;

    
    
  }
 
  delete(){
    this.editing=false;
  }


  ngOnDestroy(): void {
    console.log('destoryed');
  }
}

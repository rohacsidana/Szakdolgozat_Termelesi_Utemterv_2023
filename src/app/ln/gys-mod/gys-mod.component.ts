import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GysService } from '../gys/gys.service';
import { Gys } from '../gys/gys-model';
import { NgForm, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-gys-mod',
  templateUrl: './gys-mod.component.html',
  styleUrls: ['./gys-mod.component.css']
})
export class GysModComponent implements OnInit, OnDestroy {
  @Input() gyartosor: Gys
  kivalasztottGys: Gys
  gysForm: FormGroup

  constructor(private gysService: GysService) { }

  ngOnInit(): void {
    /*this.gysService.kivalasztottGysS.subscribe(
      (index: number) => {
        this.kivalasztottGys = index;
      }
    )*/

    this.gysService.kivalasztottGys.next(this.gyartosor)
    this.initForm()


  }

  private initForm() {

    this.gysForm = new FormGroup({
      'id': new FormControl(this.gyartosor.ln_id),
      'desc': new FormControl(this.gyartosor.ln_desc)
    })
  }


  ngOnDestroy(): void {
    
  }

  onSzerkesztes() {
  
  }

  onSubmit() {

  }

  
  clearForm() {
    this.gysService.kivalasztottGys.next()
  }

  onMegse() {
    this.clearForm()
  }

  onTorol() {
    console.log(this.gysService.getGysek());
    this.gysService.torolGys(0)
    //console.log(this.kivalasztottGys);
    console.log(this.gysService.getGysek());
    this.clearForm()
    
  }
}

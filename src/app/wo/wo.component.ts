import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';

import * as DataTableService from '../data-table/data-table.service';
@Component({
  selector: 'app-wo',
  templateUrl: 'wo.component.html',
  styleUrls: ['wo.component.css'],
  providers: [DataTableService.DataTableService]
})
export class WoComponent {
  isSearchingMode: boolean = true;

  onSubmit(form: NgForm) {
    console.log(form);
    console.log(form.value);
  }

  changeMode() {
    this.isSearchingMode = !this.isSearchingMode;
  }

}

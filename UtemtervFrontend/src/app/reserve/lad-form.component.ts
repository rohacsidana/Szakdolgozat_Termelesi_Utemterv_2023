import { Component } from '@angular/core';
import { DataTableService } from '../data-table/data-table.service';
import { DataStorageService } from '../shared/data-storage.service';
import { ReserveService } from './reserve.service';

@Component({
  selector: 'app-lad-form',
  templateUrl: 'lad-form.component.html',
  providers: [DataTableService],
})
export class LadFormComponent {
  womHeader = [];
  search(lot) {}

  constructor(
    private DatatableService: DataTableService,
    private ReserveService: ReserveService,
    private DataStorageService: DataStorageService
  ) {}

  reserve(ladPart, ladPar, LadLot, ladComp, ladExpire, ladAmount) {
    this.DataStorageService.reserve(
      ladPart,
      ladPar,
      LadLot,
      ladComp,
      ladExpire,
      ladAmount
    ).subscribe((res) => {
      console.log(res);
    });
  }
}

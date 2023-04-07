import { Component } from '@angular/core';
import { DataTableService } from '../data-table/data-table.service';
import { DataStorageService } from '../shared/data-storage.service';
import { ReserveService } from './reserve.service';
import { tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-lad-form',
  templateUrl: 'lad-form.component.html',
  providers: [DataTableService],
})
export class LadFormComponent {
  womHeader = [];
  isLoading: boolean = false;
  error: string = null;
  search(lot) {}

  constructor(
    private DatatableService: DataTableService,
    private ReserveService: ReserveService,
    private DataStorageService: DataStorageService
  ) {}

  reserve(ladPart, ladPar, LadLot, ladComp, ladExpire, ladAmount) {
    this.isLoading = true;
    this.DataStorageService.reserve(
      ladPart,
      ladPar,
      LadLot,
      ladComp,
      ladExpire,
      ladAmount
    )
      .pipe(
        tap({
          next: (res) => {
            console.log(res);
            this.isLoading = false;
          },
          error: (err) => {
            this.isLoading = false;
              this.handleError(err);
          },
        })
      )
      .subscribe();
  }

  handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'Ismeretlen hiba történt.';

    switch (errorRes.error) {
      case "INCORRECT_PARAM":
        errorMessage = "Nem megfelelő adatokat adott meg."
        break;

    }
    
    this.error = errorMessage;
    return throwError(errorMessage);
  }

  onHandleError(){
    this.error = null;
  }
}

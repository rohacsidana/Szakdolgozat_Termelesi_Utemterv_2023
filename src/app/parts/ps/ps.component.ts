import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import * as DataTableService from 'src/app/data-table/data-table.service';
import { PartStrService } from './ps.service';

@Component({
  selector: 'app-ps',
  templateUrl: './ps.component.html',
  styleUrls: ['./ps.component.css'],
  providers: [PartStrService, DataTableService.DataTableService],
})
export class PsComponent {
  loadedPartStr: DataTableService.Ps;

  myGroup: FormGroup;
  partStrFound: boolean = true;
  searchMode: boolean = true;
  partStrAlreadyExists: boolean = false;
  getItemSub: Subscription;
  sortSub: Subscription;
  sortedPartData: DataTableService.Ps[];

  selectedData: DataTableService.Ps;
  rowSelectSubscription: Subscription;

  partStrHeaders = [
    {
      name: 'ps_qty_per',
      szoveg: 'Beépülő mennyiség',
    },
  ];

  constructor(
    private partStrService: PartStrService,
    private dtTblService: DataTableService.DataTableService
  ) {
    this.sortedPartData = partStrService.getParts();
  }

  ngOnInit(): void {
    this.getItemSub = this.dtTblService.getData.subscribe(() => {
      this.dtTblService.emitDataChanged(this.sortedPartData.slice());
    });
    this.dtTblService.emitDataChanged(this.sortedPartData.slice());
    this.sortSub = this.dtTblService.sortData.subscribe((sort: Sort) => {
      this.sortData(sort);
    });
    this.initForm();
    this.rowSelectSubscription = this.dtTblService.selectRow.subscribe(
      (data: DataTableService.Ps) => {
        this.myGroup = new FormGroup({
          ps_par: new FormControl(data.ps_par, Validators.required),
          ps_comp: new FormControl(data.ps_comp, Validators.required),
          ps_qty_per: new FormControl(data.ps_qty_per, Validators.required),
        });
        this.onSearchPart();
        console.log(data);
      }
    );
  }

  initForm() {
    this.myGroup = new FormGroup({
      pt_part: new FormControl('', Validators.required),
      pt_desc: new FormControl('', Validators.required),
      pt_um: new FormControl('', Validators.required),
    });
  }

  sortData(sort: Sort) {
    const data = this.partStrService.getParts();
    if (!sort.active || sort.direction === '') {
      this.sortedPartData = data;
      this.dtTblService.emitDataChanged(this.sortedPartData.slice());
      return;
    }

    this.sortedPartData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'ps_par':
          return this.compare(a.ps_par, b.ps_par, isAsc);
        case 'ps_comp':
          return this.compare(a.ps_comp, b.ps_comp, isAsc);
        case 'ps_qty_per':
          return this.compare(a.ps_qty_per, b.ps_qty_per, isAsc);
        default:
          return 0;
      }
    });

    this.sortedPartData = data.slice();
    this.dtTblService.emitDataChanged(this.sortedPartData.slice());
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onChangeMode() {
    this.clearForm();
    this.searchMode = !this.searchMode;
  }

  onSearchPart() {
    if (
      this.partStrService.getPart(
        this.myGroup.value.ps_par,
        this.myGroup.value.ps_comp
      )
    ) {
      //lekérem a beirt pt_partStr szerinti tételt
      this.loadedPartStr = this.partStrService.getPart(
        this.myGroup.value.ps_par,
        this.myGroup.value.ps_comp
      );
      this.partStrFound = true;
      this.myGroup = new FormGroup({
        ps_par: new FormControl(this.loadedPartStr.ps_par, Validators.required),
        ps_comp: new FormControl(
          this.loadedPartStr.ps_comp,
          Validators.required
        ),
        ps_qty_per: new FormControl(
          this.loadedPartStr.ps_qty_per,
          Validators.required
        ),
      });
    } else {
      this.clearForm();
      this.partStrFound = false;
    }
    console.log('PartStr found: ' + this.partStrFound);
  }

  onDelete() {
    this.partStrService.deletePart(
      this.myGroup.value.ps_par,
      this.myGroup.value.ps_comp
    );
    this.partStrDataChanged();
    this.clearForm();
    this.loadedPartStr = null;
  }

  checkPartAlreadyExists() {
    if (
      this.partStrService.getPart(
        this.myGroup.value.ps_par,
        this.myGroup.value.ps_comp
      )
    ) {
      this.partStrAlreadyExists = true;
    } else {
      this.partStrAlreadyExists = false;
    }
  }

  onSubmit() {
    console.log('Part already exists: ' + this.partStrAlreadyExists);
    this.partStrService.savePart({
      ps_par: Number(this.myGroup.value.ps_par),
      ps_comp: this.myGroup.value.ps_comp,
      ps_qty_per: this.myGroup.value.ps_qty_per,
    });
    //console.log(this.myGroup.value);
    this.partStrDataChanged();
    this.clearForm();
    this.searchMode = true;
  }

  clearForm() {
    this.myGroup.reset();
    this.partStrAlreadyExists = false;
    this.partStrFound = true;
    this.loadedPartStr = null;
  }

  partStrDataChanged() {
    this.sortedPartData = this.partStrService.getParts();
    this.dtTblService.emitDataChanged(this.sortedPartData.slice());
  }

  ngOnDestroy(): void {
    this.getItemSub.unsubscribe();
    this.sortSub.unsubscribe();
    this.rowSelectSubscription.unsubscribe();
  }
}

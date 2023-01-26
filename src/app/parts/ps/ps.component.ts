import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  newMode: boolean = false;
  partStrAlreadyExists: boolean = false;
  getItemSub: Subscription;
  sortSub: Subscription;
  sortedPartStrData: DataTableService.Ps[];

  selectedData: DataTableService.Ps;
  rowSelectSubscription: Subscription;

  partStrHeaders = [
    {
      name: 'ps_par',
      szoveg: 'Szülő',
    },
    {
      name: 'ps_comp',
      szoveg: 'Beépülő',
    },
    {
      name: 'ps_qty_per',
      szoveg: 'Beépülő mennyiség',
    },
  ];

  constructor(
    private partStrService: PartStrService,
    private dtTblService: DataTableService.DataTableService,
    private formBuilder: FormBuilder
  ) {
    this.sortedPartStrData = partStrService.getPartStrs();
  }

  ngOnInit(): void {
    this.getItemSub = this.dtTblService.getData.subscribe(() => {
      this.dtTblService.emitDataChanged(this.sortedPartStrData.slice());
    });
    this.dtTblService.emitDataChanged(this.sortedPartStrData.slice());
    this.sortSub = this.dtTblService.sortData.subscribe((sort: Sort) => {
      this.sortData(sort);
    });
    this.initForm();
    this.rowSelectSubscription = this.dtTblService.selectRow.subscribe(
      (data: DataTableService.Ps) => {
        this.myGroup = this.formBuilder.group({
          ps_par: new FormControl(data.ps_par, Validators.required),
          ps_comp: new FormControl(data.ps_comp, Validators.required),
          ps_qty_per: new FormControl(data.ps_qty_per, Validators.required),
        });
        this.onSearchPartStr();
        //console.log(data);
      }
    );
  }

  initForm() {
    this.myGroup = this.formBuilder.group({
      ps_par: new FormControl('', Validators.required),
      ps_comp: new FormControl('', Validators.required),
      ps_qty_per: new FormControl('', Validators.required),
    });
  }

  sortData(sort: Sort) {
    const data = this.partStrService.getPartStrs();
    if (!sort.active || sort.direction === '') {
      this.sortedPartStrData = data;
      this.dtTblService.emitDataChanged(this.sortedPartStrData.slice());
      return;
    }

    this.sortedPartStrData = data.sort((a, b) => {
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

    this.sortedPartStrData = data.slice();
    this.dtTblService.emitDataChanged(this.sortedPartStrData.slice());
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onChangeMode() {
    this.clearForm();
    this.searchMode = !this.searchMode;
  }

  onSearchPartStr() {
    this.checkPartAlreadyExists();

    if (
      this.partStrService.getPartStr(
        this.myGroup.value.ps_par,
        this.myGroup.value.ps_comp
      )
    ) {
      //disable par, comp inputs if loaded partstr

      //lekérem a beirt ps_par, ps_comp szerinti tételt
      this.loadedPartStr = this.partStrService.getPartStr(
        this.myGroup.getRawValue().ps_par,
        this.myGroup.getRawValue().ps_comp
      );
      console.log(this.loadedPartStr);

      this.partStrFound = true;

      this.myGroup = new FormGroup({
        ps_par: new FormControl(
          this.loadedPartStr.ps_par,
          this.searchMode ? Validators.required : null
        ),
        ps_comp: new FormControl(
          this.loadedPartStr.ps_comp,
          Validators.required
        ),
        ps_qty_per: new FormControl(
          this.loadedPartStr.ps_qty_per,
          Validators.required
        ),
      });
      this.myGroup.get('ps_par').disable();
      this.myGroup.get('ps_comp').disable();
    } else {
      this.clearForm();
      this.partStrFound = false;
    }
    console.log('PartStr found: ' + this.partStrFound);
  }

  onDelete() {
    this.partStrService.deletePartStr(
      this.myGroup.getRawValue().ps_par,
      this.myGroup.getRawValue().ps_comp
    );
    this.partStrDataChanged();
    this.clearForm();
    this.loadedPartStr = null;
  }

  checkPartAlreadyExists() {
    if (
      this.partStrService.getPartStr(
        this.myGroup.value.ps_par,
        this.myGroup.value.ps_comp
      )
    ) {
      this.partStrAlreadyExists = true;
    } else {
      this.partStrAlreadyExists = false;
    }
  }
  onNew(isNewMode: boolean) {
    /* if (isNewMode) {
      console.log('New Mode on');
      this.newMode = true;
    } else {
      console.log('New Mode on');
      this.newMode = false;
    } */
  }
  onSubmit() {
    this.partStrService.savePartStr({
      ps_par: Number(this.myGroup.getRawValue().ps_par),
      ps_comp: Number(this.myGroup.getRawValue().ps_comp),
      ps_qty_per: Number(this.myGroup.value.ps_qty_per),
    });
    //console.log(this.myGroup.value);
    this.partStrDataChanged();
    this.clearForm();
    this.searchMode = true;
  }

  clearForm() {
    this.myGroup.enable();
    this.myGroup.reset();
    this.partStrAlreadyExists = false;
    this.partStrFound = true;
    this.loadedPartStr = null;
  }

  partStrDataChanged() {
    console.log('Ps Data Changed');
    console.log(this.partStrService.getPartStrs());

    this.sortedPartStrData = this.partStrService.getPartStrs();
    this.dtTblService.emitDataChanged(this.sortedPartStrData.slice());
  }

  ngOnDestroy(): void {
    this.getItemSub.unsubscribe();
    this.sortSub.unsubscribe();
    this.rowSelectSubscription.unsubscribe();
  }
}

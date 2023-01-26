import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import * as DataTableService from '../data-table/data-table.service';
import { LdService } from './ld.service';

@Component({
  selector: 'app-ld',
  templateUrl: './ld.component.html',
  styleUrls: ['./ld.component.css'],
})
export class LdComponent implements OnInit, OnDestroy {
  loadedLd: DataTableService.Ld;
  loadedLdToucher: boolean = false;

  myGroup: FormGroup;
  ldFound: boolean = true;
  searchMode: boolean = true;
  newMode: boolean = false;
  ldAlreadyExists: boolean = false;
  getItemSub: Subscription;
  sortSub: Subscription;
  sortedLdData: DataTableService.Ld[];

  selectedData: DataTableService.Ld;
  rowSelectSubscription: Subscription;

  ldHeaders = [
    { name: 'ld_part', szoveg: 'Tétel' },
    { name: 'ld_expire', szoveg: 'Felhasználható' },
    { name: 'ld_qty_oh', szoveg: 'Készleten lévő mennyiség' },
    { name: 'ld_qty_rsrv', szoveg: 'Foglalt mennyiség' },
    { name: 'ld_qty_scrp', szoveg: 'Selejt mennyiség' },
  ];

  constructor(
    private ldService: LdService,
    private dtTblService: DataTableService.DataTableService
  ) {
    this.sortedLdData = ldService.getLds();
  }

  ngOnInit(): void {
    this.getItemSub = this.dtTblService.getData.subscribe(() => {
      this.dtTblService.emitDataChanged(this.sortedLdData.slice());
    });
    this.dtTblService.emitDataChanged(this.sortedLdData.slice());
    this.sortSub = this.dtTblService.sortData.subscribe((sort: Sort) => {
      this.sortData(sort);
    });
    this.initForm();

    this.rowSelectSubscription = this.dtTblService.selectRow.subscribe(
      (data: DataTableService.Ld) => {
        this.myGroup = new FormGroup({
          ld_part: new FormControl(data.ld_part, Validators.required),
          ld_expire: new FormControl(data.ld_expire, Validators.required),
          ld_qty_oh: new FormControl(data.ld_qty_oh, Validators.required),
          ld_qty_rsrv: new FormControl(data.ld_qty_rsrv, Validators.required),
          ld_qty_scrp: new FormControl(data.ld_qty_scrp, Validators.required),
        });
        this.onSearchLd();
        console.log(data);
      }
    );
  }

  initForm() {
    this.myGroup = new FormGroup({
      ld_part: new FormControl(this.loadedLd.ld_part, Validators.required),
      ld_expire: new FormControl('', Validators.required),
      ld_qty_oh: new FormControl('', Validators.required),
      ld_qty_rsrv: new FormControl('', Validators.required),
      ld_qty_scrp: new FormControl('', Validators.required),
    });
  }

  changeNewMode() {
    this.newMode = !this.newMode;
    if (this.newMode) {
      this.myGroup.get('ld_part').disable();
    } else {
      this.clearForm();
    }
  }

  sortData(sort: Sort) {
    const data = this.ldService.getLds();
    if (!sort.active || sort.direction === '') {
      this.sortedLdData = data;
      this.dtTblService.emitDataChanged(this.sortedLdData.slice());
      return;
    }

    this.sortedLdData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'ld_part':
          return this.compare(a.ld_part, b.ld_part, isAsc);
        case 'ld_qty_oh':
          return this.compare(a.ld_qty_oh, b.ld_qty_oh, isAsc);
        case 'ld_expire':
          return 0;
        case 'ld_qty_rsrv':
          return this.compare(a.ld_qty_rsrv, b.ld_qty_rsrv, isAsc);
        case 'post':
          return this.compare(a.ld_qty_scrp, b.ld_qty_scrp, isAsc);

        default:
          return 0;
      }
    });

    this.sortedLdData = data.slice();
    this.dtTblService.emitDataChanged(this.sortedLdData.slice());
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onChangeMode() {
    this.clearForm();
    this.searchMode = !this.searchMode;
  }

  onSearchLd() {
    if (this.ldService.getLd(this.myGroup.getRawValue().ld_part)) {
      //lekérem a beirt azonosito szerinti felhasználót
      this.loadedLd = this.ldService.getLd(
        Number(this.myGroup.getRawValue().ld_part)
      );
      this.ldFound = true;
      this.myGroup = new FormGroup({
        ld_part: new FormControl(this.loadedLd.ld_part, Validators.required),
        ld_expire: new FormControl(
          this.loadedLd.ld_expire.toISOString().split('T')[0],
          Validators.required
        ),
        ld_qty_oh: new FormControl(
          this.loadedLd.ld_qty_oh,
          Validators.required
        ),
        ld_qty_rsrv: new FormControl(
          this.loadedLd.ld_qty_rsrv,
          Validators.required
        ),
        ld_qty_scrp: new FormControl(
          this.loadedLd.ld_qty_scrp,
          Validators.required
        ),
      });
      this.myGroup.get('ld_part').disable();
    } else {
      this.clearForm();
      this.ldFound = false;
    }
    console.log(this.ldFound);
  }

  onDelete() {
    this.ldService.deleteLd(Number(this.myGroup.getRawValue().ld_part));
    this.ldDataChanged();
    this.clearForm();
    this.loadedLd = null;
  }

  checkLdAlreadyExists() {
    if (this.ldService.getLd(Number(this.myGroup.value.ld_part))) {
      this.ldAlreadyExists = true;
    } else {
      this.ldAlreadyExists = false;
    }
  }

  onSubmit() {
    console.log(this.ldAlreadyExists);
    this.ldService.saveLd({
      ld_part: Number(this.myGroup.getRawValue().ld_part),
      ld_expire: new Date(this.myGroup.getRawValue().ld_expire),
      ld_qty_oh: this.myGroup.getRawValue().ld_qty_oh,
      ld_qty_rsrv: this.myGroup.getRawValue().ld_qty_rsrv,
      ld_qty_scrp: this.myGroup.getRawValue().ld_qty_scrp,
    });

    this.ldDataChanged();

    this.clearForm();
    this.searchMode = true;
  }

  clearForm() {
    this.myGroup.enable();
    this.myGroup.reset();
    this.ldAlreadyExists = false;
    this.ldFound = true;
    this.loadedLd = null;
  }

  ldDataChanged() {
    this.sortedLdData = this.ldService.getLds();
    this.dtTblService.emitDataChanged(this.sortedLdData.slice());
  }

  ngOnDestroy(): void {
    this.getItemSub.unsubscribe();
    this.sortSub.unsubscribe();
    this.rowSelectSubscription.unsubscribe();
  }
}

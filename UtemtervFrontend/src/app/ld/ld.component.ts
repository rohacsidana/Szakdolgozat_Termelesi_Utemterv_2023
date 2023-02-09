import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import * as DataTableService from '../data-table/data-table.service';
import { DataStorageService } from '../shared/data-storage.service';
import { LdService } from './ld.service';

@Component({
  selector: 'app-ld',
  templateUrl: './ld.component.html',
  styleUrls: ['./ld.component.css'],
  providers: [DataTableService.DataTableService],
})
export class LdComponent implements OnInit, OnDestroy {
  loadedLd: DataTableService.Ld;

  myGroup: FormGroup;
  ldFound: boolean = true;
  searchMode: boolean = true;
  searchedDataLoaded: boolean = false;

  newMode: boolean = false;
  editMode: boolean = false;
  ldAlreadyExists: boolean = false;
  getItemSub: Subscription;
  sortSub: Subscription;
  sortedLdData: DataTableService.Ld[];
  ldData: DataTableService.Ld[] = this.ldService.getLds();

  lastSort: Sort;
  selectedData: DataTableService.Ld;
  rowSelectSubscription: Subscription;
  ldDataChangedSub: Subscription;

  ldHeaders = [
    { name: 'ld_part', szoveg: 'Tétel' },
    { name: 'ld_expire', szoveg: 'Felhasználható' },
    { name: 'ld_qty_oh', szoveg: 'Készleten lévő mennyiség' },
    { name: 'ld_qty_rsrv', szoveg: 'Foglalt mennyiség' },
    { name: 'ld_qty_scrp', szoveg: 'Selejt mennyiség' },
  ];

  constructor(
    private ldService: LdService,
    private dtTblService: DataTableService.DataTableService,
    private formBuilder: FormBuilder,
    private dataStService: DataStorageService
  ) {
    this.sortedLdData = ldService.getLds();
  }

  ngOnInit(): void {
    this.ldDataChangedSub = this.ldService.ldDataChanged.subscribe(
      (ldData: DataTableService.Ld[]) => {
        this.ldData = ldData;
        this.sortedLdData = this.ldData.slice();
        if (!!this.lastSort) {
          this.sortData(this.lastSort);
        } else {
          this.dtTblService.dataChanged.next(this.sortedLdData.slice());
        }
      }
    );
    this.dataStService.fetchLd();
    
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
        this.myGroup = this.formBuilder.group({
          ld_part: new FormControl(
            { value: data.ld_part, disabled: true },
            Validators.required
          ),
          ld_expire: new FormControl(
            data.ld_expire.toISOString().split('T')[0]
          ),
          ld_qty_oh: new FormControl(data.ld_qty_oh, Validators.required),
          ld_qty_rsrv: new FormControl(data.ld_qty_rsrv, Validators.required),
          ld_qty_scrp: new FormControl(data.ld_qty_scrp, Validators.required),
        });
        this.ldFound = true;
        this.editMode = true;
        this.searchMode = false;
        this.newMode = false;
      }
    );
  }

  initForm() {
    this.myGroup = this.formBuilder.group({
      ld_part: new FormControl('', Validators.required),
      ld_expire: new FormControl('', Validators.required),
      ld_qty_oh: new FormControl('', Validators.required),
      ld_qty_rsrv: new FormControl('', Validators.required),
      ld_qty_scrp: new FormControl('', Validators.required),
    });
  }

  onSearchLd() {
    this.filterData(this.myGroup.value.ld_part, this.myGroup.value.ld_expire);
    this.searchedDataLoaded = true;
  }

  onDelete() {
    this.ldService.deleteLd(
      Number(this.myGroup.getRawValue().ld_part),
      new Date(this.myGroup.getRawValue().ld_expire)
    );
    console.log(
      'ld with ids: ' + Number(this.myGroup.getRawValue().ld_part),
      new Date(this.myGroup.getRawValue().ld_expire) + ' deleted'
    );

    this.ldDataChanged();
    this.clearForm();
  }

  checkLdAlreadyExists() {
    if (
      this.ldService.getLd(
        Number(this.myGroup.getRawValue().ld_part),
        new Date(this.myGroup.getRawValue().ld_expire)
      )
    ) {
      this.ldAlreadyExists = true;
    } else {
      this.ldAlreadyExists = false;
    }
  }

  onNewMode() {
    this.searchMode = false;
    this.editMode = false;
    this.newMode = true;
  }

  onSubmit() {
    this.checkLdAlreadyExists();
    let succesfulSave: boolean = this.ldService.saveLd(
      {
        ld_part: Number(this.myGroup.getRawValue().ld_part),
        ld_expire: new Date(this.myGroup.getRawValue().ld_expire),
        ld_qty_oh: this.myGroup.getRawValue().ld_qty_oh,
        ld_qty_rsrv: this.myGroup.getRawValue().ld_qty_rsrv,
        ld_qty_scrp: this.myGroup.getRawValue().ld_qty_scrp,
      },
      this.newMode ? 'new' : 'edit'
    );
    if (!succesfulSave) {
      this.ldAlreadyExists = true;
    }
    this.ldDataChanged();
    this.clearForm();
  }

  clearForm() {
    this.myGroup.enable();
    this.myGroup.reset();
    this.ldAlreadyExists = false;
    this.ldFound = false;
    this.loadedLd = null;
    this.searchedDataLoaded = false;

    this.sortedLdData = this.ldData;
    this.ldDataChanged();

    //keresés módra állítás
    this.newMode = false;
    this.editMode = false;
    this.searchMode = true;
  }

  ldDataChanged() {
    this.sortedLdData = this.ldData;
    this.dtTblService.emitDataChanged(this.sortedLdData.slice());
  }

  filterData(part: number, expire?: Date) {
    console.log('filter args: ', part, expire);

    const data = this.sortedLdData.slice();

    const results = data.filter((value) => {
      let filteredSearch = false;
      if (part) {
        let partFilter = part.toString();
        filteredSearch = value.ld_part.toString() == partFilter;
      }
      if (
        /* new Date(expire).toString() != 'Invalid Date' */ expire &&
        filteredSearch
      ) {
        let expDateFilter = new Date(expire).toString();
        filteredSearch = value.ld_expire.toString() == expDateFilter;
      }

      return filteredSearch;
    });

    this.dtTblService.emitDataChanged(results.slice());
  }

  ngOnDestroy(): void {
    this.getItemSub.unsubscribe();
    this.sortSub.unsubscribe();
    this.rowSelectSubscription.unsubscribe();
    this.ldDataChangedSub.unsubscribe();
  }

  sortData(sort: Sort) {
    const data = this.ldData;
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
        case 'ld_qty_scrp':
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
}

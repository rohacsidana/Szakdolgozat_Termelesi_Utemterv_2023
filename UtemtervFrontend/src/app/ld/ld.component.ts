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
import { Ld } from '../shared/interfaces';
import { LdService } from './ld.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-ld',
  templateUrl: './ld.component.html',
  providers: [DataTableService.DataTableService],
})
export class LdComponent implements OnInit, OnDestroy {
  loadedLd: Ld;
  error: string;
  errorSub: Subscription;

  myGroup: FormGroup;
  ldFound: boolean = true;

  searchMode: boolean = true;
  searchedDataLoaded: boolean = false;

  newMode: boolean = false;
  editMode: boolean = false;
  getItemSub: Subscription;
  sortSub: Subscription;
  sortedLdData: Ld[];
  ldData: Ld[] = this.ldService.getLds();

  lastSort: Sort;
  selectedData: Ld;
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
    this.errorSub = this.ldService.error.subscribe((error: string) => {
      this.error = error;
    });

    this.ldDataChangedSub = this.ldService.ldDataChanged.subscribe(
      (ldData: Ld[]) => {
        this.ldData = ldData;
        this.sortedLdData = this.ldData.slice();
        if (!!this.lastSort) {
          this.sortData(this.lastSort);
        } else {
          this.dtTblService.emitDataChanged(this.sortedLdData.slice());
        }
      }
    );
    this.dataStService.fetchLds();

    this.getItemSub = this.dtTblService.getData.subscribe(() => {
      this.dtTblService.emitDataChanged(this.sortedLdData.slice());
    });
    this.dtTblService.emitDataChanged(this.sortedLdData.slice());
    this.sortSub = this.dtTblService.sortData.subscribe((sort: Sort) => {
      this.sortData(sort);
    });
    this.initForm();

    this.rowSelectSubscription = this.dtTblService.selectRow.subscribe(
      (data: Ld) => {
        let tempDate = new Date(data.ld_expire);
        tempDate = new Date(tempDate.setDate(tempDate.getDate() + 1));
        this.myGroup = this.formBuilder.group({
          ld_part: new FormControl(
            { value: data.ld_part, disabled: true },
            Validators.required
          ),
          ld_expire: new FormControl({
            value: tempDate.toISOString().split('T')[0],
            disabled: true,
          }),
          ld_qty_oh: new FormControl(data.ld_qty_oh, Validators.required),
          ld_qty_rsrv: new FormControl(
            { value: data.ld_qty_rsrv, disabled: true },
            Validators.required
          ),
          ld_qty_scrp: new FormControl(
            { value: data.ld_qty_scrp, disabled: false },
            Validators.required
          ),
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
      ld_expire: new FormControl(
        { value: '', disabled: this.searchMode ? true : false },
        Validators.required
      ),
      ld_qty_oh: new FormControl(
        { value: '', disabled: this.searchMode ? true : false },
        Validators.required
      ),
      ld_qty_rsrv: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      ld_qty_scrp: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
    });
  }

  onSearchLd() {
    this.filterData(this.myGroup.value.ld_part);
  }

  onDelete() {
    this.dataStService.deleteLd(
      Number(this.myGroup.getRawValue().ld_part),
      new Date(this.myGroup.getRawValue().ld_expire)
    );
    console.log(
      'delete ld with ids: ' + Number(this.myGroup.getRawValue().ld_part),
      new Date(this.myGroup.getRawValue().ld_expire) + ' deleted'
    );

    this.ldDataChanged();
    this.searchMode = true;
    this.editMode = false;
    this.newMode = false;
    this.clearForm();
  }

  onNewMode() {
    this.newMode = true;
    this.searchMode = false;
    this.editMode = false;
    this.clearForm();
  }

  onSubmit() {
    this.dataStService.newLd({
      ld_part: Number(this.myGroup.getRawValue().ld_part),
      ld_expire: new Date(this.myGroup.getRawValue().ld_expire),
      ld_qty_oh: this.myGroup.getRawValue().ld_qty_oh,
      ld_qty_rsrv: 0,
      ld_qty_scrp: this.myGroup.getRawValue().ld_qty_scrp
        ? this.myGroup.getRawValue().ld_qty_scrp
        : 0,
    });
    //this.ldDataChanged();
    this.searchMode = true;
    this.editMode = false;
    this.newMode = false;
    this.clearForm();
  }

  onUpdate() {
    this.dataStService.updateLd({
      ld_part: Number(this.myGroup.getRawValue().ld_part),
      ld_expire: new Date(this.myGroup.getRawValue().ld_expire),
      ld_qty_oh: this.myGroup.getRawValue().ld_qty_oh,
      ld_qty_rsrv: this.myGroup.getRawValue().ld_qty_rsrv,
      ld_qty_scrp: this.myGroup.getRawValue().ld_qty_scrp,
    });
    this.ldDataChanged();
    this.searchMode = true;
    this.editMode = false;
    this.newMode = false;
    this.clearForm();
  }

  onScrap() {
    this.dataStService
      .scrapLd()
      .pipe(
        tap({
          next: () => {
            this.dataStService.fetchLds();
          },
          error: (error) => {
            console.error(error.error);
          },
        })
      )
      .subscribe();
  }

  clearForm() {
    this.initForm();
    this.ldFound = false;
    this.loadedLd = null;
    this.searchedDataLoaded = false;

    this.sortedLdData = this.ldData;
    this.ldDataChanged();
  }

  ldDataChanged() {
    this.sortedLdData = this.ldData;
    this.dtTblService.emitDataChanged(this.sortedLdData.slice());
  }

  filterData(part: number) {
    //partonként keresni készletet

    const data = this.sortedLdData.slice();

    const results = data.filter((value) => {
      let filteredSearch = false;
      if (part) {
        let partFilter = part.toString();
        filteredSearch = value.ld_part.toString() == partFilter;
      }

      return filteredSearch;
    });
    this.searchedDataLoaded = true;
    this.dtTblService.emitDataChanged(results.slice());
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

  ngOnDestroy(): void {
    this.getItemSub.unsubscribe();
    this.sortSub.unsubscribe();
    this.rowSelectSubscription.unsubscribe();
    this.ldDataChangedSub.unsubscribe();
    this.errorSub.unsubscribe();
  }
}

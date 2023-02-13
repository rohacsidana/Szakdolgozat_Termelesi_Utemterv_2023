import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs-compat';
import * as DataTableService from 'src/app/data-table/data-table.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Pt } from 'src/app/shared/interfaces';
import { PartService } from './pt.service';

@Component({
  selector: 'app-pt',
  templateUrl: './pt.component.html',
  styleUrls: ['./pt.component.css'],
  providers: [DataTableService.DataTableService],
})
export class PtComponent {
  loadedPart: Pt;

  myGroup: FormGroup;
  partFound: boolean = true;
  searchMode: boolean = true;
  partAlreadyExists: boolean = false;
  sortSub: Subscription;
  sortedPartData: Pt[] = [];
  lastSort: Sort;

  partData: Pt[] = [];

  ptDataChangedSub: Subscription;
  selectedData: Pt;
  rowSelectSubscription: Subscription;

  partHeaders = [
    {
      name: 'pt_part',
      szoveg: 'Tételkód',
    },
    { name: 'pt_desc', szoveg: 'Leírás' },
    { name: 'pt_um', szoveg: 'Mértékegység' },
    { name: 'pt_qty_oh', szoveg: 'Mennyi van' },
  ];

  constructor(
    private partService: PartService,
    private dtTblService: DataTableService.DataTableService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.ptDataChangedSub = this.partService.partDataChanged.subscribe(
      (ptData: Pt[]) => {
        this.partData = ptData;
        //console.log(ptData);

        this.sortedPartData = this.partData.slice();
        if (!!this.lastSort) {
          this.sortData(this.lastSort);
        } else {
          this.dtTblService.emitDataChanged(this.sortedPartData.slice());
        }
      }
    );
    this.dataStorageService.fetchPts();

    this.dtTblService.emitDataChanged(this.sortedPartData.slice());
    this.sortSub = this.dtTblService.sortData.subscribe((sort: Sort) => {
      this.sortData(sort);
    });
    this.initForm();
    this.rowSelectSubscription = this.dtTblService.selectRow.subscribe(
      (data: Pt) => {
        this.myGroup = new FormGroup({
          pt_part: new FormControl(data.pt_part, Validators.required),
          pt_desc: new FormControl(data.pt_desc, Validators.required),
          pt_um: new FormControl(data.pt_um, Validators.required),
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
    const data = this.partService.getParts();
    if (!sort.active || sort.direction === '') {
      this.sortedPartData = data;
      this.dtTblService.emitDataChanged(this.sortedPartData.slice());
      return;
    }

    this.sortedPartData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'pt_part':
          return this.compare(a.pt_part, b.pt_part, isAsc);
        case 'pt_desc':
          return this.compare(a.pt_desc, b.pt_desc, isAsc);
        case 'pt_um':
          return this.compare(a.pt_um, b.pt_um, isAsc);
        case 'pt_qty_oh':
          return this.compare(a.pt_qty_oh, b.pt_qty_oh, isAsc);
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
    if (this.partService.getPart(this.myGroup.value.pt_part)) {
      //lekérem a beirt pt_part szerinti tételt
      this.loadedPart = this.partService.getPart(
        Number(this.myGroup.value.pt_part)
      );
      this.partFound = true;
      this.myGroup = new FormGroup({
        pt_part: new FormControl(this.loadedPart.pt_part, Validators.required),
        pt_desc: new FormControl(this.loadedPart.pt_desc, Validators.required),
        pt_um: new FormControl(this.loadedPart.pt_um, Validators.required),
      });
    } else {
      this.clearForm();
      this.partFound = false;
    }
    console.log('Part found: ' + this.partFound);
  }

  onDelete() {
    this.partService.deletePart(Number(this.myGroup.value.pt_part));
    this.partDataChanged();
    this.clearForm();
    this.loadedPart = null;
  }

  checkPartAlreadyExists() {
    if (this.partService.getPart(Number(this.myGroup.value.pt_part))) {
      this.partAlreadyExists = true;
    } else {
      this.partAlreadyExists = false;
    }
  }

  onSubmit() {
    console.log('Part already exists: ' + this.partAlreadyExists);
    this.partService.savePart({
      pt_part: Number(this.myGroup.value.pt_part),
      pt_desc: this.myGroup.value.pt_desc,
      pt_um: this.myGroup.value.pt_um,
    });
    //console.log(this.myGroup.value);
    this.partDataChanged();
    this.clearForm();
    this.searchMode = true;
  }

  clearForm() {
    this.myGroup.reset();
    this.partAlreadyExists = false;
    this.partFound = true;
    this.loadedPart = null;
  }

  partDataChanged() {
    this.sortedPartData = this.partService.getParts();
    this.dtTblService.emitDataChanged(this.sortedPartData.slice());
  }

  ngOnDestroy(): void {
    this.ptDataChangedSub.unsubscribe();
    this.sortSub.unsubscribe();
    this.rowSelectSubscription.unsubscribe();
  }
}

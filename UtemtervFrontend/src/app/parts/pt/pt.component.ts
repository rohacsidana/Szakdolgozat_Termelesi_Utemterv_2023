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

  searchMode: boolean = true;
  newMode: boolean = false;
  editMode: boolean = false;

  myGroup: FormGroup;
  partFound: boolean = true;
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
    { name: 'pt_qty_oh', szoveg: 'Készlet' },
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
          pt_part: new FormControl(
            { value: data.pt_part, disabled: true },
            Validators.required
          ),
        });
        this.onSearchPart();
      }
    );
  }

  initForm() {
    this.myGroup = new FormGroup({
      pt_part: new FormControl(
        { value: '', disabled: this.searchMode ? false : true },
        Validators.required
      ),
      pt_desc: new FormControl('', Validators.required),
      pt_um: new FormControl(
        {
          value: '',
          disabled: this.searchMode || this.editMode ? true : false,
        },
        Validators.required
      ),
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

  onEditMode() {
    this.newMode = false;
    this.editMode = true;
    this.searchMode = false;
  }

  onNewMode() {
    this.clearForm();
    this.newMode = true;
    this.editMode = false;
    this.searchMode = false;

    this.myGroup = new FormGroup({
      pt_part: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      pt_desc: new FormControl('', Validators.required),
      pt_um: new FormControl('', Validators.required),
    });
  }

  onSearchPart() {
    this.loadedPart = this.partService.getPart(
      Number(this.myGroup.value.pt_part)
    );
    console.log(this.loadedPart);

    if (this.loadedPart) {
      this.partFound = true;
      this.onEditMode();
      //lekérem a beirt pt_part szerinti tételt
      this.myGroup = new FormGroup({
        pt_part: new FormControl(
          { value: this.loadedPart.pt_part, disabled: true },
          Validators.required
        ),
        pt_desc: new FormControl(this.loadedPart.pt_desc, Validators.required),
        pt_um: new FormControl(
          { value: this.loadedPart.pt_um, disabled: true },
          Validators.required
        ),
      });
    } else {
      this.clearForm();
      this.partFound = false;
    }
  }

  onDelete() {
    this.dataStorageService.deletePt(
      Number(this.myGroup.getRawValue().pt_part)
    );
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
    if (this.editMode) {
      this.dataStorageService.updatePt({
        pt_part: this.myGroup.getRawValue().pt_part,
        pt_desc: this.myGroup.value.pt_desc,
        pt_um: this.myGroup.getRawValue().pt_um,
      });
    } else if (this.newMode) {
      this.dataStorageService.newPt({
        pt_desc: this.myGroup.value.pt_desc,
        pt_um: this.myGroup.value.pt_um,
      });
    }
    this.partDataChanged();
    this.clearForm();
  }

  clearForm() {
    this.partFound = true;
    //keresés módra állítás
    this.searchMode = true;
    this.editMode = false;
    this.newMode = false;
    this.initForm();
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

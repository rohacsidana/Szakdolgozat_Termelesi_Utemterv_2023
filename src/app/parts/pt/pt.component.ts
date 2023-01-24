import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs-compat';
import * as DataTableService from 'src/app/data-table/data-table.service';
import { PartService } from './pt.service';

@Component({
  selector: 'app-pt',
  templateUrl: './pt.component.html',
  styleUrls: ['./pt.component.css'],
  providers: [PartService, DataTableService.DataTableService],
})
export class PtComponent {
  loadedPart: DataTableService.Pt;

  myGroup: FormGroup;
  partFound: boolean = true;
  searchMode: boolean = true;
  partAlreadyExists: boolean = false;
  getItemSub: Subscription;
  sortSub: Subscription;
  sortedPartData: DataTableService.Pt[];

  selectedData: DataTableService.Pt;
  rowSelectSubscription: Subscription;

  partHeaders = [
    {
      name: 'pt_part',
      szoveg: 'Tételkód',
    },
    { name: 'pt_desc', szoveg: 'Leírás' },
    { name: 'pt_um', szoveg: 'Mértékegység' },
  ];

  constructor(
    private partService: PartService,
    private dtTblService: DataTableService.DataTableService
  ) {
    this.sortedPartData = partService.getParts();
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
      (data: DataTableService.Pt) => {
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
    this.getItemSub.unsubscribe();
    this.sortSub.unsubscribe();
    this.rowSelectSubscription.unsubscribe();
  }
}

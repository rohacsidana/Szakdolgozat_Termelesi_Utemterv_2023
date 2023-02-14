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
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Ps, psDisplay, Pt } from 'src/app/shared/interfaces';
import { PartService } from '../pt/pt.service';
import { PartStrService } from './ps.service';

@Component({
  selector: 'app-ps',
  templateUrl: './ps.component.html',
  styleUrls: ['./ps.component.css'],
  providers: [DataTableService.DataTableService],
})
export class PsComponent {
  loadedPartStr: Ps;

  myGroup: FormGroup;
  partStrFound: boolean = true;
  searchMode: boolean = true;
  newMode: boolean = false;
  partStrAlreadyExists: boolean = false;

  sortSub: Subscription;
  partStrData: psDisplay[] = [];
  lastSort: Sort;

  originalPartStrData: Ps[] = [];
  partStrDataChangedSub: Subscription;
  partData: Pt[] = [];
  ptDataChangedSub: Subscription;

  selectedData: Ps;
  rowSelectSubscription: Subscription;

  partStrHeaders = [
    {
      name: 'ps_par',
      szoveg: 'Szülő',
    },
    {
      name: 'ps_par_name',
      szoveg: 'Szülő neve',
    },
    {
      name: 'ps_comp_name',
      szoveg: 'Beépülő',
    },
    {
      name: 'ps_comp',
      szoveg: 'Beépülő neve',
    },
    {
      name: 'ps_qty_per',
      szoveg: 'Beépülő mennyiség',
    },
  ];

  constructor(
    private partStrService: PartStrService,
    private partService: PartService,
    private dtTblService: DataTableService.DataTableService,
    private formBuilder: FormBuilder,
    private dataStorageService: DataStorageService
  ) {
    this.partStrData = this.psDataTransform(partStrService.getPartStrs());
  }

  ngOnInit(): void {
    this.partData = this.partService.getParts();
    //console.log(this.partStrData);
    this.ptDataChangedSub = this.partService.partDataChanged.subscribe(
      (partData: Pt[]) => {
        this.partData = partData;
      }
    );

    this.partStrDataChangedSub =
      this.partStrService.partStrDataChanged.subscribe((psData: Ps[]) => {
        this.originalPartStrData = psData;
        this.partStrData = this.psDataTransform(
          this.originalPartStrData.slice()
        );

        if (!!this.lastSort) {
          this.sortData(this.lastSort);
        } else {
          this.partStrDataChanged();
        }
        this.partStrDataChanged();
      });
    this.dataStorageService.fetchPsS();

    this.sortSub = this.dtTblService.sortData.subscribe((sort: Sort) => {
      this.sortData(sort);
    });
    this.initForm();
    this.rowSelectSubscription = this.dtTblService.selectRow.subscribe(
      (data: Ps) => {
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
    const data = this.psDataTransform(this.partStrService.getPartStrs());
    if (!sort.active || sort.direction === '') {
      this.partStrDataChanged();
    }

    this.partStrData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'ps_par':
          return this.compare(a.ps_par, b.ps_par, isAsc);
        case 'ps_par_name':
          return this.compare(a.ps_par_name, b.ps_par_name, isAsc);
        case 'ps_comp':
          return this.compare(a.ps_comp, b.ps_comp, isAsc);
        case 'ps_comp_name':
          return this.compare(a.ps_comp_name, b.ps_comp_name, isAsc);
        case 'ps_qty_per':
          return this.compare(a.ps_qty_per, b.ps_qty_per, isAsc);
        default:
          return 0;
      }
    });
    this.partStrDataChanged();
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
    this.dataStorageService.deletePs(
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
    let psInput = {
      ps_par: Number(this.myGroup.getRawValue().ps_par),
      ps_comp: Number(this.myGroup.getRawValue().ps_comp),
      ps_qty_per: Number(this.myGroup.value.ps_qty_per),
    };
    //this.partStrData[0].ps_qty_per = 100;

    this.dataStorageService.newPs(psInput).subscribe();

    this.partStrDataChanged();
    this.clearForm();
    this.searchMode = true;
  }

  onUpdate() {
    let psInput = {
      ps_par: Number(this.myGroup.getRawValue().ps_par),
      ps_comp: Number(this.myGroup.getRawValue().ps_comp),
      ps_qty_per: Number(this.myGroup.value.ps_qty_per),
    };

    this.dataStorageService.updatePs(psInput);
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
    //console.log(this.partStrService.getPartStrs());

    this.partStrData = this.psDataTransform(this.partStrService.getPartStrs());
    this.dtTblService.emitDataChanged(this.partStrData.slice());
  }

  ngOnDestroy(): void {
    this.sortSub.unsubscribe();
    this.rowSelectSubscription.unsubscribe();
  }
  
  getPartName(part: number): string {
    let i = 0;
    while (i < this.partData.length && this.partData[i].pt_part !== part) {
      i++;
    }
    if (i < this.partData.length) {
      return this.partData[i].pt_desc;
    } else {
      return '';
    }
  }

  psDataTransform(psData: Ps[]): psDisplay[] {
    /*
    console.log('------DISPLAYING DATA TO DISPLAY PS');
    console.log('original data:');
    console.log(psData); */

    let transformedData: psDisplay[] = [];
    for (let i = 0; i < psData.length; i++) {
      transformedData.push({
        ps_par: psData[i].ps_par,
        ps_comp_name: this.getPartName(psData[i].ps_par),
        ps_comp: psData[i].ps_comp,
        ps_par_name: this.getPartName(psData[i].ps_comp),
        ps_qty_per: psData[i].ps_qty_per,
      });
    }
    /*
    console.log('transformed data:');
    console.log(transformedData); */
    return transformedData;
  }
}

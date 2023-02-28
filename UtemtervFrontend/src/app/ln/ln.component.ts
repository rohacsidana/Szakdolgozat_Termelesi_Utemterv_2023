import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataTableService } from '../data-table/data-table.service';
import { LnService } from './ln.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Ln } from '../shared/interfaces';

@Component({
  selector: 'app-ln',
  templateUrl: './ln.component.html',
  styleUrls: ['./ln.component.css'],
  providers: [DataTableService, DataStorageService],
})
export class LnComponent implements OnInit, OnDestroy {
  line: string = '';
  desc: string = '';
  search: string = ''
  lnUsed = false
  errorMessage: string

  newLn = false;
  edit = false;
  deleteLn = false;
  validForm = true;
  successSearch = true

  lnHeaders = [
    { name: 'ln_line', szoveg: 'Gyártósor azonosító' },
    { name: 'ln_desc', szoveg: 'Gyártósor leírása' },
  ];

  lines: Ln[];
  selectedLine: Ln;
  getSub: Subscription;
  selectSub: Subscription;
  errorSub: Subscription;


  constructor(
    private lnService: LnService,
    private dtService: DataTableService,
    private dsService: DataStorageService
  ) { }

  ngOnInit(): void {
    //this.dsService.fetchGyartosorok();

    this.lines = this.lnService.getLines();
    //console.log(this.lines);
    
    this.dtService.emitDataChanged(this.lines.slice());
    /* A data-table-ben figyeli a változást */
    this.getSub = this.lnService.lnChanged.subscribe((data) => {
      this.lines = data.slice();
      this.dtService.emitDataChanged(this.lines.slice());
    });

    this.errorSub = this.lnService.errorMsgChanged.subscribe((errorMsg) => {
      this.validForm = false;
      this.errorMessage = errorMsg;
      console.log(this.errorMessage);
    });

    /* Visszaadja a kiválasztott sort kattintásra */
    this.selectSub = this.dtService.selectRow.subscribe((data: Ln) => {
      this.selectedLine = data;
      this.onEditStarted();
      console.log('kiválasztottad ezt:');
      console.log(this.selectedLine);
    });
    this.errorMessage = 'Ismeretlen hiba történt'
  }

  ngOnDestroy(): void {
    this.getSub.unsubscribe();
    this.selectSub.unsubscribe();
    this.errorSub.unsubscribe();
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    //console.log(value);

    if (this.deleteLn) {
      this.onDeleteLine(form);
    }
    if (this.newLn) {
      this.onNewLn(form);
    }
    if (this.edit && !this.deleteLn) {
      this.onEditLine(form);
    }
  }

  onEditStarted() {
    this.edit = true;
    this.newLn = false;
    this.deleteLn = false;

    this.line = this.selectedLine.ln_line;
    this.desc = this.selectedLine.ln_desc;
  }

  onEditLine(form: NgForm) {
    let d = form.value.descInput

    this.dsService.updateLn({ ln_line: this.selectedLine.ln_line, ln_desc: d })
    this.clearForm(form)

  }

  onDeleteLine(form: NgForm) {
    //this.lnService.deleteLine(this.selectedLine.ln_line);
    this.dsService.deleteLn(this.selectedLine.ln_line)
    this.clearForm(form)
    

    //this.lnExistsError(form)
    /* console.log(this.selectedLine.ln_line);
    console.log('lines:');
    console.log(this.lines);
    console.log('getLines:');
    console.log(this.lnService.getLines()); */
  }

  clearForm(form: NgForm) {
    this.line = '';
    this.desc = '';
    this.errorMessage = 'Ismeretlen hiba történt'
    this.newLn = false;
    this.edit = false;
    this.deleteLn = false;
    this.validForm = true;
    this.lnUsed = false
    this.successSearch = true
    form.resetForm();
  }

  onNewLn(form: NgForm) {
    let value = form.value;
    let lnExists = this.lnService.doesLnExist(value.azonInput);
    let l = value.azonInput;
    let d = value.descInput;

    if (!d) {
      d = ''
    }

    if (!lnExists) {
      let newLn = { ln_line: l, ln_desc: d };
      //console.log(newLn);

      //this.lnService.newLine(newLn)
      this.dsService.newLn(newLn);
      this.clearForm(form);
    } else {
      this.errorMessage = 'Már létezik ilyen azonosító!'
      this.validForm = false;
    }
  }

  onSearch(form: NgForm) {
    let i = this.lnService.getLnIndex(form.value.searchInput)
    console.log(i);
    if (i >= 0) {
      this.selectedLine = this.lines[i]
      this.successSearch = true
      this.onEditStarted()
    } else {
      this.successSearch = false
      this.validForm = false
      this.errorMessage = 'Nem található ilyen gyártósor'
    }
  }
}

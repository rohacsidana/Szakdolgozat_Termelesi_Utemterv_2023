import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataTableService } from '../data-table/data-table.service';
import { Lnd, Ln, Pt } from '../shared/interfaces';
import { LndService } from './lnd.service';
import { DataStorageService } from '../shared/data-storage.service';
import { LnService } from '../ln/ln.service';
import { PartService } from '../parts/pt/pt.service';

@Component({
  selector: 'app-lnd',
  templateUrl: './lnd.component.html',
  providers: [DataTableService, DataStorageService],
})
export class LndComponent implements OnInit, OnDestroy {
  edit = false;
  validForm = true;
  deleteLnd = false;
  newLnd = false;
  successSearch = true;

  line: string;
  part: number;
  rate: number;
  errorMessage: string;
  searchLine: string = '';
  searchPart: string = '';

  lndHeaders = [
    { name: 'lnd_line', szoveg: 'Gyártósor azonosító' },
    { name: 'lnd_part', szoveg: 'Tétel' },
    { name: 'lnd_rate', szoveg: 'Mennyiség/óra' },
  ];

  getSub: Subscription;
  selectSub: Subscription;
  lnChangedSub: Subscription;
  ptChangedSub: Subscription;
  errorSub: Subscription;
  rates: Lnd[];
  lns: Ln[];
  lines: string[];
  parts: Pt[];
  selectedLnd: Lnd;

  constructor(
    private dtService: DataTableService,
    private lndService: LndService,
    private dsService: DataStorageService,
    private lnService: LnService,
    private ptService: PartService
  ) { }

  ngOnInit(): void {
    /* console.log(this.lnService.doesLnExist('ln_1'));
    console.log(this.lnService.getLines()); */

    this.lns = this.lnService.getLines();
    this.parts = this.ptService.getParts();

    this.dsService.fetchLnds();

    this.lnChangedSub = this.lnService.lnChanged.subscribe((data: Ln[]) => {
      this.lns = data.slice();
    });

    this.ptChangedSub = this.ptService.partDataChanged.subscribe((data) => {
      this.parts = data.slice();
    });

    this.errorSub = this.lndService.errorMsgChanged.subscribe((errorMsg) => {
      this.validForm = false;
      this.errorMessage = errorMsg;
      console.log(this.errorMessage);
    });

    this.rates = this.lndService.getRates();
    this.dtService.emitDataChanged(this.rates.slice());
    /* A data-table-ben figyeli a változást */
    this.getSub = this.lndService.lndChanged.subscribe((data) => {
      this.rates = data.slice();
      this.dtService.emitDataChanged(this.rates.slice());
    });

    /* Visszaadja a kiválasztott sort kattintásra */
    this.selectSub = this.dtService.selectRow.subscribe((data: Lnd) => {
      this.selectedLnd = data;
      this.editStarted();
      console.log('kiválasztottad ezt:');
      console.log(this.selectedLnd);
    });

    this.errorMessage = 'Ismeretlen hiba történt!';
  }

  ngOnDestroy(): void {
    this.getSub.unsubscribe();
    this.selectSub.unsubscribe();
    this.lnChangedSub.unsubscribe();
    this.ptChangedSub.unsubscribe();
    this.errorSub.unsubscribe();
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    console.log(value);

    if (this.newLnd) {
      this.onNewLnd(form);
    }
    if (this.edit && !this.deleteLnd) {
      this.editLnd(form);
    }
    if (this.deleteLnd) {
      this.onDeleteLnd(form);
    }
  }

  clearForm(form: NgForm) {
    this.newLnd = false;
    this.edit = false;
    this.deleteLnd = false;
    this.validForm = true;
    this.line = '';
    this.part = null;
    this.rate = null;
    this.successSearch = true
    form.resetForm();
  }

  onNewLnd(form: NgForm) {
    this.validForm = true;
    let value = form.value;
    let l = value.lineInput;
    let p = value.partInput;
    let r = value.rateInput;

    //---------hibaüzenetek-----------
    if (!this.lnService.doesLnExist(l)) {
      this.errorMessage = 'Nem létezik ilyen gyártósor!';
      this.validForm = false;
    }

    if (!this.ptService.getPart(p)) {
      this.errorMessage = 'Nem létezik ilyen tétel!';
      this.validForm = false;
    }

    if (this.lndService.doesLndExist(l, p)) {
      //this.lndService.newRate({ lnd_line: l, lnd_part: p, lnd_rate: r });
      this.errorMessage = `Már szerepel a(z) "${l}" gyártósor "${p}" tétellel!`;
      this.validForm = false;
    }

    //lnd felvétele, ha nincs hiba
    if (this.validForm) {
      this.dsService.newLnd({ lnd_line: l, lnd_part: p, lnd_rate: r });
      this.clearForm(form);
    }
  }

  editStarted() {
    this.validForm = true;
    this.edit = true;
    this.newLnd = false;
    this.deleteLnd = false;

    this.line = this.selectedLnd.lnd_line;
    this.part = this.selectedLnd.lnd_part;
    this.rate = this.selectedLnd.lnd_rate;
  }

  editLnd(form: NgForm) {
    let value = form.value;
    let l = value.lineInput;
    let p = value.partInput;
    let r = value.rateInput;

    /* this.lndService.editLnd(
      this.selectedLnd.lnd_line,
      this.selectedLnd.lnd_part,
      { lnd_line: l, lnd_part: p, lnd_rate: r }
    ); */
    this.dsService.updateLnd({
      lnd_line: this.selectedLnd.lnd_line,
      lnd_part: this.selectedLnd.lnd_part,
      lnd_rate: r,
    });
    //this.lndService.editLnd(this.selectedLnd)
    this.clearForm(form);
  }

  onDeleteLnd(form: NgForm) {
    /*this.lndService.deleteLine(
      this.selectedLnd.lnd_line,
      this.selectedLnd.lnd_part
    );*/
    this.dsService.deleteLnd(this.selectedLnd);
    this.clearForm(form);
  }

  onSearch(form: NgForm) {
    let i = this.lndService.getLndIndex(form.value.searchInputLine, form.value.searchInputPart)
    //let i = this.lndService.getLndIndex('line_01', 1000)
    
    if (i >= 0) {
      this.selectedLnd = this.rates[i]
      this.successSearch = true
      this.editStarted()
    } else {
      this.successSearch = false
      this.validForm = false
      this.errorMessage = 'Nem található ilyen gyártási sebesség!'
    }
  }
}

import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { DataTableService } from '../data-table/data-table.service';
import { ChgService } from './chg.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Chg, Ln, Pt } from '../shared/interfaces';
import { LnService } from '../ln/ln.service';
import { PartService } from '../parts/pt/pt.service';

@Component({
  selector: 'app-chg',
  templateUrl: './chg.component.html',
  providers: [DataTableService, DataStorageService],
})
export class ChgComponent {
  newChg = false;
  edit = false;
  deleteChg = false;
  validForm = true;
  successSearch = true;

  line: string;
  from: number;
  to: number;
  time: string;
  errorMessage: string;
  search: string = '';

  chgHeaders = [
    { name: 'chg_line', szoveg: 'Gyártósor azonosító' },
    { name: 'chg_from', szoveg: 'Tételről' },
    { name: 'chg_to', szoveg: 'Tételre' },
    { name: 'chg_time', szoveg: 'Átállási idő' },
  ];

  changeTimes: Chg[];
  lns: Ln[];
  lines: string[];
  parts: Pt[];
  selectedChg: Chg;
  getSub: Subscription;
  selectSub: Subscription;
  lnChangedSub: Subscription;
  ptChangedSub: Subscription;
  errorSub: Subscription;

  constructor(
    private chgService: ChgService,
    private dtService: DataTableService,
    private dsService: DataStorageService,
    private lnService: LnService,
    private ptService: PartService
  ) {}

  ngOnInit(): void {
    this.lns = this.lnService.getLines();
    this.parts = this.ptService.getParts();

    this.dsService.fetchChgs();

    this.lnChangedSub = this.lnService.lnChanged.subscribe((data: Ln[]) => {
      this.lns = data.slice();
    });

    this.ptChangedSub = this.ptService.partDataChanged.subscribe((data) => {
      this.parts = data.slice();
    });

    this.errorSub = this.chgService.errorMsgChanged.subscribe((errorMsg) => {
      this.validForm = false;
      this.errorMessage = errorMsg;
      console.log(this.errorMessage);
    });

    this.changeTimes = this.chgService.getChangeTimes();
    this.dtService.emitDataChanged(this.changeTimes.slice());
    /* A data-table-ben figyeli a változást */
    this.getSub = this.chgService.chgChanged.subscribe((data) => {
      this.changeTimes = data.slice();
      this.dtService.emitDataChanged(this.changeTimes.slice());
    });

    /* Visszaadja a kiválasztott sort kattintásra */
    this.selectSub = this.dtService.selectRow.subscribe((data: Chg) => {
      this.selectedChg = data;
      this.editStarted();
      console.log('kiválasztottad ezt:');
      console.log(this.selectedChg);
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

    if (this.newChg) {
      this.onNewChg(form);
    }
    if (this.edit && !this.deleteChg) {
      this.onEditChg(form);
    }
    if (this.deleteChg) {
      this.onDeleteChg(form);
    }
  }

  editStarted() {
    this.edit = true;
    this.newChg = false;

    this.line = this.selectedChg.chg_line;
    this.from = this.selectedChg.chg_from;
    this.to = this.selectedChg.chg_to;
    this.time = this.selectedChg.chg_time;
  }

  clearForm(form: NgForm) {
    form.resetForm();
    this.newChg = false;
    this.edit = false;
    this.deleteChg = false;
    this.validForm = true;
    this.line = '';
    this.from = null;
    this.to = null;
    this.time = '';
  }

  onNewChg(form: NgForm) {
    this.validForm = true;
    let value = form.value;
    let l = value.lineInput;
    let f = value.fromInput;
    let to = value.toInput;
    let time = value.timeInput;

    /* console.log(typeof time);
    console.log(time); */

    if (!this.lnService.doesLnExist(l)) {
      this.errorMessage = 'Nem létezik ilyen gyártósor!';
      this.validForm = false;
    }

    if (!this.ptService.getPart(f)) {
      this.errorMessage = `Nem létezik "${f}" tétel!`;
      this.validForm = false;
    }

    if (!this.ptService.getPart(to)) {
      this.errorMessage = `Nem létezik "${to}" tétel!`;
      this.validForm = false;
    }

    if (f === to) {
      this.errorMessage = 'Nem adhat meg két egyforma tételt!';
      this.validForm = false;
    }

    if (
      this.chgService.doesChgExist(l, f, to) ||
      this.chgService.doesChgExist(l, to, f)
    ) {
      this.errorMessage = 'Már van ilyen átállás!';
      this.validForm = false;
    }

    if (this.validForm) {
      this.dsService.newChg({
        chg_line: l,
        chg_from: f,
        chg_to: to,
        chg_time: time,
      });

      if (this.validForm) {
        this.clearForm(form);
      }
    }
  }

  onModositClick() {
    this.edit = true;
    this.newChg = false;
  }

  onEditChg(form: NgForm) {
    let value = form.value;
    let l = value.lineInput;
    let f = value.fromInput;
    let to = value.toInput;
    let time = value.timeInput;

    this.dsService.updateChg({
      chg_line: this.selectedChg.chg_line,
      chg_from: this.selectedChg.chg_from,
      chg_to: this.selectedChg.chg_to,
      chg_time: time + ':00',
    });
    /* this.chgService.editChg(
      this.selectedChg.chg_line,
      this.selectedChg.chg_from,
      this.selectedChg.chg_to,
      { chg_line: l, chg_from: f, chg_to: to, chg_time: time }
    ); */
    this.clearForm(form);
  }

  onDeleteChg(form: NgForm) {
    this.dsService.deleteChg(this.selectedChg);
    /* this.chgService.deleteChg(
      this.selectedChg.chg_line,
      this.selectedChg.chg_from,
      this.selectedChg.chg_to
    ); */
    this.clearForm(form);
  }
}

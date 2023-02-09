import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataTableService } from '../data-table/data-table.service';
import { Lnd } from '../shared/interfaces';
import { LndService } from './lnd.service';

@Component({
  selector: 'app-lnd',
  templateUrl: './lnd.component.html',
  styleUrls: ['./lnd.component.css'],
  providers: [DataTableService, LndService],
})
export class LndComponent implements OnInit, OnDestroy {
  edit = false;
  validForm = true;
  deleteLnd = false;

  line: string;
  part: number;
  rate: number;

  newLnd = false;

  lndHeaders = [
    { name: 'lnd_line', szoveg: 'Gyártósor azonosító' },
    { name: 'lnd_part', szoveg: 'Tétel' },
    { name: 'lnd_rate', szoveg: 'Mennyiség/óra' },
  ];

  getSub: Subscription;
  selectSub: Subscription;
  rates: Lnd[];
  selectedLnd: Lnd;

  constructor(
    private dtService: DataTableService,
    private lndService: LndService
  ) {}

  ngOnInit(): void {
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
  }

  ngOnDestroy(): void {
    this.getSub.unsubscribe();
    this.selectSub.unsubscribe();
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    console.log(value);

    if (this.newLnd) {
      this.onNewLnd(form);
    }
    if (this.edit) {
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
    form.resetForm();
  }

  onNewLnd(form: NgForm) {
    let value = form.value;
    let l = value.lineInput;
    let p = value.partInput;
    let r = value.rateInput;

    if (!this.lndService.doesLndExist(l, p)) {
      this.lndService.newRate({ lnd_line: l, lnd_part: p, lnd_rate: r });
      this.clearForm(form);
    } else {
      this.validForm = false;
    }
    console.log(this.lndService.getRates());
  }

  editStarted() {
    this.edit = true;
    this.newLnd = false;

    this.line = this.selectedLnd.lnd_line;
    this.part = this.selectedLnd.lnd_part;
    this.rate = this.selectedLnd.lnd_rate;
  }

  editLnd(form: NgForm) {
    let value = form.value;
    let l = value.lineInput;
    let p = value.partInput;
    let r = form.value.rateInput;

    if (!this.lndService.doesLndExist(l, p)) {
      this.lndService.editLnd(
        this.selectedLnd.lnd_line,
        this.selectedLnd.lnd_part,
        { lnd_line: l, lnd_part: p, lnd_rate: r }
      );
      this.clearForm(form);
    } else {
      this.validForm = false;
    }
  }

  onDeleteLnd(form: NgForm) {
    this.lndService.deleteLine(
      this.selectedLnd.lnd_line,
      this.selectedLnd.lnd_part
    );
    this.clearForm(form);
  }
}

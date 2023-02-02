import { Component } from '@angular/core';
import { Ak } from '../ak/ak-model';
import { Subscription } from 'rxjs';
import { AkService } from '../ak/ak.service';

@Component({
  selector: 'app-ak-list',
  templateUrl: './ak-list.component.html',
  styleUrls: ['./ak-list.component.css']
})
export class AkListComponent {
  akLista: Ak[]
  akValtozas: Subscription
  keresesLine = ''
  osszes = false

  constructor(private akService: AkService) { }

  ngOnInit(): void {
    this.akLista = this.akService.getOsszAk()
    /*this.skValtozas = this.skService.skValtozas.subscribe((data)=> {
      this.skLista = data
    }) */
    this.akValtozas = this.akService.akValtozas.subscribe((data)=> {
      this.akLista = data
    })

  }

  ngOnDestroy(): void {
    this.akValtozas.unsubscribe()
  }

  onOsszes() {

  }


}

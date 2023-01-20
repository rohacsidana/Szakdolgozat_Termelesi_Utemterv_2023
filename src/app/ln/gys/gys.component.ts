import { Component } from '@angular/core';

@Component({
  selector: 'app-gys',
  templateUrl: './gys.component.html',
  styleUrls: ['./gys.component.css']
})
export class GysComponent {
  modositas = false
  gyartosorok = [
    {
      id: 1,
      desc: 'ez az első gyártósor',
    },
    {
      id: 2,
      desc: 'ez a második gyártósor',
    },
  ]

  onModositas() {
    this.modositas = !this.modositas

  }
}

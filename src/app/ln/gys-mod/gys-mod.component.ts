import { Component, OnInit } from '@angular/core';
import { Gys } from '../gys/gys.service';

@Component({
  selector: 'app-gys-mod',
  templateUrl: './gys-mod.component.html',
  styleUrls: ['./gys-mod.component.css']
})
export class GysModComponent implements OnInit {
  gyartosorok: { ln_id: string, ln_desc: string }[] = [];
  constructor(private gyartosorService: Gys) { }

  ngOnInit(): void {
    this.gyartosorok = this.gyartosorService.gyartosorok
  }

  onSzerkesztes(gyartosor: Gys) {
    console.log(gyartosor);
    
  }
}

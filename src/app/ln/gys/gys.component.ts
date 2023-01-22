import { Component, Output, EventEmitter, OnInit, Injectable } from '@angular/core';
import { Gys } from './gys.service';

@Component({
  selector: 'app-gys',
  templateUrl: './gys.component.html',
  styleUrls: ['./gys.component.css']
})
export class GysComponent implements OnInit {
  //@Output() kijeloltGys = new EventEmitter<Gys>()
  modositas = false
  gyartosorok: { ln_id: string, ln_desc: string }[] = [];

  constructor(private gyartosorokService: Gys) { }

  ngOnInit(): void {
    this.gyartosorok = this.gyartosorokService.gyartosorok
    
  }

  onModositas() {
    this.modositas = true
    //this.kijeloltGys.emit(this.gyartosorok)
  }

  onReszletek(leiras: string) {
    alert(leiras + "\n(ez nem alert box lesz később!)")
  }
}

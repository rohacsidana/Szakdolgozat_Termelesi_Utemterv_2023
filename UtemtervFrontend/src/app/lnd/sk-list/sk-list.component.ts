import { Component, OnInit, OnDestroy } from '@angular/core';
import { Sk } from '../sk/sk-model';
import { SkService } from '../sk/sk.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sk-list',
  templateUrl: './sk-list.component.html',
  styleUrls: ['./sk-list.component.css'],
  
})
export class SkListComponent implements OnInit, OnDestroy {
  skLista: Sk[]
  skValtozas: Subscription

  constructor(private skService: SkService) { }

  ngOnInit(): void {
    this.skLista = this.skService.getOsszSk()
    this.skValtozas = this.skService.skValtozas.subscribe((data)=> {
      this.skLista = data
    })

  }

  ngOnDestroy(): void {
    this.skValtozas.unsubscribe()
  }


}

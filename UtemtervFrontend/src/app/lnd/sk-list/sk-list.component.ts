import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-sk-list',
  templateUrl: './sk-list.component.html',
  styleUrls: ['./sk-list.component.css']
})
export class SkListComponent implements OnInit, OnDestroy {
  skLista = [
    {
      gys: 'gys1',
      tetel: 'tétel1',
      seb: '20',      
    },
    {
      gys: 'gys2',
      tetel: 'tétel2',
      seb: '30',      
    },
    {
      gys: 'gys2',
      tetel: 'tétel2',
      seb: '40',      
    }
  ]

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }


}

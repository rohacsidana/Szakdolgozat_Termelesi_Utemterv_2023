import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-sk',
  templateUrl: './sk.component.html',
  styleUrls: ['./sk.component.css']
})
export class SkComponent implements OnInit, OnDestroy {
  @Input() sk: {gys: string, tetel: string, seb: string}

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }


}

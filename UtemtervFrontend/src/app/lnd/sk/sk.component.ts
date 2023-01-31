import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Sk } from './sk-model';
import { SkService } from './sk.service';

@Component({
  selector: 'app-sk',
  templateUrl: './sk.component.html',
  styleUrls: ['./sk.component.css'],
})
export class SkComponent implements OnInit, OnDestroy {
  @Input() sk: Sk

  constructor(private skService: SkService) { }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }

  onSzerkesztes() {
    //console.log(this.sk);
    
    this.skService.kivalasztottSk.emit(this.sk)

    
  }


}

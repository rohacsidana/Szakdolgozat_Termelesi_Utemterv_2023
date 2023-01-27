import {
  Component,
  OnInit,
  Input,
  OnDestroy,
} from '@angular/core';
import { GysService } from './gys.service';
import { Gys } from './gys-model';

@Component({
  selector: 'app-gys',
  templateUrl: './gys.component.html',
  styleUrls: ['./gys.component.css'],
})
export class GysComponent implements OnInit, OnDestroy {
  @Input() gyartosor: Gys;

  constructor(private gysService: GysService) { }

  ngOnInit(): void {

  }

  onTeszt() {


  }

  ngOnDestroy(): void {

  }

  onReszletek(leiras: string) {
    //alert(leiras + '\n(ez nem alert box lesz később!)');
    this.gysService.kivalasztottGys.emit(this.gyartosor)
  }
}

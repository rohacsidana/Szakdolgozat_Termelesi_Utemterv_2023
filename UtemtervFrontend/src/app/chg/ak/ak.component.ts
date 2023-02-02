import { Component, Input } from '@angular/core';
import { Ak } from './ak-model';
import { AkService } from './ak.service';

@Component({
  selector: 'app-ak',
  templateUrl: './ak.component.html',
  styleUrls: ['./ak.component.css']
})
export class AkComponent {
  @Input() ak: Ak

  constructor(private akService: AkService) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  onSzerkesztes() {
    //console.log(this.sk);

    this.akService.kivalasztottAk.emit(this.ak)

  }

}

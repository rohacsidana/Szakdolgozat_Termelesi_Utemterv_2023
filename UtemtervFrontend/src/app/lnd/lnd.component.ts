import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-lnd',
  templateUrl: './lnd.component.html',
  styleUrls: ['./lnd.component.css']
})
export class LndComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    
  }
}

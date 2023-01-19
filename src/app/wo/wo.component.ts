
import { Component } from "@angular/core";
import {NgForm} from "@angular/forms";
@Component({
    selector: 'app-wo',
    templateUrl: 'wo.component.html',
    styleUrls: ['wo.component.css']
})


export class WoComponent{
    isSearchingMode: boolean = true;

    onSubmit(form: NgForm){
        console.log(form);
        console.log(form.value);
    }

    changeMode(){
        this.isSearchingMode = !this.isSearchingMode;
    }
}
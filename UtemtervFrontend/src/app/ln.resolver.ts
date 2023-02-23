import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Ln } from './shared/interfaces';
import { LnService } from './ln/ln.service';
import { DataStorageService } from './shared/data-storage.service';

@Injectable({ providedIn: 'root' })

export class LnResolver implements Resolve<Ln[]>{
    constructor(private lnService: LnService, private dsService: DataStorageService) { }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        //console.log("ln resolver");
        
        let data = this.lnService.getLines()

        if (data.length === 0) {
            return this.dsService.fetchGyartosorok()
        } else {
            return data
        }
    }
}
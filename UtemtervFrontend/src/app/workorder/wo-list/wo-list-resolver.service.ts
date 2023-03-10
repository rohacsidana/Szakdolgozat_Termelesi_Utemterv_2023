import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { Wo } from "src/app/shared/interfaces";
import { WoService } from "../wo.service";

@Injectable({
    providedIn: 'root'
})
export class WoListResolverService implements Resolve<Wo[]>{
    constructor(
        private DataStorageService: DataStorageService,
        private woService: WoService
    ){}


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any|Wo[]{
        const woData = this.woService.getWos();
        if(woData.length === 0){
            return this.DataStorageService.fetchAllWo();
        }else{
            return woData;
        }
    }
}

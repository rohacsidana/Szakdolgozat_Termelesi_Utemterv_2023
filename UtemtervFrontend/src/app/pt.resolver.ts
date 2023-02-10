import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { PartService } from './parts/pt/pt.service';
import { DataStorageService } from './shared/data-storage.service';
import { Pt } from './shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PtResolver implements Resolve<Pt[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private ptService: PartService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    let data = this.ptService.getParts();

    if (data.length === 0) {
      return this.dataStorageService.fetchPts();
    } else {
      return data;
    }
  }
}

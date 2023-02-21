import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "./auth/auth.service";
import { LogedInUser } from "./auth/auth.service";

@Injectable({
    providedIn: "root"
})

export class AdminGuard implements CanActivate{
   
    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.user.pipe(
            take(1),
            map(user =>{
                    if(user.post === 3 ){
                        return true
                    }
                return this.router.createUrlTree(["/home"]);
            })
        );
    }
}
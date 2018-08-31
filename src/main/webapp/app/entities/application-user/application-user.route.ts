import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApplicationUser } from 'app/shared/model/application-user.model';
import { ApplicationUserService } from './application-user.service';
import { ApplicationUserComponent } from './application-user.component';
import { ApplicationUserDetailComponent } from './application-user-detail.component';
import { ApplicationUserUpdateComponent } from './application-user-update.component';
import { ApplicationUserDeletePopupComponent } from './application-user-delete-dialog.component';
import { IApplicationUser } from 'app/shared/model/application-user.model';

@Injectable({ providedIn: 'root' })
export class ApplicationUserResolve implements Resolve<IApplicationUser> {
    constructor(private service: ApplicationUserService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((applicationUser: HttpResponse<ApplicationUser>) => applicationUser.body));
        }
        return of(new ApplicationUser());
    }
}

export const applicationUserRoute: Routes = [
    {
        path: 'application-user',
        component: ApplicationUserComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.applicationUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'application-user/:id/view',
        component: ApplicationUserDetailComponent,
        resolve: {
            applicationUser: ApplicationUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.applicationUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'application-user/new',
        component: ApplicationUserUpdateComponent,
        resolve: {
            applicationUser: ApplicationUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.applicationUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'application-user/:id/edit',
        component: ApplicationUserUpdateComponent,
        resolve: {
            applicationUser: ApplicationUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.applicationUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const applicationUserPopupRoute: Routes = [
    {
        path: 'application-user/:id/delete',
        component: ApplicationUserDeletePopupComponent,
        resolve: {
            applicationUser: ApplicationUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.applicationUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationType } from 'app/shared/model/authentication-type.model';
import { AuthenticationTypeService } from './authentication-type.service';
import { AuthenticationTypeComponent } from './authentication-type.component';
import { AuthenticationTypeDetailComponent } from './authentication-type-detail.component';
import { AuthenticationTypeUpdateComponent } from './authentication-type-update.component';
import { AuthenticationTypeDeletePopupComponent } from './authentication-type-delete-dialog.component';
import { IAuthenticationType } from 'app/shared/model/authentication-type.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationTypeResolve implements Resolve<IAuthenticationType> {
    constructor(private service: AuthenticationTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((authenticationType: HttpResponse<AuthenticationType>) => authenticationType.body));
        }
        return of(new AuthenticationType());
    }
}

export const authenticationTypeRoute: Routes = [
    {
        path: 'authentication-type',
        component: AuthenticationTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.authenticationType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'authentication-type/:id/view',
        component: AuthenticationTypeDetailComponent,
        resolve: {
            authenticationType: AuthenticationTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.authenticationType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'authentication-type/new',
        component: AuthenticationTypeUpdateComponent,
        resolve: {
            authenticationType: AuthenticationTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.authenticationType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'authentication-type/:id/edit',
        component: AuthenticationTypeUpdateComponent,
        resolve: {
            authenticationType: AuthenticationTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.authenticationType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const authenticationTypePopupRoute: Routes = [
    {
        path: 'authentication-type/:id/delete',
        component: AuthenticationTypeDeletePopupComponent,
        resolve: {
            authenticationType: AuthenticationTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.authenticationType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

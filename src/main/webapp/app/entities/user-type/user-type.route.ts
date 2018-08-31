import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserType } from 'app/shared/model/user-type.model';
import { UserTypeService } from './user-type.service';
import { UserTypeComponent } from './user-type.component';
import { UserTypeDetailComponent } from './user-type-detail.component';
import { UserTypeUpdateComponent } from './user-type-update.component';
import { UserTypeDeletePopupComponent } from './user-type-delete-dialog.component';
import { IUserType } from 'app/shared/model/user-type.model';

@Injectable({ providedIn: 'root' })
export class UserTypeResolve implements Resolve<IUserType> {
    constructor(private service: UserTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((userType: HttpResponse<UserType>) => userType.body));
        }
        return of(new UserType());
    }
}

export const userTypeRoute: Routes = [
    {
        path: 'user-type',
        component: UserTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.userType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-type/:id/view',
        component: UserTypeDetailComponent,
        resolve: {
            userType: UserTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.userType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-type/new',
        component: UserTypeUpdateComponent,
        resolve: {
            userType: UserTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.userType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-type/:id/edit',
        component: UserTypeUpdateComponent,
        resolve: {
            userType: UserTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.userType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userTypePopupRoute: Routes = [
    {
        path: 'user-type/:id/delete',
        component: UserTypeDeletePopupComponent,
        resolve: {
            userType: UserTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.userType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoleActivity } from 'app/shared/model/role-activity.model';
import { RoleActivityService } from './role-activity.service';
import { RoleActivityComponent } from './role-activity.component';
import { RoleActivityDetailComponent } from './role-activity-detail.component';
import { RoleActivityUpdateComponent } from './role-activity-update.component';
import { RoleActivityDeletePopupComponent } from './role-activity-delete-dialog.component';
import { IRoleActivity } from 'app/shared/model/role-activity.model';

@Injectable({ providedIn: 'root' })
export class RoleActivityResolve implements Resolve<IRoleActivity> {
    constructor(private service: RoleActivityService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((roleActivity: HttpResponse<RoleActivity>) => roleActivity.body));
        }
        return of(new RoleActivity());
    }
}

export const roleActivityRoute: Routes = [
    {
        path: 'role-activity',
        component: RoleActivityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.roleActivity.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'role-activity/:id/view',
        component: RoleActivityDetailComponent,
        resolve: {
            roleActivity: RoleActivityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.roleActivity.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'role-activity/new',
        component: RoleActivityUpdateComponent,
        resolve: {
            roleActivity: RoleActivityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.roleActivity.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'role-activity/:id/edit',
        component: RoleActivityUpdateComponent,
        resolve: {
            roleActivity: RoleActivityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.roleActivity.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const roleActivityPopupRoute: Routes = [
    {
        path: 'role-activity/:id/delete',
        component: RoleActivityDeletePopupComponent,
        resolve: {
            roleActivity: RoleActivityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.roleActivity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

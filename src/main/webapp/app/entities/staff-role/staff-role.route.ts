import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StaffRole } from 'app/shared/model/staff-role.model';
import { StaffRoleService } from './staff-role.service';
import { StaffRoleComponent } from './staff-role.component';
import { StaffRoleDetailComponent } from './staff-role-detail.component';
import { StaffRoleUpdateComponent } from './staff-role-update.component';
import { StaffRoleDeletePopupComponent } from './staff-role-delete-dialog.component';
import { IStaffRole } from 'app/shared/model/staff-role.model';

@Injectable({ providedIn: 'root' })
export class StaffRoleResolve implements Resolve<IStaffRole> {
    constructor(private service: StaffRoleService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((staffRole: HttpResponse<StaffRole>) => staffRole.body));
        }
        return of(new StaffRole());
    }
}

export const staffRoleRoute: Routes = [
    {
        path: 'staff-role',
        component: StaffRoleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.staffRole.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'staff-role/:id/view',
        component: StaffRoleDetailComponent,
        resolve: {
            staffRole: StaffRoleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.staffRole.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'staff-role/new',
        component: StaffRoleUpdateComponent,
        resolve: {
            staffRole: StaffRoleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.staffRole.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'staff-role/:id/edit',
        component: StaffRoleUpdateComponent,
        resolve: {
            staffRole: StaffRoleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.staffRole.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const staffRolePopupRoute: Routes = [
    {
        path: 'staff-role/:id/delete',
        component: StaffRoleDeletePopupComponent,
        resolve: {
            staffRole: StaffRoleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.staffRole.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

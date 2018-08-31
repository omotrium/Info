import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { InternalGroup } from 'app/shared/model/internal-group.model';
import { InternalGroupService } from './internal-group.service';
import { InternalGroupComponent } from './internal-group.component';
import { InternalGroupDetailComponent } from './internal-group-detail.component';
import { InternalGroupUpdateComponent } from './internal-group-update.component';
import { InternalGroupDeletePopupComponent } from './internal-group-delete-dialog.component';
import { IInternalGroup } from 'app/shared/model/internal-group.model';

@Injectable({ providedIn: 'root' })
export class InternalGroupResolve implements Resolve<IInternalGroup> {
    constructor(private service: InternalGroupService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((internalGroup: HttpResponse<InternalGroup>) => internalGroup.body));
        }
        return of(new InternalGroup());
    }
}

export const internalGroupRoute: Routes = [
    {
        path: 'internal-group',
        component: InternalGroupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.internalGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'internal-group/:id/view',
        component: InternalGroupDetailComponent,
        resolve: {
            internalGroup: InternalGroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.internalGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'internal-group/new',
        component: InternalGroupUpdateComponent,
        resolve: {
            internalGroup: InternalGroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.internalGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'internal-group/:id/edit',
        component: InternalGroupUpdateComponent,
        resolve: {
            internalGroup: InternalGroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.internalGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const internalGroupPopupRoute: Routes = [
    {
        path: 'internal-group/:id/delete',
        component: InternalGroupDeletePopupComponent,
        resolve: {
            internalGroup: InternalGroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.internalGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

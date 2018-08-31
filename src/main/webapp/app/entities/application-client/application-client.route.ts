import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApplicationClient } from 'app/shared/model/application-client.model';
import { ApplicationClientService } from './application-client.service';
import { ApplicationClientComponent } from './application-client.component';
import { ApplicationClientDetailComponent } from './application-client-detail.component';
import { ApplicationClientUpdateComponent } from './application-client-update.component';
import { ApplicationClientDeletePopupComponent } from './application-client-delete-dialog.component';
import { IApplicationClient } from 'app/shared/model/application-client.model';

@Injectable({ providedIn: 'root' })
export class ApplicationClientResolve implements Resolve<IApplicationClient> {
    constructor(private service: ApplicationClientService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((applicationClient: HttpResponse<ApplicationClient>) => applicationClient.body));
        }
        return of(new ApplicationClient());
    }
}

export const applicationClientRoute: Routes = [
    {
        path: 'application-client',
        component: ApplicationClientComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.applicationClient.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'application-client/:id/view',
        component: ApplicationClientDetailComponent,
        resolve: {
            applicationClient: ApplicationClientResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.applicationClient.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'application-client/new',
        component: ApplicationClientUpdateComponent,
        resolve: {
            applicationClient: ApplicationClientResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.applicationClient.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'application-client/:id/edit',
        component: ApplicationClientUpdateComponent,
        resolve: {
            applicationClient: ApplicationClientResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.applicationClient.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const applicationClientPopupRoute: Routes = [
    {
        path: 'application-client/:id/delete',
        component: ApplicationClientDeletePopupComponent,
        resolve: {
            applicationClient: ApplicationClientResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'informationManagerApp.applicationClient.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

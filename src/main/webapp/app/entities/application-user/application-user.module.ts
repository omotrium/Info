import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InformationManagerSharedModule } from 'app/shared';
import {
    ApplicationUserComponent,
    ApplicationUserDetailComponent,
    ApplicationUserUpdateComponent,
    ApplicationUserDeletePopupComponent,
    ApplicationUserDeleteDialogComponent,
    applicationUserRoute,
    applicationUserPopupRoute
} from './';

const ENTITY_STATES = [...applicationUserRoute, ...applicationUserPopupRoute];

@NgModule({
    imports: [InformationManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ApplicationUserComponent,
        ApplicationUserDetailComponent,
        ApplicationUserUpdateComponent,
        ApplicationUserDeleteDialogComponent,
        ApplicationUserDeletePopupComponent
    ],
    entryComponents: [
        ApplicationUserComponent,
        ApplicationUserUpdateComponent,
        ApplicationUserDeleteDialogComponent,
        ApplicationUserDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InformationManagerApplicationUserModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InformationManagerSharedModule } from 'app/shared';
import {
    RoleActivityComponent,
    RoleActivityDetailComponent,
    RoleActivityUpdateComponent,
    RoleActivityDeletePopupComponent,
    RoleActivityDeleteDialogComponent,
    roleActivityRoute,
    roleActivityPopupRoute
} from './';

const ENTITY_STATES = [...roleActivityRoute, ...roleActivityPopupRoute];

@NgModule({
    imports: [InformationManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RoleActivityComponent,
        RoleActivityDetailComponent,
        RoleActivityUpdateComponent,
        RoleActivityDeleteDialogComponent,
        RoleActivityDeletePopupComponent
    ],
    entryComponents: [
        RoleActivityComponent,
        RoleActivityUpdateComponent,
        RoleActivityDeleteDialogComponent,
        RoleActivityDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InformationManagerRoleActivityModule {}

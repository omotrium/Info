import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InformationManagerSharedModule } from 'app/shared';
import {
    StaffRoleComponent,
    StaffRoleDetailComponent,
    StaffRoleUpdateComponent,
    StaffRoleDeletePopupComponent,
    StaffRoleDeleteDialogComponent,
    staffRoleRoute,
    staffRolePopupRoute
} from './';

const ENTITY_STATES = [...staffRoleRoute, ...staffRolePopupRoute];

@NgModule({
    imports: [InformationManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        StaffRoleComponent,
        StaffRoleDetailComponent,
        StaffRoleUpdateComponent,
        StaffRoleDeleteDialogComponent,
        StaffRoleDeletePopupComponent
    ],
    entryComponents: [StaffRoleComponent, StaffRoleUpdateComponent, StaffRoleDeleteDialogComponent, StaffRoleDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InformationManagerStaffRoleModule {}

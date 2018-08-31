import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InformationManagerSharedModule } from 'app/shared';
import {
    StaffComponent,
    StaffDetailComponent,
    StaffUpdateComponent,
    StaffDeletePopupComponent,
    StaffDeleteDialogComponent,
    staffRoute,
    staffPopupRoute
} from './';

const ENTITY_STATES = [...staffRoute, ...staffPopupRoute];

@NgModule({
    imports: [InformationManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [StaffComponent, StaffDetailComponent, StaffUpdateComponent, StaffDeleteDialogComponent, StaffDeletePopupComponent],
    entryComponents: [StaffComponent, StaffUpdateComponent, StaffDeleteDialogComponent, StaffDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InformationManagerStaffModule {}

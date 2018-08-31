import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InformationManagerSharedModule } from 'app/shared';
import {
    UserTypeComponent,
    UserTypeDetailComponent,
    UserTypeUpdateComponent,
    UserTypeDeletePopupComponent,
    UserTypeDeleteDialogComponent,
    userTypeRoute,
    userTypePopupRoute
} from './';

const ENTITY_STATES = [...userTypeRoute, ...userTypePopupRoute];

@NgModule({
    imports: [InformationManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UserTypeComponent,
        UserTypeDetailComponent,
        UserTypeUpdateComponent,
        UserTypeDeleteDialogComponent,
        UserTypeDeletePopupComponent
    ],
    entryComponents: [UserTypeComponent, UserTypeUpdateComponent, UserTypeDeleteDialogComponent, UserTypeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InformationManagerUserTypeModule {}

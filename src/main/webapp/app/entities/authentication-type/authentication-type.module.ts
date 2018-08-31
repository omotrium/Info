import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InformationManagerSharedModule } from 'app/shared';
import {
    AuthenticationTypeComponent,
    AuthenticationTypeDetailComponent,
    AuthenticationTypeUpdateComponent,
    AuthenticationTypeDeletePopupComponent,
    AuthenticationTypeDeleteDialogComponent,
    authenticationTypeRoute,
    authenticationTypePopupRoute
} from './';

const ENTITY_STATES = [...authenticationTypeRoute, ...authenticationTypePopupRoute];

@NgModule({
    imports: [InformationManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AuthenticationTypeComponent,
        AuthenticationTypeDetailComponent,
        AuthenticationTypeUpdateComponent,
        AuthenticationTypeDeleteDialogComponent,
        AuthenticationTypeDeletePopupComponent
    ],
    entryComponents: [
        AuthenticationTypeComponent,
        AuthenticationTypeUpdateComponent,
        AuthenticationTypeDeleteDialogComponent,
        AuthenticationTypeDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InformationManagerAuthenticationTypeModule {}

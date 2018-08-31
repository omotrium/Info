import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InformationManagerSharedModule } from 'app/shared';
import {
    InternalGroupComponent,
    InternalGroupDetailComponent,
    InternalGroupUpdateComponent,
    InternalGroupDeletePopupComponent,
    InternalGroupDeleteDialogComponent,
    internalGroupRoute,
    internalGroupPopupRoute
} from './';

const ENTITY_STATES = [...internalGroupRoute, ...internalGroupPopupRoute];

@NgModule({
    imports: [InformationManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        InternalGroupComponent,
        InternalGroupDetailComponent,
        InternalGroupUpdateComponent,
        InternalGroupDeleteDialogComponent,
        InternalGroupDeletePopupComponent
    ],
    entryComponents: [
        InternalGroupComponent,
        InternalGroupUpdateComponent,
        InternalGroupDeleteDialogComponent,
        InternalGroupDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InformationManagerInternalGroupModule {}

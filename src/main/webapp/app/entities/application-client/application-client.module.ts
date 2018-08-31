import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InformationManagerSharedModule } from 'app/shared';
import {
    ApplicationClientComponent,
    ApplicationClientDetailComponent,
    ApplicationClientUpdateComponent,
    ApplicationClientDeletePopupComponent,
    ApplicationClientDeleteDialogComponent,
    applicationClientRoute,
    applicationClientPopupRoute
} from './';

const ENTITY_STATES = [...applicationClientRoute, ...applicationClientPopupRoute];

@NgModule({
    imports: [InformationManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ApplicationClientComponent,
        ApplicationClientDetailComponent,
        ApplicationClientUpdateComponent,
        ApplicationClientDeleteDialogComponent,
        ApplicationClientDeletePopupComponent
    ],
    entryComponents: [
        ApplicationClientComponent,
        ApplicationClientUpdateComponent,
        ApplicationClientDeleteDialogComponent,
        ApplicationClientDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InformationManagerApplicationClientModule {}

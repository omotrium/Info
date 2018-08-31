import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { InformationManagerStaffModule } from './staff/staff.module';
import { InformationManagerApplicationModule } from './application/application.module';
import { InformationManagerApplicationUserModule } from './application-user/application-user.module';
import { InformationManagerAuthenticationTypeModule } from './authentication-type/authentication-type.module';
import { InformationManagerApplicationClientModule } from './application-client/application-client.module';
import { InformationManagerRoleModule } from './role/role.module';
import { InformationManagerActivityModule } from './activity/activity.module';
import { InformationManagerUserTypeModule } from './user-type/user-type.module';
import { InformationManagerInternalGroupModule } from './internal-group/internal-group.module';
import { InformationManagerOrganisationModule } from './organisation/organisation.module';
import { InformationManagerRoleActivityModule } from './role-activity/role-activity.module';
import { InformationManagerStaffRoleModule } from './staff-role/staff-role.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        InformationManagerStaffModule,
        InformationManagerApplicationModule,
        InformationManagerApplicationUserModule,
        InformationManagerAuthenticationTypeModule,
        InformationManagerApplicationClientModule,
        InformationManagerRoleModule,
        InformationManagerActivityModule,
        InformationManagerUserTypeModule,
        InformationManagerInternalGroupModule,
        InformationManagerOrganisationModule,
        InformationManagerRoleActivityModule,
        InformationManagerStaffRoleModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InformationManagerEntityModule {}

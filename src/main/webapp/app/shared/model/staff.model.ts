import { IApplicationUser } from 'app/shared/model//application-user.model';
import { IStaffRole } from 'app/shared/model//staff-role.model';
import { IOrganisation } from 'app/shared/model//organisation.model';
import { IInternalGroup } from 'app/shared/model//internal-group.model';
import { IUserType } from 'app/shared/model//user-type.model';

export interface IStaff {
    id?: number;
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    accountStatus?: string;
    password?: string;
    verifiedBy?: string;
    loginCount?: string;
    applicationUsers?: IApplicationUser[];
    staffRoles?: IStaffRole[];
    organisations?: IOrganisation;
    internalGroup?: IInternalGroup;
    userTypes?: IUserType;
}

export class Staff implements IStaff {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public username?: string,
        public email?: string,
        public accountStatus?: string,
        public password?: string,
        public verifiedBy?: string,
        public loginCount?: string,
        public applicationUsers?: IApplicationUser[],
        public staffRoles?: IStaffRole[],
        public organisations?: IOrganisation,
        public internalGroup?: IInternalGroup,
        public userTypes?: IUserType
    ) {}
}

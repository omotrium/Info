import { IRoleActivity } from 'app/shared/model//role-activity.model';
import { IStaffRole } from 'app/shared/model//staff-role.model';

export interface IRole {
    id?: number;
    name?: string;
    description?: string;
    uaaId?: string;
    roleActivities?: IRoleActivity[];
    staffRoles?: IStaffRole[];
}

export class Role implements IRole {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public uaaId?: string,
        public roleActivities?: IRoleActivity[],
        public staffRoles?: IStaffRole[]
    ) {}
}

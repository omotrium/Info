import { IStaff } from 'app/shared/model//staff.model';
import { IRole } from 'app/shared/model//role.model';

export interface IStaffRole {
    id?: number;
    staff?: IStaff;
    role?: IRole;
}

export class StaffRole implements IStaffRole {
    constructor(public id?: number, public staff?: IStaff, public role?: IRole) {}
}

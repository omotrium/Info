import { IStaff } from 'app/shared/model//staff.model';

export interface IUserType {
    id?: number;
    name?: string;
    description?: string;
    staffs?: IStaff[];
}

export class UserType implements IUserType {
    constructor(public id?: number, public name?: string, public description?: string, public staffs?: IStaff[]) {}
}

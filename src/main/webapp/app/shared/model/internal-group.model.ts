import { IStaff } from 'app/shared/model//staff.model';

export interface IInternalGroup {
    id?: number;
    name?: string;
    staffs?: IStaff[];
}

export class InternalGroup implements IInternalGroup {
    constructor(public id?: number, public name?: string, public staffs?: IStaff[]) {}
}

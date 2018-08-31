import { IStaff } from 'app/shared/model//staff.model';

export interface IOrganisation {
    id?: number;
    name?: string;
    staffs?: IStaff[];
}

export class Organisation implements IOrganisation {
    constructor(public id?: number, public name?: string, public staffs?: IStaff[]) {}
}

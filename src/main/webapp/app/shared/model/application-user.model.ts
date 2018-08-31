import { IStaff } from 'app/shared/model//staff.model';
import { IApplication } from 'app/shared/model//application.model';

export interface IApplicationUser {
    id?: number;
    staff?: IStaff;
    application?: IApplication;
}

export class ApplicationUser implements IApplicationUser {
    constructor(public id?: number, public staff?: IStaff, public application?: IApplication) {}
}

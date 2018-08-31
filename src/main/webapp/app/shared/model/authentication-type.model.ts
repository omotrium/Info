import { IApplication } from 'app/shared/model//application.model';

export interface IAuthenticationType {
    id?: number;
    name?: string;
    token?: string;
    applications?: IApplication[];
}

export class AuthenticationType implements IAuthenticationType {
    constructor(public id?: number, public name?: string, public token?: string, public applications?: IApplication[]) {}
}

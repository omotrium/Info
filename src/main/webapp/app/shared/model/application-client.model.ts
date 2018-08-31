import { IApplication } from 'app/shared/model//application.model';

export interface IApplicationClient {
    id?: number;
    name?: string;
    applications?: IApplication[];
}

export class ApplicationClient implements IApplicationClient {
    constructor(public id?: number, public name?: string, public applications?: IApplication[]) {}
}

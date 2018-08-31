import { IApplicationUser } from 'app/shared/model//application-user.model';
import { IAuthenticationType } from 'app/shared/model//authentication-type.model';
import { IApplicationClient } from 'app/shared/model//application-client.model';

export interface IApplication {
    id?: number;
    name?: string;
    description?: string;
    uaaId?: string;
    applicationUsers?: IApplicationUser[];
    authenticationTypes?: IAuthenticationType;
    applicationClients?: IApplicationClient;
}

export class Application implements IApplication {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public uaaId?: string,
        public applicationUsers?: IApplicationUser[],
        public authenticationTypes?: IAuthenticationType,
        public applicationClients?: IApplicationClient
    ) {}
}

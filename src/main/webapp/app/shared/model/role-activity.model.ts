import { IRole } from 'app/shared/model//role.model';
import { IActivity } from 'app/shared/model//activity.model';

export interface IRoleActivity {
    id?: number;
    roles?: IRole;
    activity?: IActivity;
}

export class RoleActivity implements IRoleActivity {
    constructor(public id?: number, public roles?: IRole, public activity?: IActivity) {}
}

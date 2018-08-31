import { IRoleActivity } from 'app/shared/model//role-activity.model';

export interface IActivity {
    id?: number;
    name?: string;
    description?: string;
    uaaId?: string;
    roleActivities?: IRoleActivity[];
}

export class Activity implements IActivity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public uaaId?: string,
        public roleActivities?: IRoleActivity[]
    ) {}
}

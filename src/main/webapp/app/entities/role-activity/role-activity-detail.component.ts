import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRoleActivity } from 'app/shared/model/role-activity.model';

@Component({
    selector: 'jhi-role-activity-detail',
    templateUrl: './role-activity-detail.component.html'
})
export class RoleActivityDetailComponent implements OnInit {
    roleActivity: IRoleActivity;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ roleActivity }) => {
            this.roleActivity = roleActivity;
        });
    }

    previousState() {
        window.history.back();
    }
}

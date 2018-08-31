import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStaffRole } from 'app/shared/model/staff-role.model';

@Component({
    selector: 'jhi-staff-role-detail',
    templateUrl: './staff-role-detail.component.html'
})
export class StaffRoleDetailComponent implements OnInit {
    staffRole: IStaffRole;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ staffRole }) => {
            this.staffRole = staffRole;
        });
    }

    previousState() {
        window.history.back();
    }
}

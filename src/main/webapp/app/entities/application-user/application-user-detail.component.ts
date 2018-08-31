import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IApplicationUser } from 'app/shared/model/application-user.model';

@Component({
    selector: 'jhi-application-user-detail',
    templateUrl: './application-user-detail.component.html'
})
export class ApplicationUserDetailComponent implements OnInit {
    applicationUser: IApplicationUser;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ applicationUser }) => {
            this.applicationUser = applicationUser;
        });
    }

    previousState() {
        window.history.back();
    }
}

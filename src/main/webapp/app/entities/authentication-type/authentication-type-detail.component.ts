import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAuthenticationType } from 'app/shared/model/authentication-type.model';

@Component({
    selector: 'jhi-authentication-type-detail',
    templateUrl: './authentication-type-detail.component.html'
})
export class AuthenticationTypeDetailComponent implements OnInit {
    authenticationType: IAuthenticationType;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ authenticationType }) => {
            this.authenticationType = authenticationType;
        });
    }

    previousState() {
        window.history.back();
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IApplicationClient } from 'app/shared/model/application-client.model';

@Component({
    selector: 'jhi-application-client-detail',
    templateUrl: './application-client-detail.component.html'
})
export class ApplicationClientDetailComponent implements OnInit {
    applicationClient: IApplicationClient;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ applicationClient }) => {
            this.applicationClient = applicationClient;
        });
    }

    previousState() {
        window.history.back();
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IApplication } from 'app/shared/model/application.model';
import { ApplicationService } from './application.service';
import { IAuthenticationType } from 'app/shared/model/authentication-type.model';
import { AuthenticationTypeService } from 'app/entities/authentication-type';
import { IApplicationClient } from 'app/shared/model/application-client.model';
import { ApplicationClientService } from 'app/entities/application-client';

@Component({
    selector: 'jhi-application-update',
    templateUrl: './application-update.component.html'
})
export class ApplicationUpdateComponent implements OnInit {
    private _application: IApplication;
    isSaving: boolean;

    authenticationtypes: IAuthenticationType[];

    applicationclients: IApplicationClient[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private applicationService: ApplicationService,
        private authenticationTypeService: AuthenticationTypeService,
        private applicationClientService: ApplicationClientService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ application }) => {
            this.application = application;
        });
        this.authenticationTypeService.query().subscribe(
            (res: HttpResponse<IAuthenticationType[]>) => {
                this.authenticationtypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.applicationClientService.query().subscribe(
            (res: HttpResponse<IApplicationClient[]>) => {
                this.applicationclients = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.application.id !== undefined) {
            this.subscribeToSaveResponse(this.applicationService.update(this.application));
        } else {
            this.subscribeToSaveResponse(this.applicationService.create(this.application));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IApplication>>) {
        result.subscribe((res: HttpResponse<IApplication>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackAuthenticationTypeById(index: number, item: IAuthenticationType) {
        return item.id;
    }

    trackApplicationClientById(index: number, item: IApplicationClient) {
        return item.id;
    }
    get application() {
        return this._application;
    }

    set application(application: IApplication) {
        this._application = application;
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IApplicationClient } from 'app/shared/model/application-client.model';
import { ApplicationClientService } from './application-client.service';

@Component({
    selector: 'jhi-application-client-update',
    templateUrl: './application-client-update.component.html'
})
export class ApplicationClientUpdateComponent implements OnInit {
    private _applicationClient: IApplicationClient;
    isSaving: boolean;

    constructor(private applicationClientService: ApplicationClientService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ applicationClient }) => {
            this.applicationClient = applicationClient;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.applicationClient.id !== undefined) {
            this.subscribeToSaveResponse(this.applicationClientService.update(this.applicationClient));
        } else {
            this.subscribeToSaveResponse(this.applicationClientService.create(this.applicationClient));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IApplicationClient>>) {
        result.subscribe((res: HttpResponse<IApplicationClient>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get applicationClient() {
        return this._applicationClient;
    }

    set applicationClient(applicationClient: IApplicationClient) {
        this._applicationClient = applicationClient;
    }
}

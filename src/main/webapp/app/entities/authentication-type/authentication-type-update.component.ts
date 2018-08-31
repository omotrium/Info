import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAuthenticationType } from 'app/shared/model/authentication-type.model';
import { AuthenticationTypeService } from './authentication-type.service';

@Component({
    selector: 'jhi-authentication-type-update',
    templateUrl: './authentication-type-update.component.html'
})
export class AuthenticationTypeUpdateComponent implements OnInit {
    private _authenticationType: IAuthenticationType;
    isSaving: boolean;

    constructor(private authenticationTypeService: AuthenticationTypeService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ authenticationType }) => {
            this.authenticationType = authenticationType;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.authenticationType.id !== undefined) {
            this.subscribeToSaveResponse(this.authenticationTypeService.update(this.authenticationType));
        } else {
            this.subscribeToSaveResponse(this.authenticationTypeService.create(this.authenticationType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAuthenticationType>>) {
        result.subscribe((res: HttpResponse<IAuthenticationType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get authenticationType() {
        return this._authenticationType;
    }

    set authenticationType(authenticationType: IAuthenticationType) {
        this._authenticationType = authenticationType;
    }
}

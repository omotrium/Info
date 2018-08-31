import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IOrganisation } from 'app/shared/model/organisation.model';
import { OrganisationService } from './organisation.service';

@Component({
    selector: 'jhi-organisation-update',
    templateUrl: './organisation-update.component.html'
})
export class OrganisationUpdateComponent implements OnInit {
    private _organisation: IOrganisation;
    isSaving: boolean;

    constructor(private organisationService: OrganisationService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ organisation }) => {
            this.organisation = organisation;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.organisation.id !== undefined) {
            this.subscribeToSaveResponse(this.organisationService.update(this.organisation));
        } else {
            this.subscribeToSaveResponse(this.organisationService.create(this.organisation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOrganisation>>) {
        result.subscribe((res: HttpResponse<IOrganisation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get organisation() {
        return this._organisation;
    }

    set organisation(organisation: IOrganisation) {
        this._organisation = organisation;
    }
}

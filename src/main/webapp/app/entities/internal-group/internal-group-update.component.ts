import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IInternalGroup } from 'app/shared/model/internal-group.model';
import { InternalGroupService } from './internal-group.service';

@Component({
    selector: 'jhi-internal-group-update',
    templateUrl: './internal-group-update.component.html'
})
export class InternalGroupUpdateComponent implements OnInit {
    private _internalGroup: IInternalGroup;
    isSaving: boolean;

    constructor(private internalGroupService: InternalGroupService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ internalGroup }) => {
            this.internalGroup = internalGroup;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.internalGroup.id !== undefined) {
            this.subscribeToSaveResponse(this.internalGroupService.update(this.internalGroup));
        } else {
            this.subscribeToSaveResponse(this.internalGroupService.create(this.internalGroup));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IInternalGroup>>) {
        result.subscribe((res: HttpResponse<IInternalGroup>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get internalGroup() {
        return this._internalGroup;
    }

    set internalGroup(internalGroup: IInternalGroup) {
        this._internalGroup = internalGroup;
    }
}

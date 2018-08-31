import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IStaff } from 'app/shared/model/staff.model';
import { StaffService } from './staff.service';
import { IOrganisation } from 'app/shared/model/organisation.model';
import { OrganisationService } from 'app/entities/organisation';
import { IInternalGroup } from 'app/shared/model/internal-group.model';
import { InternalGroupService } from 'app/entities/internal-group';
import { IUserType } from 'app/shared/model/user-type.model';
import { UserTypeService } from 'app/entities/user-type';

@Component({
    selector: 'jhi-staff-update',
    templateUrl: './staff-update.component.html'
})
export class StaffUpdateComponent implements OnInit {
    private _staff: IStaff;
    isSaving: boolean;

    organisations: IOrganisation[];

    internalgroups: IInternalGroup[];

    usertypes: IUserType[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private staffService: StaffService,
        private organisationService: OrganisationService,
        private internalGroupService: InternalGroupService,
        private userTypeService: UserTypeService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ staff }) => {
            this.staff = staff;
        });
        this.organisationService.query().subscribe(
            (res: HttpResponse<IOrganisation[]>) => {
                this.organisations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.internalGroupService.query().subscribe(
            (res: HttpResponse<IInternalGroup[]>) => {
                this.internalgroups = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.userTypeService.query().subscribe(
            (res: HttpResponse<IUserType[]>) => {
                this.usertypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.staff.id !== undefined) {
            this.subscribeToSaveResponse(this.staffService.update(this.staff));
        } else {
            this.subscribeToSaveResponse(this.staffService.create(this.staff));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IStaff>>) {
        result.subscribe((res: HttpResponse<IStaff>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackOrganisationById(index: number, item: IOrganisation) {
        return item.id;
    }

    trackInternalGroupById(index: number, item: IInternalGroup) {
        return item.id;
    }

    trackUserTypeById(index: number, item: IUserType) {
        return item.id;
    }
    get staff() {
        return this._staff;
    }

    set staff(staff: IStaff) {
        this._staff = staff;
    }
}

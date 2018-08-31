import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IApplicationUser } from 'app/shared/model/application-user.model';
import { ApplicationUserService } from './application-user.service';
import { IStaff } from 'app/shared/model/staff.model';
import { StaffService } from 'app/entities/staff';
import { IApplication } from 'app/shared/model/application.model';
import { ApplicationService } from 'app/entities/application';

@Component({
    selector: 'jhi-application-user-update',
    templateUrl: './application-user-update.component.html'
})
export class ApplicationUserUpdateComponent implements OnInit {
    private _applicationUser: IApplicationUser;
    isSaving: boolean;

    staff: IStaff[];

    applications: IApplication[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private applicationUserService: ApplicationUserService,
        private staffService: StaffService,
        private applicationService: ApplicationService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ applicationUser }) => {
            this.applicationUser = applicationUser;
        });
        this.staffService.query().subscribe(
            (res: HttpResponse<IStaff[]>) => {
                this.staff = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.applicationService.query().subscribe(
            (res: HttpResponse<IApplication[]>) => {
                this.applications = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.applicationUser.id !== undefined) {
            this.subscribeToSaveResponse(this.applicationUserService.update(this.applicationUser));
        } else {
            this.subscribeToSaveResponse(this.applicationUserService.create(this.applicationUser));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IApplicationUser>>) {
        result.subscribe((res: HttpResponse<IApplicationUser>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackStaffById(index: number, item: IStaff) {
        return item.id;
    }

    trackApplicationById(index: number, item: IApplication) {
        return item.id;
    }
    get applicationUser() {
        return this._applicationUser;
    }

    set applicationUser(applicationUser: IApplicationUser) {
        this._applicationUser = applicationUser;
    }
}

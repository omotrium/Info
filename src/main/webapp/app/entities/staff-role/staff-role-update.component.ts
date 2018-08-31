import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IStaffRole } from 'app/shared/model/staff-role.model';
import { StaffRoleService } from './staff-role.service';
import { IStaff } from 'app/shared/model/staff.model';
import { StaffService } from 'app/entities/staff';
import { IRole } from 'app/shared/model/role.model';
import { RoleService } from 'app/entities/role';

@Component({
    selector: 'jhi-staff-role-update',
    templateUrl: './staff-role-update.component.html'
})
export class StaffRoleUpdateComponent implements OnInit {
    private _staffRole: IStaffRole;
    isSaving: boolean;

    staff: IStaff[];

    roles: IRole[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private staffRoleService: StaffRoleService,
        private staffService: StaffService,
        private roleService: RoleService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ staffRole }) => {
            this.staffRole = staffRole;
        });
        this.staffService.query().subscribe(
            (res: HttpResponse<IStaff[]>) => {
                this.staff = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.roleService.query().subscribe(
            (res: HttpResponse<IRole[]>) => {
                this.roles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.staffRole.id !== undefined) {
            this.subscribeToSaveResponse(this.staffRoleService.update(this.staffRole));
        } else {
            this.subscribeToSaveResponse(this.staffRoleService.create(this.staffRole));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IStaffRole>>) {
        result.subscribe((res: HttpResponse<IStaffRole>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackRoleById(index: number, item: IRole) {
        return item.id;
    }
    get staffRole() {
        return this._staffRole;
    }

    set staffRole(staffRole: IStaffRole) {
        this._staffRole = staffRole;
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IRoleActivity } from 'app/shared/model/role-activity.model';
import { RoleActivityService } from './role-activity.service';
import { IRole } from 'app/shared/model/role.model';
import { RoleService } from 'app/entities/role';
import { IActivity } from 'app/shared/model/activity.model';
import { ActivityService } from 'app/entities/activity';

@Component({
    selector: 'jhi-role-activity-update',
    templateUrl: './role-activity-update.component.html'
})
export class RoleActivityUpdateComponent implements OnInit {
    private _roleActivity: IRoleActivity;
    isSaving: boolean;

    roles: IRole[];

    activities: IActivity[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private roleActivityService: RoleActivityService,
        private roleService: RoleService,
        private activityService: ActivityService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ roleActivity }) => {
            this.roleActivity = roleActivity;
        });
        this.roleService.query().subscribe(
            (res: HttpResponse<IRole[]>) => {
                this.roles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.activityService.query().subscribe(
            (res: HttpResponse<IActivity[]>) => {
                this.activities = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.roleActivity.id !== undefined) {
            this.subscribeToSaveResponse(this.roleActivityService.update(this.roleActivity));
        } else {
            this.subscribeToSaveResponse(this.roleActivityService.create(this.roleActivity));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRoleActivity>>) {
        result.subscribe((res: HttpResponse<IRoleActivity>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackRoleById(index: number, item: IRole) {
        return item.id;
    }

    trackActivityById(index: number, item: IActivity) {
        return item.id;
    }
    get roleActivity() {
        return this._roleActivity;
    }

    set roleActivity(roleActivity: IRoleActivity) {
        this._roleActivity = roleActivity;
    }
}

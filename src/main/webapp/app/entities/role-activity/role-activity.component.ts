import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRoleActivity } from 'app/shared/model/role-activity.model';
import { Principal } from 'app/core';
import { RoleActivityService } from './role-activity.service';

@Component({
    selector: 'jhi-role-activity',
    templateUrl: './role-activity.component.html'
})
export class RoleActivityComponent implements OnInit, OnDestroy {
    roleActivities: IRoleActivity[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private roleActivityService: RoleActivityService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.roleActivityService.query().subscribe(
            (res: HttpResponse<IRoleActivity[]>) => {
                this.roleActivities = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRoleActivities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRoleActivity) {
        return item.id;
    }

    registerChangeInRoleActivities() {
        this.eventSubscriber = this.eventManager.subscribe('roleActivityListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

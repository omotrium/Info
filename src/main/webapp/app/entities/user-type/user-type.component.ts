import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUserType } from 'app/shared/model/user-type.model';
import { Principal } from 'app/core';
import { UserTypeService } from './user-type.service';

@Component({
    selector: 'jhi-user-type',
    templateUrl: './user-type.component.html'
})
export class UserTypeComponent implements OnInit, OnDestroy {
    userTypes: IUserType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private userTypeService: UserTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.userTypeService.query().subscribe(
            (res: HttpResponse<IUserType[]>) => {
                this.userTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInUserTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUserType) {
        return item.id;
    }

    registerChangeInUserTypes() {
        this.eventSubscriber = this.eventManager.subscribe('userTypeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

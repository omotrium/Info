import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IApplicationUser } from 'app/shared/model/application-user.model';
import { Principal } from 'app/core';
import { ApplicationUserService } from './application-user.service';

@Component({
    selector: 'jhi-application-user',
    templateUrl: './application-user.component.html'
})
export class ApplicationUserComponent implements OnInit, OnDestroy {
    applicationUsers: IApplicationUser[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private applicationUserService: ApplicationUserService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.applicationUserService.query().subscribe(
            (res: HttpResponse<IApplicationUser[]>) => {
                this.applicationUsers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInApplicationUsers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IApplicationUser) {
        return item.id;
    }

    registerChangeInApplicationUsers() {
        this.eventSubscriber = this.eventManager.subscribe('applicationUserListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

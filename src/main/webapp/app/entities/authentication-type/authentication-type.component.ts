import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAuthenticationType } from 'app/shared/model/authentication-type.model';
import { Principal } from 'app/core';
import { AuthenticationTypeService } from './authentication-type.service';

@Component({
    selector: 'jhi-authentication-type',
    templateUrl: './authentication-type.component.html'
})
export class AuthenticationTypeComponent implements OnInit, OnDestroy {
    authenticationTypes: IAuthenticationType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private authenticationTypeService: AuthenticationTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.authenticationTypeService.query().subscribe(
            (res: HttpResponse<IAuthenticationType[]>) => {
                this.authenticationTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAuthenticationTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAuthenticationType) {
        return item.id;
    }

    registerChangeInAuthenticationTypes() {
        this.eventSubscriber = this.eventManager.subscribe('authenticationTypeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IInternalGroup } from 'app/shared/model/internal-group.model';
import { Principal } from 'app/core';
import { InternalGroupService } from './internal-group.service';

@Component({
    selector: 'jhi-internal-group',
    templateUrl: './internal-group.component.html'
})
export class InternalGroupComponent implements OnInit, OnDestroy {
    internalGroups: IInternalGroup[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private internalGroupService: InternalGroupService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.internalGroupService.query().subscribe(
            (res: HttpResponse<IInternalGroup[]>) => {
                this.internalGroups = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInInternalGroups();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IInternalGroup) {
        return item.id;
    }

    registerChangeInInternalGroups() {
        this.eventSubscriber = this.eventManager.subscribe('internalGroupListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

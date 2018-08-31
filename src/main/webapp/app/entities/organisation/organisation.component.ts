import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrganisation } from 'app/shared/model/organisation.model';
import { Principal } from 'app/core';
import { OrganisationService } from './organisation.service';

@Component({
    selector: 'jhi-organisation',
    templateUrl: './organisation.component.html'
})
export class OrganisationComponent implements OnInit, OnDestroy {
    organisations: IOrganisation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private organisationService: OrganisationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.organisationService.query().subscribe(
            (res: HttpResponse<IOrganisation[]>) => {
                this.organisations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOrganisations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOrganisation) {
        return item.id;
    }

    registerChangeInOrganisations() {
        this.eventSubscriber = this.eventManager.subscribe('organisationListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

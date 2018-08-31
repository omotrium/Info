import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IApplicationClient } from 'app/shared/model/application-client.model';
import { ApplicationClientService } from './application-client.service';

@Component({
    selector: 'jhi-application-client-delete-dialog',
    templateUrl: './application-client-delete-dialog.component.html'
})
export class ApplicationClientDeleteDialogComponent {
    applicationClient: IApplicationClient;

    constructor(
        private applicationClientService: ApplicationClientService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.applicationClientService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'applicationClientListModification',
                content: 'Deleted an applicationClient'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-application-client-delete-popup',
    template: ''
})
export class ApplicationClientDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ applicationClient }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ApplicationClientDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.applicationClient = applicationClient;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}

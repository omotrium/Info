import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAuthenticationType } from 'app/shared/model/authentication-type.model';
import { AuthenticationTypeService } from './authentication-type.service';

@Component({
    selector: 'jhi-authentication-type-delete-dialog',
    templateUrl: './authentication-type-delete-dialog.component.html'
})
export class AuthenticationTypeDeleteDialogComponent {
    authenticationType: IAuthenticationType;

    constructor(
        private authenticationTypeService: AuthenticationTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.authenticationTypeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'authenticationTypeListModification',
                content: 'Deleted an authenticationType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-authentication-type-delete-popup',
    template: ''
})
export class AuthenticationTypeDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ authenticationType }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AuthenticationTypeDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.authenticationType = authenticationType;
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInternalGroup } from 'app/shared/model/internal-group.model';
import { InternalGroupService } from './internal-group.service';

@Component({
    selector: 'jhi-internal-group-delete-dialog',
    templateUrl: './internal-group-delete-dialog.component.html'
})
export class InternalGroupDeleteDialogComponent {
    internalGroup: IInternalGroup;

    constructor(
        private internalGroupService: InternalGroupService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.internalGroupService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'internalGroupListModification',
                content: 'Deleted an internalGroup'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-internal-group-delete-popup',
    template: ''
})
export class InternalGroupDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ internalGroup }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(InternalGroupDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.internalGroup = internalGroup;
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

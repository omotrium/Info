import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRoleActivity } from 'app/shared/model/role-activity.model';
import { RoleActivityService } from './role-activity.service';

@Component({
    selector: 'jhi-role-activity-delete-dialog',
    templateUrl: './role-activity-delete-dialog.component.html'
})
export class RoleActivityDeleteDialogComponent {
    roleActivity: IRoleActivity;

    constructor(
        private roleActivityService: RoleActivityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.roleActivityService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'roleActivityListModification',
                content: 'Deleted an roleActivity'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-role-activity-delete-popup',
    template: ''
})
export class RoleActivityDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ roleActivity }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RoleActivityDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.roleActivity = roleActivity;
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

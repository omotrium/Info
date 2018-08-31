import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStaffRole } from 'app/shared/model/staff-role.model';
import { StaffRoleService } from './staff-role.service';

@Component({
    selector: 'jhi-staff-role-delete-dialog',
    templateUrl: './staff-role-delete-dialog.component.html'
})
export class StaffRoleDeleteDialogComponent {
    staffRole: IStaffRole;

    constructor(private staffRoleService: StaffRoleService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.staffRoleService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'staffRoleListModification',
                content: 'Deleted an staffRole'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-staff-role-delete-popup',
    template: ''
})
export class StaffRoleDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ staffRole }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(StaffRoleDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.staffRole = staffRole;
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

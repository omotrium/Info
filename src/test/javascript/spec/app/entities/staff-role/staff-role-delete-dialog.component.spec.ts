/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { InformationManagerTestModule } from '../../../test.module';
import { StaffRoleDeleteDialogComponent } from 'app/entities/staff-role/staff-role-delete-dialog.component';
import { StaffRoleService } from 'app/entities/staff-role/staff-role.service';

describe('Component Tests', () => {
    describe('StaffRole Management Delete Component', () => {
        let comp: StaffRoleDeleteDialogComponent;
        let fixture: ComponentFixture<StaffRoleDeleteDialogComponent>;
        let service: StaffRoleService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InformationManagerTestModule],
                declarations: [StaffRoleDeleteDialogComponent]
            })
                .overrideTemplate(StaffRoleDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StaffRoleDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StaffRoleService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});

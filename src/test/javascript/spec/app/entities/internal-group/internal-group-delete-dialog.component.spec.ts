/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { InformationManagerTestModule } from '../../../test.module';
import { InternalGroupDeleteDialogComponent } from 'app/entities/internal-group/internal-group-delete-dialog.component';
import { InternalGroupService } from 'app/entities/internal-group/internal-group.service';

describe('Component Tests', () => {
    describe('InternalGroup Management Delete Component', () => {
        let comp: InternalGroupDeleteDialogComponent;
        let fixture: ComponentFixture<InternalGroupDeleteDialogComponent>;
        let service: InternalGroupService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InformationManagerTestModule],
                declarations: [InternalGroupDeleteDialogComponent]
            })
                .overrideTemplate(InternalGroupDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InternalGroupDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InternalGroupService);
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

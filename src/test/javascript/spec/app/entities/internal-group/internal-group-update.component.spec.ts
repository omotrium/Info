/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { InformationManagerTestModule } from '../../../test.module';
import { InternalGroupUpdateComponent } from 'app/entities/internal-group/internal-group-update.component';
import { InternalGroupService } from 'app/entities/internal-group/internal-group.service';
import { InternalGroup } from 'app/shared/model/internal-group.model';

describe('Component Tests', () => {
    describe('InternalGroup Management Update Component', () => {
        let comp: InternalGroupUpdateComponent;
        let fixture: ComponentFixture<InternalGroupUpdateComponent>;
        let service: InternalGroupService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InformationManagerTestModule],
                declarations: [InternalGroupUpdateComponent]
            })
                .overrideTemplate(InternalGroupUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InternalGroupUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InternalGroupService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new InternalGroup(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.internalGroup = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new InternalGroup();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.internalGroup = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});

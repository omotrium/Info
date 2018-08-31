/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { InformationManagerTestModule } from '../../../test.module';
import { RoleActivityUpdateComponent } from 'app/entities/role-activity/role-activity-update.component';
import { RoleActivityService } from 'app/entities/role-activity/role-activity.service';
import { RoleActivity } from 'app/shared/model/role-activity.model';

describe('Component Tests', () => {
    describe('RoleActivity Management Update Component', () => {
        let comp: RoleActivityUpdateComponent;
        let fixture: ComponentFixture<RoleActivityUpdateComponent>;
        let service: RoleActivityService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InformationManagerTestModule],
                declarations: [RoleActivityUpdateComponent]
            })
                .overrideTemplate(RoleActivityUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RoleActivityUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoleActivityService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RoleActivity(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.roleActivity = entity;
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
                    const entity = new RoleActivity();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.roleActivity = entity;
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

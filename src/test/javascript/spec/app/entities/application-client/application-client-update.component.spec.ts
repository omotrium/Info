/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { InformationManagerTestModule } from '../../../test.module';
import { ApplicationClientUpdateComponent } from 'app/entities/application-client/application-client-update.component';
import { ApplicationClientService } from 'app/entities/application-client/application-client.service';
import { ApplicationClient } from 'app/shared/model/application-client.model';

describe('Component Tests', () => {
    describe('ApplicationClient Management Update Component', () => {
        let comp: ApplicationClientUpdateComponent;
        let fixture: ComponentFixture<ApplicationClientUpdateComponent>;
        let service: ApplicationClientService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InformationManagerTestModule],
                declarations: [ApplicationClientUpdateComponent]
            })
                .overrideTemplate(ApplicationClientUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ApplicationClientUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApplicationClientService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ApplicationClient(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.applicationClient = entity;
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
                    const entity = new ApplicationClient();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.applicationClient = entity;
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

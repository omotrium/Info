/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { InformationManagerTestModule } from '../../../test.module';
import { AuthenticationTypeUpdateComponent } from 'app/entities/authentication-type/authentication-type-update.component';
import { AuthenticationTypeService } from 'app/entities/authentication-type/authentication-type.service';
import { AuthenticationType } from 'app/shared/model/authentication-type.model';

describe('Component Tests', () => {
    describe('AuthenticationType Management Update Component', () => {
        let comp: AuthenticationTypeUpdateComponent;
        let fixture: ComponentFixture<AuthenticationTypeUpdateComponent>;
        let service: AuthenticationTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InformationManagerTestModule],
                declarations: [AuthenticationTypeUpdateComponent]
            })
                .overrideTemplate(AuthenticationTypeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AuthenticationTypeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AuthenticationTypeService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AuthenticationType(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.authenticationType = entity;
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
                    const entity = new AuthenticationType();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.authenticationType = entity;
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

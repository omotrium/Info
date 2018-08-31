/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { InformationManagerTestModule } from '../../../test.module';
import { AuthenticationTypeComponent } from 'app/entities/authentication-type/authentication-type.component';
import { AuthenticationTypeService } from 'app/entities/authentication-type/authentication-type.service';
import { AuthenticationType } from 'app/shared/model/authentication-type.model';

describe('Component Tests', () => {
    describe('AuthenticationType Management Component', () => {
        let comp: AuthenticationTypeComponent;
        let fixture: ComponentFixture<AuthenticationTypeComponent>;
        let service: AuthenticationTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InformationManagerTestModule],
                declarations: [AuthenticationTypeComponent],
                providers: []
            })
                .overrideTemplate(AuthenticationTypeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AuthenticationTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AuthenticationTypeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AuthenticationType(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.authenticationTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

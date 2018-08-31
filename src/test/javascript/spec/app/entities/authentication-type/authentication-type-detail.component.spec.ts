/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InformationManagerTestModule } from '../../../test.module';
import { AuthenticationTypeDetailComponent } from 'app/entities/authentication-type/authentication-type-detail.component';
import { AuthenticationType } from 'app/shared/model/authentication-type.model';

describe('Component Tests', () => {
    describe('AuthenticationType Management Detail Component', () => {
        let comp: AuthenticationTypeDetailComponent;
        let fixture: ComponentFixture<AuthenticationTypeDetailComponent>;
        const route = ({ data: of({ authenticationType: new AuthenticationType(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InformationManagerTestModule],
                declarations: [AuthenticationTypeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AuthenticationTypeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AuthenticationTypeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.authenticationType).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

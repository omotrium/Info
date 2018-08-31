/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InformationManagerTestModule } from '../../../test.module';
import { ApplicationUserDetailComponent } from 'app/entities/application-user/application-user-detail.component';
import { ApplicationUser } from 'app/shared/model/application-user.model';

describe('Component Tests', () => {
    describe('ApplicationUser Management Detail Component', () => {
        let comp: ApplicationUserDetailComponent;
        let fixture: ComponentFixture<ApplicationUserDetailComponent>;
        const route = ({ data: of({ applicationUser: new ApplicationUser(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InformationManagerTestModule],
                declarations: [ApplicationUserDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ApplicationUserDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ApplicationUserDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.applicationUser).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

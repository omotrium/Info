/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InformationManagerTestModule } from '../../../test.module';
import { ApplicationClientDetailComponent } from 'app/entities/application-client/application-client-detail.component';
import { ApplicationClient } from 'app/shared/model/application-client.model';

describe('Component Tests', () => {
    describe('ApplicationClient Management Detail Component', () => {
        let comp: ApplicationClientDetailComponent;
        let fixture: ComponentFixture<ApplicationClientDetailComponent>;
        const route = ({ data: of({ applicationClient: new ApplicationClient(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InformationManagerTestModule],
                declarations: [ApplicationClientDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ApplicationClientDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ApplicationClientDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.applicationClient).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

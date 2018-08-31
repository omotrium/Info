/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { InformationManagerTestModule } from '../../../test.module';
import { OrganisationComponent } from 'app/entities/organisation/organisation.component';
import { OrganisationService } from 'app/entities/organisation/organisation.service';
import { Organisation } from 'app/shared/model/organisation.model';

describe('Component Tests', () => {
    describe('Organisation Management Component', () => {
        let comp: OrganisationComponent;
        let fixture: ComponentFixture<OrganisationComponent>;
        let service: OrganisationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InformationManagerTestModule],
                declarations: [OrganisationComponent],
                providers: []
            })
                .overrideTemplate(OrganisationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrganisationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrganisationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Organisation(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.organisations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

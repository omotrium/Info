/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { InformationManagerTestModule } from '../../../test.module';
import { ApplicationClientComponent } from 'app/entities/application-client/application-client.component';
import { ApplicationClientService } from 'app/entities/application-client/application-client.service';
import { ApplicationClient } from 'app/shared/model/application-client.model';

describe('Component Tests', () => {
    describe('ApplicationClient Management Component', () => {
        let comp: ApplicationClientComponent;
        let fixture: ComponentFixture<ApplicationClientComponent>;
        let service: ApplicationClientService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InformationManagerTestModule],
                declarations: [ApplicationClientComponent],
                providers: []
            })
                .overrideTemplate(ApplicationClientComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ApplicationClientComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApplicationClientService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ApplicationClient(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.applicationClients[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

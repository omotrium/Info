/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { InformationManagerTestModule } from '../../../test.module';
import { InternalGroupComponent } from 'app/entities/internal-group/internal-group.component';
import { InternalGroupService } from 'app/entities/internal-group/internal-group.service';
import { InternalGroup } from 'app/shared/model/internal-group.model';

describe('Component Tests', () => {
    describe('InternalGroup Management Component', () => {
        let comp: InternalGroupComponent;
        let fixture: ComponentFixture<InternalGroupComponent>;
        let service: InternalGroupService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InformationManagerTestModule],
                declarations: [InternalGroupComponent],
                providers: []
            })
                .overrideTemplate(InternalGroupComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InternalGroupComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InternalGroupService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new InternalGroup(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.internalGroups[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

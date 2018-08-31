/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { InformationManagerTestModule } from '../../../test.module';
import { RoleActivityComponent } from 'app/entities/role-activity/role-activity.component';
import { RoleActivityService } from 'app/entities/role-activity/role-activity.service';
import { RoleActivity } from 'app/shared/model/role-activity.model';

describe('Component Tests', () => {
    describe('RoleActivity Management Component', () => {
        let comp: RoleActivityComponent;
        let fixture: ComponentFixture<RoleActivityComponent>;
        let service: RoleActivityService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InformationManagerTestModule],
                declarations: [RoleActivityComponent],
                providers: []
            })
                .overrideTemplate(RoleActivityComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RoleActivityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoleActivityService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new RoleActivity(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.roleActivities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

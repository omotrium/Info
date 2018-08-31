/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { InformationManagerTestModule } from '../../../test.module';
import { StaffRoleComponent } from 'app/entities/staff-role/staff-role.component';
import { StaffRoleService } from 'app/entities/staff-role/staff-role.service';
import { StaffRole } from 'app/shared/model/staff-role.model';

describe('Component Tests', () => {
    describe('StaffRole Management Component', () => {
        let comp: StaffRoleComponent;
        let fixture: ComponentFixture<StaffRoleComponent>;
        let service: StaffRoleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InformationManagerTestModule],
                declarations: [StaffRoleComponent],
                providers: []
            })
                .overrideTemplate(StaffRoleComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StaffRoleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StaffRoleService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new StaffRole(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.staffRoles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

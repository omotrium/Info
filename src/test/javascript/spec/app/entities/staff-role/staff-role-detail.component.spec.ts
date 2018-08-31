/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InformationManagerTestModule } from '../../../test.module';
import { StaffRoleDetailComponent } from 'app/entities/staff-role/staff-role-detail.component';
import { StaffRole } from 'app/shared/model/staff-role.model';

describe('Component Tests', () => {
    describe('StaffRole Management Detail Component', () => {
        let comp: StaffRoleDetailComponent;
        let fixture: ComponentFixture<StaffRoleDetailComponent>;
        const route = ({ data: of({ staffRole: new StaffRole(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InformationManagerTestModule],
                declarations: [StaffRoleDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(StaffRoleDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StaffRoleDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.staffRole).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

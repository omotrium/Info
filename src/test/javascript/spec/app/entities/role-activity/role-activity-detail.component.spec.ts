/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InformationManagerTestModule } from '../../../test.module';
import { RoleActivityDetailComponent } from 'app/entities/role-activity/role-activity-detail.component';
import { RoleActivity } from 'app/shared/model/role-activity.model';

describe('Component Tests', () => {
    describe('RoleActivity Management Detail Component', () => {
        let comp: RoleActivityDetailComponent;
        let fixture: ComponentFixture<RoleActivityDetailComponent>;
        const route = ({ data: of({ roleActivity: new RoleActivity(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InformationManagerTestModule],
                declarations: [RoleActivityDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RoleActivityDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RoleActivityDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.roleActivity).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InformationManagerTestModule } from '../../../test.module';
import { InternalGroupDetailComponent } from 'app/entities/internal-group/internal-group-detail.component';
import { InternalGroup } from 'app/shared/model/internal-group.model';

describe('Component Tests', () => {
    describe('InternalGroup Management Detail Component', () => {
        let comp: InternalGroupDetailComponent;
        let fixture: ComponentFixture<InternalGroupDetailComponent>;
        const route = ({ data: of({ internalGroup: new InternalGroup(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InformationManagerTestModule],
                declarations: [InternalGroupDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(InternalGroupDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InternalGroupDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.internalGroup).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

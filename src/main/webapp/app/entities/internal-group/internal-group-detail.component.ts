import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInternalGroup } from 'app/shared/model/internal-group.model';

@Component({
    selector: 'jhi-internal-group-detail',
    templateUrl: './internal-group-detail.component.html'
})
export class InternalGroupDetailComponent implements OnInit {
    internalGroup: IInternalGroup;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ internalGroup }) => {
            this.internalGroup = internalGroup;
        });
    }

    previousState() {
        window.history.back();
    }
}

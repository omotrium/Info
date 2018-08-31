import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRoleActivity } from 'app/shared/model/role-activity.model';

type EntityResponseType = HttpResponse<IRoleActivity>;
type EntityArrayResponseType = HttpResponse<IRoleActivity[]>;

@Injectable({ providedIn: 'root' })
export class RoleActivityService {
    private resourceUrl = SERVER_API_URL + 'api/role-activities';

    constructor(private http: HttpClient) {}

    create(roleActivity: IRoleActivity): Observable<EntityResponseType> {
        return this.http.post<IRoleActivity>(this.resourceUrl, roleActivity, { observe: 'response' });
    }

    update(roleActivity: IRoleActivity): Observable<EntityResponseType> {
        return this.http.put<IRoleActivity>(this.resourceUrl, roleActivity, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRoleActivity>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRoleActivity[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

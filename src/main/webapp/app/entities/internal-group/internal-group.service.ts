import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IInternalGroup } from 'app/shared/model/internal-group.model';

type EntityResponseType = HttpResponse<IInternalGroup>;
type EntityArrayResponseType = HttpResponse<IInternalGroup[]>;

@Injectable({ providedIn: 'root' })
export class InternalGroupService {
    private resourceUrl = SERVER_API_URL + 'api/internal-groups';

    constructor(private http: HttpClient) {}

    create(internalGroup: IInternalGroup): Observable<EntityResponseType> {
        return this.http.post<IInternalGroup>(this.resourceUrl, internalGroup, { observe: 'response' });
    }

    update(internalGroup: IInternalGroup): Observable<EntityResponseType> {
        return this.http.put<IInternalGroup>(this.resourceUrl, internalGroup, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IInternalGroup>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IInternalGroup[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

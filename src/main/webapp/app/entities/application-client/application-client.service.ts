import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IApplicationClient } from 'app/shared/model/application-client.model';

type EntityResponseType = HttpResponse<IApplicationClient>;
type EntityArrayResponseType = HttpResponse<IApplicationClient[]>;

@Injectable({ providedIn: 'root' })
export class ApplicationClientService {
    private resourceUrl = SERVER_API_URL + 'api/application-clients';

    constructor(private http: HttpClient) {}

    create(applicationClient: IApplicationClient): Observable<EntityResponseType> {
        return this.http.post<IApplicationClient>(this.resourceUrl, applicationClient, { observe: 'response' });
    }

    update(applicationClient: IApplicationClient): Observable<EntityResponseType> {
        return this.http.put<IApplicationClient>(this.resourceUrl, applicationClient, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IApplicationClient>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IApplicationClient[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

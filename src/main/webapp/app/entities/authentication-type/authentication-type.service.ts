import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAuthenticationType } from 'app/shared/model/authentication-type.model';

type EntityResponseType = HttpResponse<IAuthenticationType>;
type EntityArrayResponseType = HttpResponse<IAuthenticationType[]>;

@Injectable({ providedIn: 'root' })
export class AuthenticationTypeService {
    private resourceUrl = SERVER_API_URL + 'api/authentication-types';

    constructor(private http: HttpClient) {}

    create(authenticationType: IAuthenticationType): Observable<EntityResponseType> {
        return this.http.post<IAuthenticationType>(this.resourceUrl, authenticationType, { observe: 'response' });
    }

    update(authenticationType: IAuthenticationType): Observable<EntityResponseType> {
        return this.http.put<IAuthenticationType>(this.resourceUrl, authenticationType, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAuthenticationType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAuthenticationType[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

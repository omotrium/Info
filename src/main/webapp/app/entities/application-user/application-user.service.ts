import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IApplicationUser } from 'app/shared/model/application-user.model';

type EntityResponseType = HttpResponse<IApplicationUser>;
type EntityArrayResponseType = HttpResponse<IApplicationUser[]>;

@Injectable({ providedIn: 'root' })
export class ApplicationUserService {
    private resourceUrl = SERVER_API_URL + 'api/application-users';

    constructor(private http: HttpClient) {}

    create(applicationUser: IApplicationUser): Observable<EntityResponseType> {
        return this.http.post<IApplicationUser>(this.resourceUrl, applicationUser, { observe: 'response' });
    }

    update(applicationUser: IApplicationUser): Observable<EntityResponseType> {
        return this.http.put<IApplicationUser>(this.resourceUrl, applicationUser, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IApplicationUser>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IApplicationUser[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

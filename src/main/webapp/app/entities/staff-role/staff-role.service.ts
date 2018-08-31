import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStaffRole } from 'app/shared/model/staff-role.model';

type EntityResponseType = HttpResponse<IStaffRole>;
type EntityArrayResponseType = HttpResponse<IStaffRole[]>;

@Injectable({ providedIn: 'root' })
export class StaffRoleService {
    private resourceUrl = SERVER_API_URL + 'api/staff-roles';

    constructor(private http: HttpClient) {}

    create(staffRole: IStaffRole): Observable<EntityResponseType> {
        return this.http.post<IStaffRole>(this.resourceUrl, staffRole, { observe: 'response' });
    }

    update(staffRole: IStaffRole): Observable<EntityResponseType> {
        return this.http.put<IStaffRole>(this.resourceUrl, staffRole, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IStaffRole>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IStaffRole[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

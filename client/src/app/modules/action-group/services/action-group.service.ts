import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActionGroup } from '../models/action-group.model';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        pragma: 'no-cache'
    })
    // withCredentials: true
};

@Injectable({ providedIn: 'root' })
export class ActionGroupService {
    private apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = `api/v1/action/groups/`;
    }
    getList() {
        const url = `${this.apiUrl}routes`;
        return this.http.get<ActionGroup>(url, httpOptions);
    }
    // getList(pager: any, searchForm: any): Observable<ApiResult> {
    //     searchForm = JSON.stringify(searchForm);
    //     const url = `${this.apiUrl}/list?pageIndex=${pager.pageIndex}&pageSize=${
    //         pager.pageSize
    //         }&searchForm=${searchForm}`;
    //     return this.http.get<ApiResult>(url, httpOptions);
    // }
}

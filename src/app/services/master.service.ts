import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponce } from '../model/Employee';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(private http: HttpClient) {}
  getParentDepartment() {
    return this.http.get<IApiResponce>(
      'https://projectapi.gerasim.in/api/EmployeeManagement/GetParentDepartment'
    );
  }
  getChildByParentDeptId(deptId: any): Observable<IApiResponce> {
    return this.http.get<IApiResponce>(
      `https://projectapi.gerasim.in/api/EmployeeManagement/GetChildDepartmentByParentId?deptId=${deptId}`
    );
  }
}

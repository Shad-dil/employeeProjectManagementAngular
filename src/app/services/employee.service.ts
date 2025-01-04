import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, IApiResponce } from '../model/Employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  createNewEmployee(employee: Employee): Observable<IApiResponce> {
    return this.http.post<IApiResponce>(
      'https://projectapi.gerasim.in/api/EmployeeManagement/CreateEmployee',
      employee
    );
  }
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      'https://projectapi.gerasim.in/api/EmployeeManagement/GetAllEmployees'
    );
  }
}

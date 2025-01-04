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
  deleteEmployeeById(id: number | null): Observable<IApiResponce> {
    return this.http.delete<IApiResponce>(
      `https://projectapi.gerasim.in/api/EmployeeManagement/DeleteEmployee/${id}`
    );
  }

  updateEmployee(employee: Employee): Observable<IApiResponce> {
    return this.http.put<IApiResponce>(
      `https://projectapi.gerasim.in/api/EmployeeManagement/UpdateEmployee/${employee.employeeId}`,
      employee
    );
  }
}

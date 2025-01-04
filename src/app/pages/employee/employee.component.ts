import { Component, inject, OnInit } from '@angular/core';
import { Form, FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  Employee,
  IApiResponce,
  IChildDepartment,
  IParentDepartment,
} from '../../model/Employee';
import { EmployeeService } from '../../services/employee.service';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-employee',
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  parentDepartList: IParentDepartment[] = [];
  childDepartList: IChildDepartment[] = [];
  employeeList: Employee[] = [];
  //::TODO: Injecting services
  masterService = inject(MasterService);
  employeeService = inject(EmployeeService);
  toastr = inject(ToastrService);
  deptId: number = 0;
  employeeObj: Employee = new Employee();

  ngOnInit(): void {
    this.getparentDeptList();
    this.getAllEmployees();
  }

  // Get All Employees Data
  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe((res) => {
      this.employeeList = res;
    });
  }
  //Get Parent Dept List on Page Loading
  getparentDeptList() {
    this.masterService.getParentDepartment().subscribe((data: IApiResponce) => {
      this.parentDepartList = data.data;
    });
  }
  //Get Child Dept List on Parent Dept Selection
  getChildDepartment() {
    this.masterService
      .getChildByParentDeptId(this.deptId)
      .subscribe((res: IApiResponce) => {
        this.childDepartList = res.data;
      });
  }
  // Add Employee on Form Submit
  addEmployee(form: Form) {
    this.employeeService
      .createNewEmployee(this.employeeObj)
      .subscribe((res: any) => {
        this.toastr.success(
          `Employee with ID ${res.employeeId} created successfully`
        );
        this.getAllEmployees();
      });
  }
}

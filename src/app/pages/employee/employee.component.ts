import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
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
  imports: [FormsModule, MatIconModule, CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  showModel: boolean = false;
  employeeIdToDelete: number | null = null;

  parentDepartList: IParentDepartment[] = [];
  childDepartList: IChildDepartment[] = [];
  employeeList: Employee[] = [];
  //::TODO: Injecting services
  masterService = inject(MasterService);
  employeeService = inject(EmployeeService);
  toastr = inject(ToastrService);
  deptId: number = 0;
  employeeObj: Employee = new Employee();
  isFormShow = signal<boolean>(false);
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
  addEmployee() {
    this.employeeService
      .createNewEmployee(this.employeeObj)
      .subscribe((res: any) => {
        this.toastr.success(
          `Employee with ID ${res.employeeId} created successfully`
        );
        this.getAllEmployees();
        this.resetForm();
      });
  }

  //Confirmation to Delete
  openModel(employeeId: number) {
    this.showModel = true;
    this.employeeIdToDelete = employeeId;
  }
  // Delete Employee
  deleteEmployee() {
    this.employeeService.deleteEmployeeById(this.employeeIdToDelete).subscribe({
      next: () => {
        this.toastr.success(
          `Employee with ID ${this.employeeIdToDelete} deleted successfully`
        );
        this.getAllEmployees();
        this.closeModal();
      },
      error: (error) => {
        this.toastr.error(error.message);
        this.closeModal();
      },
    });
  }

  // Close Model
  closeModal() {
    this.showModel = false;
    this.employeeIdToDelete = null;
  }

  //Edit Employee
  editEmployee(employee: Employee) {
    this.employeeObj = employee;
  }
  updateEmployee() {
    this.employeeService.updateEmployee(this.employeeObj).subscribe({
      next: () => {
        this.toastr.success(
          `Employee with ID ${this.employeeObj.employeeId} updated successfully`
        );
        this.getAllEmployees();
        this.resetForm();
      },
    });
  }

  // Reset Form
  resetForm() {
    this.employeeObj = new Employee();
  }
  addNew() {
    this.isFormShow.set(true);
  }
  closeForm() {
    this.isFormShow.set(false);
  }
}

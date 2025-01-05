import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from '../../model/Employee';
import { EmployeeService } from '../../services/employee.service';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-project',
  imports: [CommonModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent implements OnInit {
  currentView: string = 'list';
  projectForm: FormGroup = new FormGroup({});
  employeeList$: Observable<Employee[]> = new Observable<Employee[]>();
  employeeService = inject(EmployeeService);
  masterService = inject(MasterService);
  constructor() {
    this.initializeForm();
  }
  initializeForm() {
    this.projectForm = new FormGroup({
      projectId: new FormControl(0),
      projectName: new FormControl(''),
      clientName: new FormControl(''),
      startDate: new FormControl(''),
      leadByEmpId: new FormControl(''),
      contactPerson: new FormControl(''),
      contactNo: new FormControl(''),
      emailId: new FormControl(''),
    });
  }
  onSubmit() {
    console.log(this.projectForm);
  }

  ngOnInit(): void {
    this.employeeList$ = this.employeeService.getAllEmployees();
  }
}

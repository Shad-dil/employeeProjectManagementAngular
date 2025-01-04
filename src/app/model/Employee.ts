export class Employee {
  employeeId: number;
  employeeName: string;
  contactNo: string;
  emailId: string;
  deptId: number;
  password: string;
  gender: string;
  role: string;
  createdDate: Date;

  constructor() {
    this.employeeId = 0;
    this.employeeName = '';
    this.contactNo = '';
    this.emailId = '';
    this.deptId = 0;
    this.password = '';
    this.role = 'Employee';
    this.createdDate = new Date();
    this.gender = '';
  }
}

export interface IParentDepartment {
  departmentId: number;
  departmentName: string;
  departmentLogo: string;
}

export interface IChildDepartment {
  childDeptId: number;
  parentDeptId: number;
  departmentName: string;
}

export interface IApiResponce {
  message: string;
  result: boolean;
  data: any;
}

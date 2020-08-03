import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import{AddAdminUserServiceService }  from '../../../service/AddAdminUserService/addadminuserservice.service';

  


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  EmployeeName:string;
  EmployeeId:number;
  MailId:string;

  AccountName=[
    {name:'Standard life'},
   {name:'Aviva'}
  
  ];
  Role=[
    {name:'Developer'},
    {name:'Technical Lead'}
  ];

  username: any;
  public addForm:FormGroup;
  
  constructor(private addbyadmin:AddAdminUserServiceService,private router:Router,@Inject(DOCUMENT) private _document: Document) { }
  ngOnInit() {
    
  
    this.addForm = new FormGroup({
      EmployeeName: new FormControl('', Validators.required),
      EmployeeId: new FormControl(null,Validators.required),
      MailId: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
        AccountName:new FormControl('',Validators.required),
        Role:new FormControl('',Validators.required)

    });
    this.username=sessionStorage.getItem('authenticaterUser');
  }
 

  public hasError = (controlName: string, errorName: string) =>{
    return this.addForm.controls[controlName].hasError(errorName);
  }
  public onCancel = () => {
    this.ngOnInit();
  }

  
  onSubmit() {
    console.log(this.addForm.value.AccountName);
    console.log(this.addForm.value.Role);
    this.addbyadmin.addUserByAdmin(this.addForm.value).subscribe(
      data=>{ 
        alert("User created successfully!");
        console.log(data)
        this.addForm.reset();
        this.router.navigate(['dashboard',this.username]);
        this._document.defaultView.location.reload();
      }
    )
    
  }
 
}


  
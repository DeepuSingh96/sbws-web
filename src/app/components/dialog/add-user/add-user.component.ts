import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
//import { ActivatedRoute,Router } from '@angular/router';
import{CreatesbwsrequestService} from '../../../service/createsbwsrequest/createsbwsrequest.service';
import { DOCUMENT } from '@angular/common';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../Shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  addNewEmployee: FormGroup;
  submitted = false;
  constructor(public dialog : MatDialog,private formBuilder: FormBuilder,private createSBWSRequest:CreatesbwsrequestService, @Inject(DOCUMENT) private _document: Document) { }
  

 
  WorkModes = ["Personal Laptop","TCS Laptop","TCS Desktop"];
  Supervisors = ["Mohan Ragavendra Rao","Anila","Kavitha","ParamJyothi"];
  ParentUnits = ["BFSI"];
  TypeOfInternet=["PG Wifi","Mobile HOTSPOT","Personal internet"];
  YesOrNo=["Yes","No"]
  selectedOption : string = 'No';

  ngOnInit(): void {
    this.addNewEmployee = this.formBuilder.group({
      employeeNo: ['', Validators.required],
      employeeName: ['', Validators.required],
      accountId : [sessionStorage.getItem('userAccount'), Validators.required],
 /*     teamName  : ['', Validators.required],
      coId  : ['', Validators.required],
      presentLocation  : ['', Validators.required],
      workLocation  : ['', Validators.required],
      parentUnit  : ['', Validators.required],
      modeOfWorking  : ['', Validators.required],
      assetId  : ['', Validators.required],
      sbwsEnabled  : ['', Validators.required],
      leadSupervisorName  : ['', Validators.required],
      stayingInPg  : ['', Validators.required],
      tcsDesktop  : ['', Validators.required],
      typeOfInternetConnection  : ['', Validators.required],*/
  });
  }
  
 // convenience getter for easy access to form fields
 get f() { return this.addNewEmployee.controls; }

 refreshPage() {
  this._document.defaultView.location.reload();
}
 
 onSubmit() {
     this.submitted = true;
     // stop here if form is invalid
     if (this.addNewEmployee.invalid) {
      alert("Please fill all required fields");
         return;
     }
     else
     {
      let resp = this.createSBWSRequest.createrequest(this.addNewEmployee.value).subscribe(
        data =>{
          if(data==="User request created with the status of pending..")
          {
           // alert("User request created");
            this.refreshPage()
          }
          else
          {
            alert("User request alredy present")
          }
        },
        error=>
        {
          alert("User request not created")
          console.log(error);
          this.refreshPage()
        }
      );
     }
 }


 addUserDetail(){
  if (this.addNewEmployee.invalid) {
    alert("Please fill all required fields");
       return;
   }else{
  // let's call our modal window
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: "900px",
    data: {
        title: "Please cross check the employee number you are adding",
        message: this.addNewEmployee.get('employeeNo').value
      }
  });

  // listen to response
  dialogRef.afterClosed().subscribe(dialogResult => {
    // if user pressed yes dialogResult will be true, 
    // if he pressed no - it will be false
    console.log(dialogResult);

    if(dialogResult){
      this.onSubmit();
    }else{
      return;
    }
    
 });
   }
}

 onReset() {
     this.submitted = false;
     this.addNewEmployee.reset();
 }

}

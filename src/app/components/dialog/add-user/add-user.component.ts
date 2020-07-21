import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
//import { ActivatedRoute,Router } from '@angular/router';
import{CreatesbwsrequestService} from '../../../service/createsbwsrequest/createsbwsrequest.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  addNewEmployee: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,private createSBWSRequest:CreatesbwsrequestService, @Inject(DOCUMENT) private _document: Document) { }
  

  Accounts = ["Standard Life","Aviva"];
  WorkModes = ["Personal Laptop","TCS Laptop","TCS Desktop"];
  Supervisors = ["Mohan Ragavendra Rao","Anila","Kavitha","Shwetha"];
  ParentUnits = ["BFSI"];
  TypeOfInternet=["PG Wifi","Mobile HOTSPOT","Personal internet"];
  YesOrNo=["Yes","No"]
  selectedOption : string = 'No';

  ngOnInit(): void {
    this.addNewEmployee = this.formBuilder.group({
      employeeNo: ['', Validators.required],
      employeeName: ['', Validators.required],
      account_name : ['', Validators.required],
      teamName  : ['', Validators.required],
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
      typeOfInternetConnection  : ['', Validators.required],
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
          console.log(data);
          alert("Request created sucessfully");
          this.refreshPage()
        },
        error=>
        {
          console.log(error);
          alert("Request not created");
          this.refreshPage()
        }
      );
     }
 }

 onReset() {
     this.submitted = false;
     this.addNewEmployee.reset();
 }

}

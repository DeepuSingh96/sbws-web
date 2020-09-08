import { Component, OnInit , Inject} from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import{CreatesbwsrequestService} from '../../../service/createsbwsrequest/createsbwsrequest.service'
import { inject } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  
  
  editEmployee: FormGroup;
  submitted = false;
  static selectedEmployee: any;

  constructor(private formBuilder: FormBuilder,
    private createSBWSRequest:CreatesbwsrequestService,
    @Inject(DOCUMENT) private document : Document,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data :  any) { }

  
  Accounts = ["Standard Life","Aviva"];
  WorkModes = ["Personal Laptop","TCS Laptop","TCS Desktop"];
  Supervisors = ["Mohan Ragavendra Rao","Anila","Kavitha","Shwetha"];
  ParentUnits = ["BFSI"];
  TypeOfInternet=["PG Wifi","Mobile HOTSPOT","Personal internet"];
  YesOrNo=["Yes","No"]
  selectedOption : string = 'No';
  selectedEmployee = this.data.dataKey.employeeNo;
  username:'';
  ngOnInit(): void {
   // this.username=this.router.snapshot.params['username'];
      this.editEmployee = this.formBuilder.group({
        employeeNo: [this.selectedEmployee, Validators.required],
        employeeName: [this.data.dataKey.employeeName, Validators.required],
        accountId : [sessionStorage.getItem('userAccount'), Validators.required],
        teamName  : [this.data.dataKey.teamName, Validators.required],
        coId  : [this.data.dataKey.coId, Validators.required],
        presentLocation  : [this.data.dataKey.presentLocation, Validators.required],
        workLocation  : [this.data.dataKey.workLocation, Validators.required],
        parentUnit  : [this.data.dataKey.parentUnit, Validators.required],
        modeOfWorking  : [this.data.dataKey.modeOfWorking, Validators.required],
        assetId  : [this.data.dataKey.assetId, Validators.required],
        sbwsEnabled  : [this.data.dataKey.sbwsEnabled, Validators.required],
        leadSupervisorName  : [this.data.dataKey.leadSupervisorName, Validators.required],
        stayingInPg  : [this.data.dataKey.stayingInPg, Validators.required],
        tcsDesktop  : [this.data.dataKey.tcsDesktop, Validators.required],
        typeOfInternetConnection  : [this.data.dataKey.typeOfInternetConnection, Validators.required],
        backupResource :  [this.data.dataKey.backupResource, Validators.required]
    });

    // Set default values
    if(this.editEmployee.get('modeOfWorking').value==null){
      this.editEmployee.controls['modeOfWorking'].setValue(this.WorkModes[2]);
    }
    if(this.editEmployee.get('sbwsEnabled').value==null){
      this.editEmployee.controls['sbwsEnabled'].setValue(this.YesOrNo[0]);
    }
    if(this.editEmployee.get('presentLocation').value==null){
      this.editEmployee.controls['presentLocation'].setValue("Bangalore");
    }
    if(this.editEmployee.get('workLocation').value==null){
      this.editEmployee.controls['workLocation'].setValue("Bangalore");
    }
    if(this.editEmployee.get('stayingInPg').value==null){
      this.editEmployee.controls['stayingInPg'].setValue(this.YesOrNo[1]);
    }
    if(this.editEmployee.get('parentUnit').value==null){
      this.editEmployee.controls['parentUnit'].setValue(this.ParentUnits[0]);
    }
    if(this.editEmployee.get('tcsDesktop').value==null){
      this.editEmployee.controls['tcsDesktop'].setValue(this.YesOrNo[0]);
    }
    if(this.editEmployee.get('typeOfInternetConnection').value==null){
      this.editEmployee.controls['typeOfInternetConnection'].setValue(this.TypeOfInternet[2]);
    }
    if(this.editEmployee.get('backupResource').value==null){
      this.editEmployee.controls['backupResource'].setValue("NA");
    }
  }
  
 // convenience getter for easy access to form fields
 get f() { return this.editEmployee.controls; }

 onUpdate() {
  this.submitted = true;
  // stop here if form is invalid
  if (this.editEmployee.invalid) {
   alert("Please fill all required fields");
      return;
  }
  else
  {
   let resp = this.createSBWSRequest.updaterequest("{{username}}",this.selectedEmployee,this.editEmployee.value).subscribe(
     data =>{
       console.log(data);
       this.document.defaultView.location.reload();
     },
     error=>{
       console.log(error);
       this.document.defaultView.location.reload();
     }
   );
  }
}
}


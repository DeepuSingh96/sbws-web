import { Component, OnInit } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { NgModel, FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  
  constructor() { }

  Accounts = ["Standard Life","Aviva"];
  WorkModes = ["Personal Laptop","TCS Laptop","TCS Desktop"];
  Supervisors = ["Mohan Ragavendra Rao","Anila","Kavitha","Shwetha"];
  selectedOption : string = 'No';


  addNewEmployee = new FormGroup({
    slNo : new FormControl('', [Validators.required]),
    empNumber : new FormControl('', [Validators.required]),
    empName : new FormControl('', [Validators.required]),
    empAccount : new FormControl('', [Validators.required]),
    empTeamName : new FormControl('', [Validators.required]),
    coid : new FormControl('', [Validators.required]),
    empContact : new FormControl('', [Validators.required]),
    empAlterNumber : new FormControl('', [Validators.required]),
    empAddress : new FormControl('', [Validators.required]),
    empPresentLocation : new FormControl('', [Validators.required]),
    empWorkLocation : new FormControl('', [Validators.required]),
    empParentUnit : new FormControl('', [Validators.required]),
    empModeofWorking : new FormControl('', [Validators.required]),
    empAssetId : new FormControl('', [Validators.required]),
    empSBWS : new FormControl('', [Validators.required]),
    empSupervisor : new FormControl('', [Validators.required]),
    empPG : new FormControl('', [Validators.required]),
    desktopTCS : new FormControl('', [Validators.required]),
    wifiTCS : new FormControl(''),
    upsTCS : new FormControl(''),
    typeofInternet : new FormControl('', [Validators.required])
    


  });
  
  // convenience getter for easy access to form fields
  get emp() { return this.addNewEmployee.controls; }

  ngOnInit(): void {
  }
  
  onSubmit() {
    console.log(this.addNewEmployee.value);
  }

}

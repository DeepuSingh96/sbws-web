import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit, ViewChild,Inject,HostListener} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AddUserComponent} from 'src/app/components/dialog/add-user/add-user.component';
import {EditUserComponent} from 'src/app/components/dialog/edit-user/edit-user.component';
import {UploadFileComponent} from 'src/app/components/dialog/upload-file/upload-file.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { ActivatedRoute,Router } from '@angular/router';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import { DashboardService } from '../../../service/dashboard/dashboard.service';
import { DeleteUserComponent } from '../../dialog/delete-user/delete-user.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { element } from 'protractor';
import { DOCUMENT } from '@angular/common';

import { BehaviorSubject, Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
// import { TestBed } from '@angular/core/testing';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  title(title: any) {
    throw new Error("Method not implemented.");
  };
  showToggle: string;
  mode: string;
  openSidenav:boolean;
  private screenWidth$ = new BehaviorSubject<number>
    (window.innerWidth);

  ELEMENT_DATA: Element[] = [];
  displayedColumns = ['action', 'employeeNo', 'employeeName', 'accountId', 'teamName', 'coId','presentLocation',
'workLocation','parentUnit','modeOfWorking','assetId','sbwsEnabled','leadSupervisorName','stayingInPg','tcsDesktop','typeOfInternetConnection','backupResource'];

  dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
  selection = new SelectionModel<Element>(true, []);
  data = Object.assign(this.ELEMENT_DATA);


 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('sidenav') matSidenav: MatSidenav;

  constructor(public dialog : MatDialog,private route:ActivatedRoute,
              public authenticate:AuthenticationService,
              private router:Router,
              private dashboardService:DashboardService,@Inject(DOCUMENT) private document: Document
              ) { }
  username = '';
  userRole='';
  userAccount='';
  employeeName='';
  deleteCount:number;
  deleteStatus:boolean;
  pendingCount:number;
  pendingStatus:boolean;
  inAllRecord:boolean=false;
  //Default function to run on page load
  ngOnInit() {
    this.username=sessionStorage.getItem('authenticaterUser');
    this.userRole= sessionStorage.getItem('userRole');
    this.userAccount=sessionStorage.getItem('userAccount');
    this.employeeName = sessionStorage.getItem('employeeName');
    console.log(sessionStorage.getItem('employeeName'));
    this.refreshDashboard();

    this.getScreenWidth().subscribe(width => {
      if (width < 640) {
       this.showToggle = 'show';
       this.mode = 'over';
       this.openSidenav = false;
     }
     else if (width > 640) {
       this.showToggle = 'hide';
       this.mode = 'side';
       this.openSidenav = true;
     }
   });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth$.next(event.target.innerWidth);
  }
  getScreenWidth(): Observable<number> {
    return this.screenWidth$.asObservable();
  }
  //Load data from database on page load
  refreshDashboard()
  {
    console.log("yhi h username"+this.username);
    if(!this.inAllRecord)
   { this.inAllRecord=true;
    
  }

    this.dashboardService.retrieveDashboard(this.username).subscribe(
      response => {
        this.ELEMENT_DATA=response;
        this.dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
        this.data = Object.assign(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  };

  //Logout from current session
  LogOut()
  {
    this.authenticate.logout();
    this.router.navigate(['login']);
  };

  onCreate() {
    const dialogCong = new MatDialogConfig();
    dialogCong.disableClose = true;
    dialogCong.autoFocus = true;
    dialogCong.width = "65%";
    dialogCong.height ="38%";
    this.dialog.open(AddUserComponent,dialogCong);
  };

  edit(element){
    if(this.isSelected){
      let dialogCong = this.dialog.open(EditUserComponent,{
        disableClose : true,
        autoFocus : true,
        width : "70%",
        height :"85%",
        data:{
          dataKey : element,
        }
      });

   };
 };

 delete(element)
 {  if(element.createdBy===this.username)
  {this.deleteStatus=true;}
  else{
    this.deleteStatus=false;
  }
   if(this.isSelected){
    let dialogCong = this.dialog.open(DeleteUserComponent,{
      disableClose : true,
      autoFocus : true,
      width : "70%",
      data:{
        dataKey : element.employeeNo,
        deleteStatus:this.deleteStatus
      }
    });
  }
 };

 addUser(){
  let dialogCong = this.dialog.open(AdminDashboardComponent,{
    disableClose : true,
    autoFocus : true,
    width : "70%",
    data:{
      dataKey :  this.username,
    }
  });
}

  onUpload() {
    const dialogCong = new MatDialogConfig();
    dialogCong.disableClose = true;
    dialogCong.autoFocus = true;
    dialogCong.width = "45%";
    this.dialog.open(UploadFileComponent,dialogCong);
  };

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  };

  isSelected(){
    this.selection.selected.forEach(item => {
      let index: number = this.data.findIndex(d => d === item);
      console.log(this.data.findIndex(d => d === item));
      this.data.splice(index,1)
      this.dataSource = new MatTableDataSource<Element>(this.data);
    });
    this.selection = new SelectionModel<Element>(true, []);
  };

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  };

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Element): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    // return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  };

  removeSelectedRows() {
      this.selection.selected.forEach(item => {
      let index: number = this.data.findIndex(d => d === item);
      console.log(this.data.findIndex(d => d === item));
      this.data.splice(index,1)
      this.dataSource = new MatTableDataSource<Element>(this.data);
    });
    this.selection = new SelectionModel<Element>(true, []);
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  };


/*Start of Below Section for only expoert report in Excel */
   //Below array used to genarate csutom export
   AText :Array<any> = [];
   emailFormArray: Array<any> = [];
   exportSelection=[];
   masterSelected:boolean;

   //List of Column want to show on Custome export popup
   customExportColumns = [
 // {name :"position", id: 0},
 {name :"employeeNo", desc :"Employee No" ,id: 2,isSelected:false},
 {name :"employeeName",desc :"Employee Name" , id: 3,isSelected:false},
 {name :"accountId", desc :"Account Name" ,id: 4,isSelected:false},
 {name :"teamName",desc :"Team Name" , id: 5,isSelected:false},
 {name :"coId", desc :"CO ID" ,id: 6,isSelected:false},
 {name :"presentLocation", desc :"Present Location" ,id: 7,isSelected:false},
 {name :"workLocation",desc :"Work Location" , id: 8,isSelected:false},
 {name :"parentUnit",desc :"Parent Unit" , id: 9,isSelected:false},
 {name :"modeOfWorking", desc :"Mode of Working" ,id: 10,isSelected:false},
 {name :"assetId", desc :"Asset ID" ,id: 11,isSelected:false},
 {name :"sbwsEnabled", desc :"SBWS Enabled" ,id: 12,isSelected:false},
 {name :"leadSupervisorName",desc :"Lead Supervisor Name" , id: 13,isSelected:false},
 {name :"stayingInPg",desc :"Staying in PG" , id: 14,isSelected:false},
 {name :"tcsDesktop", desc :"TCS Desktop" ,id: 15,isSelected:false},
 {name :"typeOfInternetConnection",desc :"Type Of Internet Conenction" , id: 16,isSelected:false},
 {name :"backupResource", desc :"Backup Resource" ,id: 17,isSelected:false},
 ];

//helping to add element to generate custom excel report
  onChange(email:any, isChecked: boolean) {
    if(isChecked) {
      this.AText.push(email.name);
    } else {
      //let index = this.emailFormArray.indexOf(email.id);
      let indexname = this.AText.indexOf(email.name);
      //this.emailFormArray.splice(index,1);
      this.AText.splice(indexname,1);
    }
    this.masterSelected = this.customExportColumns.every(function(item:any) {
      return item.isSelected == true;
    });
};

  //Helping to create selection for custom report
createcustomcolumns()
{
this.exportSelection=[];
this.displayedColumns.forEach(el => {
  if (this.AText.find(el1 => el1 === el)) {
    this.exportSelection.push(null);
    } else {
      this.exportSelection.push({"hidden": true});
  }
});
};

//Funtion to generate Excel sheet
exportExcel() {
const workSheet = XLSX.utils.json_to_sheet(this.ELEMENT_DATA, {header:[]});
 if(this.AText.length!=0)
 {
   this.createcustomcolumns();
   workSheet['!cols'] = this.exportSelection;
 }
  const workBook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
  XLSX.writeFile(workBook, 'filename.xlsx');
  this.document.defaultView.location.reload();
};

checkUncheckAll() {
  this.exportSelection=[];
  for (var i = 0; i < this.customExportColumns.length; i++) {
    this.customExportColumns[i].isSelected = this.masterSelected;
    if(this.customExportColumns[i].isSelected) {
      this.AText.push(this.customExportColumns[i].name);
    } else {
      let indexname = this.AText.indexOf(this.customExportColumns[i].name);
      this.AText.splice(indexname,1);
    }
  }
};

isAllSelectedCustomerepoert() {
  this.masterSelected = this.customExportColumns.every(function(item:any) {
      return item.isSelected == true;
    })
};

deletedRecord(){
  console.log("click on delete recorded button");

    this.dashboardService.retrievedeleteDashboard(this.username).subscribe(
      response => {

        this.deleteCount=response.length;
        this.deleteStatus=true;
        this.ELEMENT_DATA=response;
        this.dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
        this.data = Object.assign(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error=>{
        this.deleteStatus=false;
      }
    )
}

pendingRecord(){
  console.log("click on pending recorded button");
  this.dashboardService.retrievependingDashboard(this.username).subscribe(
    response => {

      this.pendingCount=response.length;
      this.pendingStatus=true;
      this.ELEMENT_DATA=response;
      this.dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
      this.data = Object.assign(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    error=>{
      this.deleteStatus=false;
    }
  )
}

};
/*End of Below Section for only expoert report in Excel */


//Interface to get data from database column name always same as used in database
export interface Element {
  slNo:string,
  employeeNo:number,
  employeeName:string,
  accountId:string,
  teamName:string,
  coId:string,
  presentLocation:string,
  workLocation:string,
  parentUnit:string,
  modeOfWorking:string,
  assetId:string,
  sbwsEnabled:string,
  leadSupervisorName:string,
  stayingInPg:string,
  tcsDesktop:string,
  typeOfInternetConnection:string,
  backupResource:string
};

// const ELEMENT_DATA: Element[] = [];

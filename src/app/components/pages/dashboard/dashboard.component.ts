import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AddUserComponent} from 'src/app/components/dialog/add-user/add-user.component'
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { ActivatedRoute,Router } from '@angular/router';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import { DashboardService } from '../../../service/dashboard/dashboard.service';
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

  ELEMENT_DATA: Element[] = [];
  displayedColumns = ['select', 'employeeNo', 'employeeName', 'accountId', 'teamName', 'coId','presentLocation',
'workLocation','parentUnit','modeOfWorking','assetId','sbwsEnabled','leadSupervisorName','stayingInPg','tcsDesktop','typeOfInternetConnection'];
 
  dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
  selection = new SelectionModel<Element>(true, []);
  data = Object.assign(this.ELEMENT_DATA);


 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog : MatDialog,private route:ActivatedRoute,
              public authenticate:AuthenticationService,
              private router:Router,
              private dashboardService:DashboardService
              ) { }
  username = ''

  //Default function to run on page load
  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    this.username=this.route.snapshot.params['username'];
    this.refreshDashboard();
  }


  //Load data from database on page load
  refreshDashboard()
  {
    this.dashboardService.retrieveDashboard(this.username).subscribe(
      response => {
        //console.log(response);
        this.ELEMENT_DATA=response;
        //console.log('data from element_data'+this.ELEMENT_DATA);
        this.dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
        //console.log('new data source'+this.dataSource);
        this.data = Object.assign(this.ELEMENT_DATA);
        //console.log('data from data'+this.data);
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
    dialogCong.width = "70%";
    this.dialog.open(AddUserComponent,dialogCong);
  };

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
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
 {name :"employeeNo", id: 1,isSelected:false},
 {name :"employeeName", id: 2,isSelected:false},
 {name :"accountId", id: 3,isSelected:false},
 {name :"teamName", id: 4,isSelected:false},
 {name :"coId", id: 5,isSelected:false},
 {name :"presentLocation", id: 6,isSelected:false},
 {name :"workLocation", id: 7,isSelected:false},
 {name :"parentUnit", id: 8,isSelected:false},
 {name :"modeOfWorking", id: 9,isSelected:false},
 {name :"assetId", id: 10,isSelected:false},
 {name :"sbwsEnabled", id: 11,isSelected:false},
 {name :"leadSupervisorName", id: 12,isSelected:false},
 {name :"stayingInPg", id: 13,isSelected:false},
 {name :"tcsDesktop", id: 14,isSelected:false},
 {name :"typeOfInternetConnection", id: 15,isSelected:false},
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
createsample()
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
   this.createsample();
   workSheet['!cols'] = this.exportSelection;
 }
  const workBook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
  XLSX.writeFile(workBook, 'filename.xlsx');
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
};
/*End of Below Section for only expoert report in Excel */


//Interface to get data from database column name always same as used in database
export interface Element {
  slNo:string,
  employeeNo:number,
  employeeName:string,
  accountId:number,
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
};

// const ELEMENT_DATA: Element[] = [];

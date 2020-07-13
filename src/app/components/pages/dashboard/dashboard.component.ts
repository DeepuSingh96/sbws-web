import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AddUserComponent} from 'src/app/components/dialog/add-user/add-user.component'
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { CustomExporter } from '../dashboard/custom-exporter';
import * as XLSX from 'xlsx';
import { ActivatedRoute,Router } from '@angular/router';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import { DashboardService } from '../../../service/dashboard/dashboard.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  title(title: any) {
    throw new Error("Method not implemented.");
  }
  ELEMENT_DATA: Element[] = [];
  displayedColumns = ['select', 'employeeNo', 'employeeName', 'accountId', 'teamName', 'coId','presentLocation',
'workLocation','parentUnit','modeOfWorking','assetId','sbwsEnabled','leadSupervisorName','stayingInPg','tcsDesktop','typeOfInternetConnection'];
 dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
  selection = new SelectionModel<Element>(true, []);
  data = Object.assign(this.ELEMENT_DATA);
  AText :Array<any> = [];

  emailFormArray: Array<any> = [];
  selection1=[];
  categories = [
// {name :"position", id: 0},
{name :"employeeNo", id: 1},
{name :"employeeName", id: 2},
{name :"accountId", id: 3},
{name :"teamName", id: 4},
{name :"coId", id: 5},
{name :"presentLocation", id: 6},
{name :"workLocation", id: 7},
{name :"parentUnit", id: 8},
{name :"modeOfWorking", id: 9},
{name :"assetId", id: 10},
{name :"sbwsEnabled", id: 11},
{name :"leadSupervisorName", id: 12},
{name :"stayingInPg", id: 13},
{name :"tcsDesktop", id: 14},
{name :"typeOfInternetConnection", id: 15},
];

  customExporter: CustomExporter;

 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog : MatDialog,private route:ActivatedRoute,
              public authenticate:AuthenticationService,
              private router:Router,
              private dashboardService:DashboardService
              ) { }
  username = ''
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.customExporter = new CustomExporter();
    // console.log(this.route.snapshot.params['username']);
    this.username=this.route.snapshot.params['username'];
    this.refreshDashboard();
  }

  refreshDashboard()
  {
    this.dashboardService.retrieveDashboard(this.username).subscribe(
      response => {
        console.log(response);
        this.ELEMENT_DATA=response
      }
    )
  }

  LogOut()
  {
    this.authenticate.logout();
    this.router.navigate(['login']);

  }

  onCreate() {
    const dialogCong = new MatDialogConfig();
    dialogCong.disableClose = true;
    dialogCong.autoFocus = true;
    dialogCong.width = "70%";

    this.dialog.open(AddUserComponent,dialogCong);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.ELEMENT_DATA.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.ELEMENT_DATA.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Element): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    // return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  removeSelectedRows() {

    this.selection.selected.forEach(item => {
      let index: number = this.data.findIndex(d => d === item);
      console.log(this.data.findIndex(d => d === item));
      this.data.splice(index,1)
      this.dataSource = new MatTableDataSource<Element>(this.data);
    });
    this.selection = new SelectionModel<Element>(true, []);
  }



  onChange(email:any, isChecked: boolean) {
    if(isChecked) {
      this.emailFormArray.push(email.id);
      this.AText.push(email.name);
    } else {
      let index = this.emailFormArray.indexOf(email.id);
      let indexname = this.emailFormArray.indexOf(email.name);
      this.emailFormArray.splice(index,1);
      this.AText.splice(indexname,1);
    }
}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createsample()
{
this.selection1=[];
this.displayedColumns.forEach(el => {
  if (this.AText.find(el1 => el1 === el)) {
    this.selection1.push(null);
    } else {
      this.selection1.push({"hidden": true});
  }
});
}

  exportExcel() {
  const workSheet = XLSX.utils.json_to_sheet(this.ELEMENT_DATA, {header:[]});
 if(this.AText.length!=0)
 {
   this.createsample();
   workSheet['!cols'] = this.selection1;
 }
  const workBook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
  XLSX.writeFile(workBook, 'filename.xlsx');
}

}




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
}

const ELEMENT_DATA: Element[] = [];

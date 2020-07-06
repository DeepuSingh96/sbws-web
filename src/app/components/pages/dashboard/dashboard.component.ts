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



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  title(title: any) {
    throw new Error("Method not implemented.");
  }
  displayedColumns = ['select', 'position', 'id', 'name', 'account', 'team', 'coid', 'contactno'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  selection = new SelectionModel<Element>(true, []);
  data = Object.assign( ELEMENT_DATA);
  AText :Array<any> = [];

  emailFormArray: Array<any> = [];
  selection1=[];
  categories = [
    {name :"position", id: 0},
    {name :"id", id: 1},
    {name :"name", id: 2},
    {name :"account", id: 3},
    {name :"team", id: 4},
    {name :"coid", id: 5},
    {name :"contactno", id: 6}
  ];

  customExporter: CustomExporter;

 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog : MatDialog,private route:ActivatedRoute,
              public authenticate:AuthenticationService,
              private router:Router) { }
  username = ''
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.customExporter = new CustomExporter();
    // console.log(this.route.snapshot.params['username']);
    this.username=this.route.snapshot.params['username'];
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
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Element): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
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
  const workSheet = XLSX.utils.json_to_sheet(this.dataSource.data, {header:[]});
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
  name: string;
  position: number;
  id: number;
  account: string;
  team:string;
  coid:string;
  contactno:number;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Rashmi', id: 1337672, account: 'SL', team:'Java',
  coid:'CO60598', contactno: 9964183076},
  {position: 2, name: 'AAAA', id: 1337672, account: 'SL',team:'Java',
  coid:'CO60598', contactno: 9964183076},
  {position: 3, name: 'AAAA', id: 1337672, account: 'SL',team:'Java',
  coid:'CO60598', contactno: 9964183076},
  {position: 4, name: 'AAAA', id: 1337672, account: 'SL',team:'Java',
  coid:'CO60598', contactno: 9964183076},
  {position: 5, name: 'AAAA', id: 1337672, account: 'SL',team:'Java',
  coid:'CO60598', contactno: 9964183076},
  {position: 6, name: 'AAAA', id: 1337672, account: 'SL',team:'Java',
  coid:'CO60598', contactno: 9964183076},/*
  {position: 3, name: 'BBBB', id: 1337672, account: 'SL',team:'Java',
  coid:'CO60598', contactno: 9964183076, address:'Whitefield, Bangalore',
  presentlocation:'Bangalore', worklocation:'Offshore', parentunit:'BFSI, UK 2.3',
  modeofworking:'TCS Desktop',assetid:'01HW0212332', sbwsenabled:'Yes',
  leadname:'Shwetha Shetty', stayinginpg:'No', wifiadaptor: 'No',
  upsbytcs: 'No', typeofinternetconnect:'WiFi'},
  {position: 4, name: 'CCCC', id: 1337672, account: 'SL', team:'Java',
  coid:'CO60598', contactno: 9964183076, address:'Whitefield, Bangalore',
  presentlocation:'Bangalore', worklocation:'Offshore', parentunit:'BFSI, UK 2.3',
  modeofworking:'TCS Desktop',assetid:'01HW0212332', sbwsenabled:'Yes',
  leadname:'Shwetha Shetty', stayinginpg:'No', wifiadaptor: 'No',
  upsbytcs: 'No', typeofinternetconnect:'WiFi'},
  {position: 5, name: 'DDDD', id: 1337672, account: 'SL', team:'Java',
  coid:'CO60598', contactno: 9964183076, address:'Whitefield, Bangalore',
  presentlocation:'Bangalore', worklocation:'Offshore', parentunit:'BFSI, UK 2.3',
  modeofworking:'TCS Desktop',assetid:'01HW0212332', sbwsenabled:'Yes',
  leadname:'Shwetha Shetty', stayinginpg:'No', wifiadaptor: 'No',
  upsbytcs: 'No', typeofinternetconnect:'WiFi'},
  {position: 6, name: 'FFFFF', id: 1337672, account: 'SL', team:'Java',
  coid:'CO60598', contactno: 9964183076, address:'Whitefield, Bangalore',
  presentlocation:'Bangalore', worklocation:'Offshore', parentunit:'BFSI, UK 2.3',
  modeofworking:'TCS Desktop',assetid:'01HW0212332', sbwsenabled:'Yes',
  leadname:'Shwetha Shetty', stayinginpg:'No', wifiadaptor: 'No',
  upsbytcs: 'No', typeofinternetconnect:'WiFi'},
  {position: 7, name: 'GGGG', id: 1337672, account: 'SL', team:'Java',
  coid:'CO60598', contactno: 9964183076, address:'Whitefield, Bangalore',
  presentlocation:'Bangalore', worklocation:'Offshore', parentunit:'BFSI, UK 2.3',
  modeofworking:'TCS Desktop',assetid:'01HW0212332', sbwsenabled:'Yes',
  leadname:'Shwetha Shetty', stayinginpg:'No', wifiadaptor: 'No',
  upsbytcs: 'No', typeofinternetconnect:'WiFi'},
  {position: 8, name: 'HHHH', id: 1337672, account: 'SL', team:'Java',
  coid:'CO60598', contactno: 9964183076, address:'Whitefield, Bangalore',
  presentlocation:'Bangalore', worklocation:'Offshore', parentunit:'BFSI, UK 2.3',
  modeofworking:'TCS Desktop',assetid:'01HW0212332', sbwsenabled:'Yes',
  leadname:'Shwetha Shetty', stayinginpg:'No', wifiadaptor: 'No',
  upsbytcs: 'No', typeofinternetconnect:'WiFi'},
  {position: 9, name: 'IIII', id: 1337672, account: 'SL', team:'Java',
  coid:'CO60598', contactno: 9964183076, address:'Whitefield, Bangalore',
  presentlocation:'Bangalore', worklocation:'Offshore', parentunit:'BFSI, UK 2.3',
  modeofworking:'TCS Desktop',assetid:'01HW0212332', sbwsenabled:'Yes',
  leadname:'Shwetha Shetty', stayinginpg:'No', wifiadaptor: 'No',
  upsbytcs: 'No', typeofinternetconnect:'WiFi'},
  {position: 10, name: 'JJJJ', id: 1337672, account: 'SL', team:'Java',
  coid:'CO60598', contactno: 9964183076, address:'Whitefield, Bangalore',
  presentlocation:'Bangalore', worklocation:'Offshore', parentunit:'BFSI, UK 2.3',
  modeofworking:'TCS Desktop',assetid:'01HW0212332', sbwsenabled:'Yes',
  leadname:'Shwetha Shetty', stayinginpg:'No', wifiadaptor: 'No',
  upsbytcs: 'No', typeofinternetconnect:'WiFi'}, */
];

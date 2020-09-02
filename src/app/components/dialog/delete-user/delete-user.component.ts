import { Component, OnInit , Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import{DeletesbwsrequestService} from '../../../service/deletesbwsrequest/deletesbwsrequest.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {


  constructor(
    private deletesbwsrequest:DeletesbwsrequestService,
    @Inject(DOCUMENT) private document : Document,
    @Inject(MAT_DIALOG_DATA) public data :  any,
    
  ) { }

  username:string;
  deleteStatus:boolean;

  ngOnInit(): void {
    this.username=sessionStorage.getItem('authenticaterUser');
    this.deleteStatus=this.data.deleteStatus;
  }
  delete()
  {
      let resp = this.deletesbwsrequest.deleterequest(this.username,this.data.dataKey);
      resp.subscribe(
        data=>{
          this.document.defaultView.location.reload();
        },
        error=>{
          this.document.defaultView.location.reload();
        }
      )
      this.document.location.reload();
  }

}

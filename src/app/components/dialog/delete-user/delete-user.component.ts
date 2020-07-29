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

  username:'';

  ngOnInit(): void {
    
  }
  delete()
  {
    //if(confirm("Are you sure to delete")){
      alert(this.data.dataKey)
      let resp = this.deletesbwsrequest.deleterequest("loggedin",this.data.dataKey);
      resp.subscribe(
        data=>{
          alert('Request Deleted')
          this.document.defaultView.location.reload();
        },
        error=>{
          alert('Request Not Deleted')
          this.document.defaultView.location.reload();
        }
      )
      this.document.location.reload();
  //}
  }

}

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
      let resp = this.deletesbwsrequest.deleterequest("{{username}}",this.data.dataKey,this.delete);
      resp.subscribe(
        data=>{
          alert('FeedBack Deleted')
          this.document.defaultView.location.reload();
        },
        error=>{
          alert('FeedBack Not Deleted')
          this.document.defaultView.location.reload();
        }
      )
      this.document.location.reload();
  //}
  }

}

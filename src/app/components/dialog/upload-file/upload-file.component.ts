import { Component, OnInit,ViewChild, Inject } from '@angular/core';
import * as XLSX from 'xlsx';
import { DOCUMENT } from '@angular/common';
import{CreatesbwsrequestService} from '../../../service/createsbwsrequest/createsbwsrequest.service';


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  constructor(private createSBWSRequest:CreatesbwsrequestService, @Inject(DOCUMENT) private _document: Document) { }

  refreshPage() {
    this._document.defaultView.location.reload();
  }

  ngOnInit(): void {

  }

  arrayBuffer:any;
  file:File;
  incomingfile(event)
    {
    this.file= event.target.files[0];
    }

  Upload() {
    let fileReader = new FileReader();
      fileReader.onload = (e) => {
          this.arrayBuffer = fileReader.result;
          var data = new Uint8Array(this.arrayBuffer);
          var arr = new Array();
          for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
          var bstr = arr.join("");
          var workbook = XLSX.read(bstr, {type:"binary"});
          var first_sheet_name = workbook.SheetNames[0];
          var worksheet = workbook.Sheets[first_sheet_name];
          var xlsx = XLSX.utils.sheet_to_json(worksheet,{raw:true});
          //console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
          for(var i=0;i!=xlsx.length;i++){
              this.createSBWSRequest.uploadefilerequest(xlsx[i]).subscribe(
                  data =>{
                    if(data==="User request created")
                      {
                      //alert("User request created");
                      this.refreshPage()
                      }
                    else
                    {
                      alert("User request alredy present")
                    }
                  },
                  error=>
                  {
                    alert("User request created and had error")
                    console.log(error);
                    this.refreshPage()
                  }
              );
            }
      }

      fileReader.readAsArrayBuffer(this.file);
    }
}

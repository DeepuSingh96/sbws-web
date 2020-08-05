import { Component, OnInit } from '@angular/core';
import { ResetPasswordService } from '../../../service/resetPassword/reset-password.service';
import { LoginService } from '../../../service/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  // myImg:String="assests/image/ult.pnj"
  enterEmail=''
  enterPassword=''
  enterUsername=''
  enterRePassword=''
  oldPassword=''
  errorMessage='';
  successMessage='';
  invalidUser=false;

  constructor(private loginService: LoginService,private resetPasswordService: ResetPasswordService,private router:Router) { }

  ngOnInit(): void {
  }

  SignIn()
  {
    let resp = this.loginService.SignIn(this.enterUsername,this.enterPassword);
    resp.subscribe(
      data=>{ if(data==="login success")
          {
            sessionStorage.setItem('authenticaterUser',this.enterUsername);
            this.router.navigate(['dashboard']);
            this.invalidUser=false;

          }
          else{
            this.invalidUser=true;
            this.errorMessage='Invalid Credentials';
          }},
      error=>
        {
          this.invalidUser=true;
          this.errorMessage='Invalid Credentials';
        }
       )
  }

  resetPwd()
  {
    if(this.enterPassword===this.enterRePassword && this.enterPassword!=='')
    {
    let resp = this.resetPasswordService.resetPassword(this.enterUsername,this.oldPassword,this.enterPassword);
    resp.subscribe(
      data=>{ 
        console.log(data)
        if(data==="Password Updated")
          {
            this.invalidUser=false;
            this.successMessage='Password Updated';
          }
          else if(data==="User Not Exist"){
            this.invalidUser=true;
            this.errorMessage='User Not Exist';
          }
          else if(data==="Old password mismatch")
          {
            this.invalidUser=true;
            this.errorMessage='Old password mismatch';
          }
        else
       {
        this.invalidUser=true;
        this.errorMessage='Password Not Updated';
      }},
      error=>
        {
          this.invalidUser=true;
          this.errorMessage='Password Not Updated';
        }
       )
  }
  else{
    this.invalidUser=true;
    this.errorMessage='Password and confirm password mismatch';
    return;
  }
}
//url="/src/assets/images/ult.png";
url='../../../../assets/images/ult.png';
}

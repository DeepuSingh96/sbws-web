import { Component, OnInit } from '@angular/core';

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
  errorMessage='';
  invalidUser=false;

  constructor(private loginService: LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  SignIn()
  {
    console.log('hi signIn');
    console.log(this.enterEmail);
    console.log(this.enterPassword);
    let resp = this.loginService.SignIn(this.enterEmail,this.enterPassword);
    resp.subscribe(
      data=>{ if(data==="login success")
          {
            console.log(data)
            sessionStorage.setItem('authenticaterUser',this.enterEmail);
            this.router.navigate(['dashboard',this.enterEmail]);
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
  SignUp()
  {
    console.log('hello signUp');
    console.log(this.enterUsername);
    console.log(this.enterPassword);
    console.log(this.enterEmail);
    console.log(this.enterRePassword);
  }
//url="/src/assets/images/ult.png";
url='../../../../assets/images/ult.png';
}

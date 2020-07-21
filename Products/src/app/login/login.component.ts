import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserDetails={email:"",password:""};
  constructor(private _auth:AuthService,private router: Router) { }
  loginUser(){
  //console.log(this.loginUserDetails);
  this._auth.loginUser(this.loginUserDetails)
    .subscribe(
      res=>{
        console.log(res);
        console.log(res["token"]);
        
      localStorage.setItem('token',res["token"]);
      this.router.navigate(['/']);    
      },
      err=>console.log(err)  
      // res=>{
      //     alert("Success");
      //     this.router.navigate(['/']);
      //     },
      // err=>{alert("Login Failed");
      //     this.router.navigate(['/login']);
      //   }      
    );
    // alert("Success");
  }
  ngOnInit(): void {
  }
}

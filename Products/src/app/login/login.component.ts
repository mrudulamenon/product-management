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
      res=>console.log(res),
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
    this.router.navigate(['/']);
    
  }
  ngOnInit(): void {
  }

}

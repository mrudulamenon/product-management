import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registeredUser = {email:"",password:""};

  constructor(private _auth:AuthService,private router: Router) { }

  registerUser(){
    this._auth.registerUser(this.registeredUser)
    .subscribe(
      res=>{
        console.log(res);
        console.log(res["token"]);
        
      localStorage.setItem('token',res["token"]);
      alert("Registration Success");
      this.router.navigate(['/']);
  
      },
      err=>console.log(err)   
      
    );
  }
  ngOnInit(): void {
  }
  
}

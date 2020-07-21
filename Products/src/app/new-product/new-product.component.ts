import { Component, OnInit } from '@angular/core';
import { ProductModel } from './new-product.model';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  title:String = "Add Product";

  constructor(private _auth: AuthService,private productService: ProductService,private router: Router) { }
  productItem= new ProductModel(null,null,null,null,null,null,null,null);
  
  ngOnInit(): void {
    // this._auth.getAuthentication
    this.productService.addProductPage()
    .subscribe(
      res =>{        
        console.log(res);                
      },
      err=>{
        console.log(err);
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
          this.router.navigate(['/login']);
          }
        }
      }
    )
  }
  AddProduct(){
    this.productService.newProduct(this.productItem);        
    console.log("called");
    alert("Success");
    this.router.navigate(['/']);
    
  }

}

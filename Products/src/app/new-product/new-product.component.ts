import { Component, OnInit } from '@angular/core';
import { ProductModel } from './new-product.model';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  title:String = "Add Product";

  constructor(private productService: ProductService,private router: Router) { }
  productItem= new ProductModel(null,null,null,null,null,null,null,null);
  
  ngOnInit(): void {
  }
  AddProduct(){
    this.productService.newProduct(this.productItem);        
    console.log("called");
    alert("Success");
    this.router.navigate(['/']);
    
  }

}

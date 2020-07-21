import { Component, OnInit } from '@angular/core';
import { ProductModel } from './product.model';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  title: String = "Product List";
  //Product is the model for a product item
  products: ProductModel[];
  //image properties
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  //creating service object for calling getProducts()
  constructor(private productService: ProductService,private _auth: AuthService,private router: Router) { }
  toggleImage(): void {
    this.showImage = !this.showImage;
  }
  loggedIn(){
    return this._auth.loggedIn();
  }
 
  ngOnInit(): void {
    //calling getProducts() and loading the products to products array
    this.productService.getProducts()
      .subscribe((data) => {
        this.products = JSON.parse(JSON.stringify(data));
        //console.log("Pro"+this.products[0]._id);
        //console.log("data"+data[0]._id);      
      })
  }
  deleteProduct(id): void {
    if (window.confirm("Are you sure you want to delete?")){
      this.productService.deleteProduct(id)
        .subscribe((data) => {
          this.products = JSON.parse(JSON.stringify(data));
          //console.log("deleted" + data);
          //this.router.navigate(['/']);
        });
    }
    else{
      this.router.navigate(['/']);
    }
  }


}

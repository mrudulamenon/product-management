import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from '../product-list/product.model';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  title:String = "Edit Product";
  // productItem: ProductModel[];

  p_id="";
  constructor(private _route:ActivatedRoute,private productService: ProductService,private router: Router) { }
  productItem= new ProductModel(null,null,null,null,null,null,null,null,null);


  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      this.p_id = params['p_id']
    });
    console.log("id"+this.p_id);
    this.productService.editProduct(this.p_id).subscribe((data)=>{
      this.productItem=JSON.parse(JSON.stringify(data));
      //console.log(data);
      //console.log(this.productItem);                 
    });
  }

  UpdateProduct(){
    this.productService.updateProduct(this.productItem);
    console.log("called for update");
    alert("Success update");
    this.router.navigate(['/']);
  }


}

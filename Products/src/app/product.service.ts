import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private http:HttpClient) { }
  getProducts(){
    return this.http.get("http://localhost:3000/products");
  }
  addProductPage(){
    return this.http.get("http://localhost:3000/addpage");
  }
  newProduct(item){
    return this.http.post("http://localhost:3000/insert",{"product":item})
    .subscribe(data => {console.log(data)});
  }
  editProduct(id){
    return this.http.get("http://localhost:3000/edit/"+id);
    }
  updateProduct(item){
    return this.http.post("http://localhost:3000/update",{"product":item})
    .subscribe(data => {console.log("updateservice"+data)});
  }
  deleteProduct(id){
    return this.http.get("http://localhost:3000/delete/"+id);
  }
}

import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products: Product[] = [];
  input_num: number[] = [];

  constructor(private productService: ProductService) {
    this.input_num = [];
   }

  ngOnInit(): void {
    this.productService.listAll().subscribe(data => {
      this.products = data;
      this.products.forEach(p => this.input_num.push(0));
    });
  }

  addProduct(){}

  deleteProduct(id: string){
    this.productService.deleteProduct(id);
  }

  addToCart(id: string, db: number){
    this.productService.addToCart(id, this.input_num[db]).subscribe(next => console.log("Siker"));
  }

}

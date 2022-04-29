import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.productService.listCart().subscribe(prods => this.products = prods);
  }


  deleteCart(){
    this.productService.deleteCartContent().subscribe(_ => console.log("Kosar torolve"));
  }

  buyProducts(){
    this.productService.buyProducts().subscribe(_ => console.log("Megveve"));
    window.location.reload();
  }



}

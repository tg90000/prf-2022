import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addForm: FormGroup;
  loading = false;
  submitted = false;
  prod: Product = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService) {
  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      nev: ['', [Validators.required]],
      ar: ['', [Validators.required]],
      darab: ['', [Validators.required]]
    });
  }

  get controls() {
    return this.addForm.controls;
  }

  async onSubmit() {
    if (this.addForm.invalid) {
      return;
    }
    this.submitted = true;
    this.loading = true;

    const _nev = this.addForm.get('nev').value;
    const _ar = Number(this.addForm.get('ar').value);
    const _darab = Number(this.addForm.get('darab').value);

    this.prod = {
      _id: null,
      nev: _nev,
      ar: _ar,
      darab: _darab
    }

    this.productService.addProduct(this.prod).subscribe(_ => {
      console.log("Hozzáadva");
      this.submitted = false;
      this.loading = false;
      this.router.navigateByUrl('/shop')
    });
  }
}


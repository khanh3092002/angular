import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router, ActivatedRoute } from '@angular/router'


type PRODUCT_TYPE = {
  id: number,
  name: string,
  desc: string,
  price: number
};

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  products: any;
  constructor(private ps: ProductService,
      private router: Router) { }
  ngOnInit(): void {
    this.onget();
    // this.router.navigate(['/product'])
  }
  onget() {
    this.ps.getProducts().subscribe(data => {
      this.products = data;
    });
  }
  dell(id: number) {
    this.ps.Del(id).subscribe(data => {
    this.onget();
    });

  }
}

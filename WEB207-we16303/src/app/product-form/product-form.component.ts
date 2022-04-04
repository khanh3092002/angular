import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productDetail: any;
  id: any;
  products: any;
  constructor(
    private ActiRoute: ActivatedRoute, // sử dụng để lấy id trên url
    private router: Router, // sử dụng để diều hướng
    private ps: ProductService
  ) { }
  ngOnInit(): void {
    this.id = this.ActiRoute.snapshot.params['id'];
    if (this.id !== undefined) {
      this.ps.getProduct(this.id).subscribe(data => {
        this.productDetail = data;
      })
    } else {
      this.productDetail =
      {
        name: '',
        desc: '',
        price: 0
      }
    }
  }
  onsubmit(obj: any) {
    // nhận dữ liệu từ form và tiến hành call api
    if (this.id != undefined) {
      this.ps.updateProduct(this.id, obj).subscribe()
    } else {
      this.ps.createProduct(obj).subscribe(data=>{
        this.products = data;  
      })
    }
    // tiến hành điều hướng về trang danh sách
    this.router.navigate(['/product'])
  }
}

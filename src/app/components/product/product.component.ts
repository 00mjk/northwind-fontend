import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  dataLoaded = false;
  filterText = '';

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    //servisi enjekte edip kullanabiliyoruz.
    private toastrService: ToastrService,
    private cartService:CartService) {}

  ngOnInit(): void {
    console.log('Init çalıştı');
    this.activatedRoute.params.subscribe((params) => {
      if (params['categoryId']) {
        this.getProductsByCategory(params['categoryId']);
      } else {
        this.getProducts();
      }
    });
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.data;
      this.dataLoaded = true;
    });
  }

  getProductsByCategory(categoryId: number) {
    this.productService
      .getProductsByCategory(categoryId)
      .subscribe((response) => {
        this.products = response.data;
        this.dataLoaded = true;
      });
  }

  addToCart(product: Product) {
    //logic kodlar burada yazılır.
    if(product.productId===1){
      this.toastrService.error("Bu ürün sepete eklenemez.","Hata");
    }
    else{
      this.toastrService.success('Sepete eklendi.', product.productName);
      this.cartService.addToCart(product); //sepete eklemek istediğimiz heryerde söyle ekleyebiliriz.
    }    
  }
}

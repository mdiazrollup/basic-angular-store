import { Component, OnInit } from '@angular/core';
import { Product } from '../product.interface';
import { ProductService } from '../product.service';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  title = 'Products';
 // products: Product[];
  products$: Observable<Product[]>;
  selectedProduct: Product;
  errorMessage: string;

  // Pagination
  pageSize = 5;
  start = 0;
  end = this.pageSize;
  currentPage = 1;

  constructor(
    private productService: ProductService,
    private router: Router) {
  }

  ngOnInit(): void {
    //  this.productService.products$.subscribe(results => this.products = results);

    // With pipe async
    this.products$ = this
                    .productService
                    .products$
                    .pipe(
                      catchError(error => {
                        this.errorMessage = error;
                        return EMPTY;
                      })
                    );
  }

  onSelect(product: Product) {
    this.selectedProduct = product;
    this.router.navigateByUrl(`/products/${product.id}`);
  }

  nextPage() {
    this.start += this.pageSize;
    this.end += this.pageSize;
    this.currentPage++;
    this.selectedProduct = null;
  }

  previousPage() {
    this.start -= this.pageSize;
    this.end -= this.pageSize;
    this.currentPage--;
    this.selectedProduct = null;
  }

}

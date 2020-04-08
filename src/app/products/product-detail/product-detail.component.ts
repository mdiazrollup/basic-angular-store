import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { map, find, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
    ) { }

  ngOnInit(): void {
    const id = + this.activatedRoute.snapshot.params.id; // Return a string, add "+" to convert to number

    this.productService
    .products$
    .pipe(
      flatMap(p => p), // Create a product sequence
      find(product => product.id === id)
    //  map(products => products.find(p => p.id === id))
    )
    .subscribe(
      product => this.product = product
    );
  }

  delete(id: number) {
    if (window.confirm('Are you sure?')) {
      this.productService
      .deleteProduct(id)
      .subscribe(
        () => {
          console.log('Product deleted');
          this.productService.initProducts();
          this.router.navigateByUrl('/products');
        },
        error => console.log('Product can not be deleted')
      );
    }
  }

}

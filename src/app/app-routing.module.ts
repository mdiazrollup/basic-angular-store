import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './shared/home.component';
import { ContactComponent } from './shared/contact.component';
import { AdminComponent } from './shared/admin.component';
import { ErrorComponent } from './shared/error.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'}, // full path match => the empty path
  {path: 'home', component: HomeComponent}, // Prefix path match
  {path: 'contact', component: ContactComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)},
  {path: '**', component: ErrorComponent} // wildcard for the other paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})], // Preload a max of module on lazyloading
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { ContactComponent } from './contact.component';
import { ErrorComponent } from './error.component';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [ // Not exported because never used as tag
    AdminComponent,
    ContactComponent,
    ErrorComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule
  ],
})
export class SharedModule { }

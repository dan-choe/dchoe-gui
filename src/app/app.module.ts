import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeadComponent } from './head/head.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
// import { MatNativeDataModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule
    // MatNativeDataModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

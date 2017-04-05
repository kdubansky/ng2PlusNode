import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component'; // Generic Angular 2 seed component

// Custom services ---------------------------------------------------

import { HackHttpWrapper } from './common/http/hack.http.wrapper';

// Custom components -------------------------------------------------

import { HackNavbarComponent } from './navbar/hack.navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HackNavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    HackHttpWrapper
  ],
  bootstrap: [
    AppComponent,
    HackNavbarComponent
  ]
})
export class AppModule { }

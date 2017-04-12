import { EventService } from './events/shared/events.service'
import { EventThumbnailComponent } from './events/event-thumbnail.component';
import { EventsListComponent} from './events/events-list.component'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

//Vender stuff
import 'hammerjs';
import { MaterialModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    EventsListComponent,
    EventThumbnailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }

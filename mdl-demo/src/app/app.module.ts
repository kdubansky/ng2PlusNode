import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

//3rd party modules
import { MdlModule } from 'angular2-mdl';
import { MyNewComponent } from './my-new/my-new.component';
import { DecisionEnginesComponent } from './decision-engines/decision-engines.component';
import { EnvironmentsComponent } from './environments/environments.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    MyNewComponent,
    DecisionEnginesComponent,
    EnvironmentsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

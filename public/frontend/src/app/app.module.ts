import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AppComponent } from './app.component';

import { Routing } from './app.routing';
import { AuthGuard } from './_guard';
import { JwtInterceptor } from './_helpers';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationService } from './authentication/authentication.service';
import { HomepageComponent } from './homepage/homepage.component';
import { RoomComponent } from './room/room.component';
import { RoomRepositoryService } from './room/room-repository.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    HomepageComponent,
    RoomComponent    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    Routing
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    RoomRepositoryService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

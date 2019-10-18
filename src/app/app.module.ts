import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { RoutingModule } from './modules';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BasicAuthInterceptor } from './interceptors/bases.interception';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { fakeBackendProvider } from './interceptors/fake-backend.interceptor';
import { LoaderService } from './shared/loader/services/loader.service';
import { LoaderModule } from './shared/loader/loader.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RoutingModule,
    LoaderModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider,
    LoaderService
  ],
  bootstrap: [
    AppComponent
  ],
})

export class AppModule { }

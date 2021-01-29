import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import * as userReducer from './users/user.reducer';
import { UserEffect } from './users/user.effects';
import * as projectReducer from './projects/project.reducer';
import { ProjectEffect } from './projects/project.effects';
import { RouterModule } from '@angular/router';

import { AppConstant } from './_constants';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { TokenInterceptorService } from './_interceptors/token-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';


export function tokenGetter() {
    return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule,
    AuthModule,
    HttpClientModule,
    DragDropModule,
    JwtModule.forRoot({
        config: {
            tokenGetter: tokenGetter,
            allowedDomains: ['localhost:3000'],
            disallowedRoutes: []
        }
    }),
    BrowserAnimationsModule,
    StoreModule.forRoot({
        user: userReducer.reducer,
        project: projectReducer.reducer
    }),
    StoreDevtoolsModule.instrument({
        maxAge: 10
    }),
    EffectsModule.forRoot([UserEffect, ProjectEffect])
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
  },
      AppConstant
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

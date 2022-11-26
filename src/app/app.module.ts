// Core
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// Components
import { AppComponent } from './app.component';
import { CategoriasComponent } from './Pages/categorias/categorias.component';
import { AtractivosComponent } from './Pages/atractivos/atractivos.component';
import { AsociadosComponent } from './Pages/asociados/asociados.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { LoginComponent} from './login/login.component';
import { MainNavComponent } from './main-nav/main-nav.component';
// Services
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './admin/admin.component';

export function tokenGetter() {
    return sessionStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    CategoriasComponent,
    AtractivosComponent,
    AsociadosComponent,
    DashboardComponent,
    LoginComponent,
    MainNavComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
        config: {
            tokenGetter: tokenGetter,
            allowedDomains: [
                
            ],
            disallowedRoutes: [
                
            ]
        }
    })
  ],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        AuthService,
        AuthGuard
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

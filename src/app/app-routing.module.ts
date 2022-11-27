import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { CategoriasComponent } from './Pages/categorias/categorias.component';
import { AtractivosComponent } from './Pages/atractivos/atractivos.component';
import { AsociadosComponent } from './Pages/asociados/asociados.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [

    { path: 'admin', component:AdminComponent,
    children: [
        { path:'dashboard', component: DashboardComponent },
        { path:'categorias', component: CategoriasComponent },
        { path:'atractivos', component: AtractivosComponent },
        { path:'asociados', component: AsociadosComponent }
        ]
    },
    { path: '', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

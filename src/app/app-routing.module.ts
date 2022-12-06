import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerAuthGuard } from './guard/seller-auth.guard';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },{
    path:"seller-auth",
    component: SellerAuthComponent
  },

  {
    path:"seller-home",
    component:SellerHomeComponent,
    canActivate: [SellerAuthGuard]
  },  
  {
    path:"**",
    component:NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

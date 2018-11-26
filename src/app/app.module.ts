import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ManageRestaurantService } from './services/manage-restaurant.service';
import { UserService } from './services/user.service';
import { HomeService } from './services/home.service';
import { CuisineService } from './services/cuisine.service';
import { CartService } from './services/cart.service';
import { AuthService } from './authentication/auth.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { CuisinesComponent } from './components/cuisines/cuisines.component';
import { EditDishComponent } from './components/edit-dish/edit-dish.component';
import { EditRestaurantComponent } from './components/edit-restaurant/edit-restaurant.component';
import { CartComponent } from './components/cart/cart.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AuthGuard } from './guards/auth.guard';
import { NgxPaginationModule } from "ngx-pagination"


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'restaurants', component: RestaurantComponent, canActivate:[AuthGuard]},
  { path: 'register', component: RegisterComponent},
  { path: 'cart', component: CartComponent },
  { path: 'cuisines', component: CuisinesComponent, canActivate:[AuthGuard] },
  { path: 'edit/:id', component: EditDishComponent },
  { path: 'editRes/:id', component: EditRestaurantComponent },
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'order', component: OrdersComponent, canActivate:[AuthGuard]}

];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    RestaurantComponent,
    CuisinesComponent,
    EditDishComponent,
    CartComponent,
    EditRestaurantComponent,
    NavbarComponent,
    LoginComponent,
    LogoutComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ManageRestaurantService,
    UserService,
    HomeService,
    CuisineService,
    CartService,
    AuthService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

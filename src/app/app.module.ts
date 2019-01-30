import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { StudentComponent } from './student/student.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { AdminnotificationsComponent } from './adminnotifications/adminnotifications.component';
import { AdminresultComponent } from './adminresult/adminresult.component';
import { StudentprofileComponent } from './studentprofile/studentprofile.component';
import { StudentnotificationsComponent } from './studentnotifications/studentnotifications.component';
import { StudentresultsComponent } from './studentresults/studentresults.component';
import { CarouselComponent } from './carousel/carousel.component';
import { SearchPipe } from './search.pipe';
import { AuthorizationService } from './authorization.service';
import { UserdetailsComponent } from './userdetails/userdetails.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutusComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    StudentComponent,
    AdminprofileComponent,
    AdminnotificationsComponent,
    AdminresultComponent,
    StudentprofileComponent,
    StudentnotificationsComponent,
    StudentresultsComponent,
    CarouselComponent,
    SearchPipe,
    UserdetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,HttpClientModule,NgxPaginationModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,
                useClass:AuthorizationService,
                multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

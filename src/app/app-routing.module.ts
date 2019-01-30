import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { UserdetailsComponent } from './userdetails/userdetails.component';

const routes: Routes = [
                        {path:'home',component:HomeComponent,
                        children:[
                          {path:'',component:CarouselComponent},
                           {path:'aboutus',component:AboutusComponent},
                           {path:'register',component:RegisterComponent},
                           {path:'login',component:LoginComponent}
                        ]},
                       {path:'admin',component:AdminComponent,
                          children:[
                            {path:'adminprofile',component:AdminprofileComponent},
                            {path:'adminnotifications',component:AdminnotificationsComponent},
                            {path:'adminresult',component:AdminresultComponent},{path:'userdetails',component:UserdetailsComponent} ,{path:'',redirectTo:'adminprofile',pathMatch:'full'}
                          ]
                        },
                   
                        {path:'student',component:StudentComponent,
                         children:[{path:'studentprofile',component:StudentprofileComponent},
                         {path:'studentnotifications',component:StudentnotificationsComponent},
                        {path:'studentresults',component:StudentresultsComponent},{path:'',redirectTo:'studentprofile',pathMatch:'full'}
                      ]},
                      {path:'',redirectTo:'home',pathMatch:'full'}
                    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

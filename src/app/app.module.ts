import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { RegisterUserComponent } from './components/pages/register-user/register-user.component';
import { AddUserComponent } from './components/dialog/add-user/add-user.component';
import { EditUserComponent } from './components/dialog/edit-user/edit-user.component';
import { DeleteUserComponent } from './components/dialog/delete-user/delete-user.component';
import { AdminDashboardComponent } from './components/pages/admin-dashboard/admin-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponent } from './components/error/error.component';
import { MaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { UploadFileComponent } from './components/dialog/upload-file/upload-file.component';
import { HttpInterceptorBasicAuthService } from './service/http/http-interceptor-basic-auth.service';
import { ConfirmDialogComponent } from './components/Shared/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RegisterUserComponent,
    AddUserComponent,
    EditUserComponent,
    DeleteUserComponent,
    AdminDashboardComponent,
    ErrorComponent,
    UploadFileComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
     MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatDividerModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  providers: [

     {provide:HTTP_INTERCEPTORS,useClass : HttpInterceptorBasicAuthService,multi:true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

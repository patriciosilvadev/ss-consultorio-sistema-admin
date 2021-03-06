import { NgModule } from '@angular/core';
import { NbMenuModule, NbSpinnerModule } from '@nebular/theme';

import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
} from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';

@NgModule({
  imports: [
    SharedModule,
    NbMenuModule,
    CommonModule,
    NbLayoutModule,
    NbCardModule,
    NbCheckboxModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    RouterModule,
    FormsModule,
    NbIconModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    NbSpinnerModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    RecuperarSenhaComponent
  ],
})
export class AuthModule {
}

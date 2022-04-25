import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register.component';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import { ConnectionService } from 'src/app/services/connection.service';
import { SessionService } from 'src/app/services/session.service';

const routes: Routes = [
  {path: '', component: RegisterComponent},
];

@NgModule({
  declarations: [
    RegisterComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  providers: [
    ConnectionService,
    SessionService,
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
  ],
})
export class RegisterModule {
}

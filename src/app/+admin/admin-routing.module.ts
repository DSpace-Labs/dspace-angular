import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersPageComponent } from './users-page/users-page.component';

@NgModule({
  imports: [
    RouterModule.forChild([
       { path: 'users', component: UsersPageComponent },
    ])
  ]
})
export class AdminRoutingModule {

}

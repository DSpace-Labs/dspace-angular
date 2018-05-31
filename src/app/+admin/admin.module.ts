import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersPageComponent } from './users-page/users-page.component';

@NgModule({
  imports: [
    AdminRoutingModule
  ],
  declarations: [
    UsersPageComponent
  ],
  providers: [
  ],
  entryComponents: [
  ]
})
export class AdminModule {
}

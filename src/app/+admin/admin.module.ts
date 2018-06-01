import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersPageComponent } from './users-page/users-page.component';

@NgModule({
  imports: [
    AdminRoutingModule,
    SharedModule
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

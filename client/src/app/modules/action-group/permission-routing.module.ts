import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActionGroupComponent } from './components/list/action-group.component';

const routes: Routes = [
  { path: '', component: ActionGroupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionRoutingModule { }

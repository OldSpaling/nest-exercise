import { NgModule } from '@angular/core';

import { PermissionRoutingModule } from './permission-routing.module';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';
import { IconsProviderModule } from '../../icons-provider.module';
import { ActionGroupComponent } from './components/list/action-group.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    PermissionRoutingModule,
    CommonModule,
    HttpClientModule,
    NgZorroAntdModule,
    IconsProviderModule],
  declarations: [ActionGroupComponent],
  exports: [ActionGroupComponent]
})
export class PermissionModule { }

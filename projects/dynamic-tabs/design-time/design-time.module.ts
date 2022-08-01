import { ComponentFactoryResolver, Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicComponentRegistry, DYNAMIC_COMPONENT_REGISTRY } from 'form-core';
import { TabsComponent } from './components/tabs/tabs.component';

@NgModule({
  declarations: [
    TabsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DesignTimeModule {

}

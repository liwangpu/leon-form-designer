import { NgModule } from '@angular/core';
import { DesignerModule } from 'form-designer/designer';
import { DesignTimeModule as TabsDesignTimeModule } from 'dynamic-tabs/design-time/design-time.module';
import { RunTimeModule as TabsRunTimeModule } from 'dynamic-tabs/run-time';

@NgModule({
  imports: [
    DesignerModule,
    TabsDesignTimeModule,
    TabsRunTimeModule
  ]
})
export class DesignerLoaderModule { }

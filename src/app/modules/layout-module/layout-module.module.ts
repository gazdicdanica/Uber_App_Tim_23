import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { UnregisteredMainComponent } from './unregistered-main/unregistered-main.component';



@NgModule({
  declarations: [
    NavigationBarComponent,
    UnregisteredMainComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LayoutModuleModule { }

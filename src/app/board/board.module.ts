import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardRoutingModule } from './board-routing.module';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [HeaderComponent, MainComponent],
  imports: [
    CommonModule,
    BoardRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule
  ]
})
export class BoardModule { }

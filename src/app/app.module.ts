import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { RoutingModule } from './routing.module';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SideNavComponent } from './side-bar/side-nav/side-nav.component';
import { MainListComponent } from './main-list/main-list.component';
import { CardComponent } from './main-list/card/card.component';
import { SearchComponent } from './main-list/search/search.component';

import { ProfileComponent } from './dialogs/profile/profile.component';
import { SettingsComponent } from './dialogs/settings/settings.component';
import { ContactComponent } from './dialogs/contact/contact.component';
import { AddTaskComponent } from './dialogs/add-task/add-task.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    SideNavComponent,
    MainListComponent,
    CardComponent,
    SearchComponent,
    ProfileComponent,
    SettingsComponent,
    ContactComponent,
    AddTaskComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourcesComponent } from './cources/cources.component';
import { TopicsComponent } from './topics/topics.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { QuestionsComponent } from './questions/questions.component';
import { AddquestionsComponent } from './addquestions/addquestions.component';
import { AddSubjectsComponent } from './add-subjects/add-subjects.component';
import { AddtopicsComponent } from './addtopics/addtopics.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    CourcesComponent,
    TopicsComponent,
    SubjectsComponent,
    QuestionsComponent,
    AddquestionsComponent,
    AddSubjectsComponent,
    AddtopicsComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

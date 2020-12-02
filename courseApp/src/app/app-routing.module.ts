import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSubjectsComponent } from './add-subjects/add-subjects.component';
import { AddquestionsComponent } from './addquestions/addquestions.component';
import { AddtopicsComponent } from './addtopics/addtopics.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { QuestionsComponent } from './questions/questions.component';
import { RegistrationComponent } from './registration/registration.component';
import { TopicsComponent } from './topics/topics.component';


const routes: Routes = [
  { path: '',component:HomeComponent},
  { path: 'questions/:subjectId/:topicId/:topic', component: QuestionsComponent},
  { path: 'subject/:id', component: TopicsComponent },
  { path: 'addQuestions', component: AddquestionsComponent },
  { path: 'addSubjects', component: AddSubjectsComponent },
  { path: 'addTopics', component: AddtopicsComponent },
  { path: 'Sign-in', component: LoginComponent },
  { path: 'Sign-up', component: RegistrationComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListToDoComponent } from './list-to-do/list-to-do.component';
import { TestObservablesComponent } from './test-observables/test-observables.component';

const routes: Routes = [
  {path:'toDo', component:ListToDoComponent},
  {path:'testObservables', component:TestObservablesComponent},
  {path:'**', component:ListToDoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

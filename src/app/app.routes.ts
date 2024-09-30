import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { TaskComponent } from './task/task.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
    {path : "", redirectTo: '/login',pathMatch:'full'},
    {path : "login",component: LoginComponent},
    {path : "register",component: RegisterComponent},
    {path : "tasks",component: TaskComponent},
    {path : "users",component: UsersComponent},
    {path : "**" , component: NotfoundComponent}
];

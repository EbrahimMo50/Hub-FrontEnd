import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { TaskComponent } from './task/task.component';
import { UsersComponent } from './users/users.component';
import { taskGuard } from './task.guard';
import { ProfileComponent } from './profile/profile.component';
import { GroupComponent } from './group/group.component';

export const routes: Routes = [
    {path : "", redirectTo: '/profile',pathMatch:'full'},
    {path : "login",component: LoginComponent},
    {path : "register",component: RegisterComponent},
    {path : "tasks",component: TaskComponent, canActivate: [taskGuard]},
    {path : "users",component: UsersComponent},
    {path : "profile",component: ProfileComponent},
    {path : "groups" ,component: GroupComponent},
    {path : "**" , component: NotfoundComponent},
];

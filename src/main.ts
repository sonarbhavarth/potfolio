import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { RootComponent } from './app/root.component';
import { AppComponent } from './app/app.component';
import { AdminComponent } from './app/admin.component';

import { ProjectDetailComponent } from './app/project-detail.component';
import { LoginComponent } from './app/login.component';

bootstrapApplication(RootComponent, {
  providers: [
    provideRouter([
      { path: '', component: AppComponent },
      { path: 'login', component: LoginComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'project/:id', component: ProjectDetailComponent }
    ])
  ]
}).catch((err) => console.error(err));

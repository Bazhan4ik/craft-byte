import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: "",
        loadComponent: () => import('./home/home.page').then(c => c.HomePage)
    },
    {
        path: "contact",
        loadComponent: () => import('./contact/contact.page').then(c => c.ContactPage)
    },
    {
        path: "**",
        redirectTo: "contact",
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            anchorScrolling: "enabled",
            scrollOffset: [0, 64],
            scrollPositionRestoration: "disabled",
            preloadingStrategy: PreloadAllModules,
            initialNavigation: 'enabledBlocking'
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }

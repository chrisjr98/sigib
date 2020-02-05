import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from '@angular/router';
import { MenuAcademicoAdministradorComponent } from 'src/app/componentes/menu-academico-administrador/menu-academico-administrador/menu-academico-administrador.component';

const routes: Routes = [
  {
    path: "academico",
    children: [
      {
        path: "",
        component: MenuAcademicoAdministradorComponent
      },
    ]
  },
  {
    path: "",
    redirectTo: "academico",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class AcademicoRoutingModule {}

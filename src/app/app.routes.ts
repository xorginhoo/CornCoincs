import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { EsqueciSenhaComponent } from './pages/esqueceusenha/esqueceusenha.component';
import { EducacoincsComponent } from './pages/educacoincs/educacoincs.component';
import { ColheitadosaberComponent } from './pages/colheitadosaber/colheitadosaber.component';
import { MissoesComponent } from './pages/missoes/missoes.component';
import { MemorygameComponent } from './pages/memorygame/memorygame.component';
import { MemorygameLoginComponent } from './pages/memorygame-login/memorygame-login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'esqueceusenha', component: EsqueciSenhaComponent },
  { path: 'educacoincs', component: EducacoincsComponent },
  { path: 'colheitadosaber', component: ColheitadosaberComponent },
  { path: 'missoes', component: MissoesComponent },
  { path: 'memorygame', component: MemorygameComponent },
  { path: 'memorygame-login', component: MemorygameLoginComponent },
];

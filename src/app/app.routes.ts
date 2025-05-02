import { Routes } from '@angular/router';
import { PaginaprincipalComponent } from './Components/paginaprincipal/paginaprincipal.component';
import { LoginComponent } from './Components/login/login.component';
import { authGuard } from './Guards/auth.guard';
import { ProductoComponent } from './Components/pages/producto/producto.component';
import { RegistrarProductoComponent } from './Components/pages/producto/registrar-producto/registrar-producto.component';
import { EditarProductoComponent } from './Components/pages/producto/editar-producto/editar-producto.component';
import { TransportistaComponent } from './Components/pages/transportista/transportista.component';
import { RegistrarTransportistaComponent } from './Components/pages/transportista/registrar-transportista/registrar-transportista.component';
import { EditarTransportistaComponent } from './Components/pages/transportista/editar-transportista/editar-transportista.component';
import { CompraComponent } from './Components/pages/compra/compra.component';
import { UsuarioComponent} from './Components/pages/usuario/usuario.component';
import { RegistrarUsuarioComponent } from './Components/pages/usuario/registrar-usuario/registrar-usuario.component';
import { EditarUsuarioComponent } from './Components/pages/usuario/editar-usuario/editar-usuario.component';
import { PaginaprincipalAdminComponent } from './Components/paginaprincipal-admin/paginaprincipal-admin.component';



export const routes: Routes = [
    { 
        path: 'paginaprincipal', 
        component: PaginaprincipalComponent, // Usa tu componente principal
        canActivate: [authGuard] // Protege la ruta con el guard
    },
    {
      path:'paginaprincipal-admin',
      component: PaginaprincipalAdminComponent,
      canActivate: [authGuard] // Protege la ruta con el guard
    },
      { 
        path: 'login', 
        component: LoginComponent 
      },
      {
        path: 'producto', 
        component: ProductoComponent, 
        title: 'Lista de Productos'
      },
      {
        path: 'producto/registrar-producto/:id',
        component: RegistrarProductoComponent, 
        title: 'Registrar Producto' 
      },
      { path: 'producto/editar-producto/:id',
        component: EditarProductoComponent, 
        title: 'Editar Producto'
      },
      { path: 'transportista',
        component: TransportistaComponent,
        title: 'Lista de Transportistas'
      },
      {
        path: 'transportista/registrar-transportista/:id',
        component: RegistrarTransportistaComponent,
        title: 'Registrar Transportista'
      },
      {
        path:'trasportista/editar-transportista/:id',
        component: EditarTransportistaComponent,
        title: 'Editar Transportista'
      },
      {
        path:'compra',
        component: CompraComponent,
        title: 'Lista de Compras'
      },
      {
        path:'usuario',
        component: UsuarioComponent,
        title: 'Lista de Usuarios'
      },
      {
        path: 'registrar-usuario/:id',
        component: RegistrarUsuarioComponent,
        title: 'Registrar Usuario'
      },
      {
        path:'editar-usuario/:id',
        component: EditarUsuarioComponent,
        title: 'Editar Usuario'
      },
      
];

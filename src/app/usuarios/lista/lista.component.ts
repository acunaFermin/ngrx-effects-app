import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { cargarUsuarios } from 'src/app/store/actions';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: []
})
export class ListaComponent implements OnInit {

  usuarios: Usuario[] = [];
  loading:boolean = false;
  error:any;

  constructor( 
    private store:Store<AppState>
  ) { }

  ngOnInit() {

    this.store.select('usuarios').subscribe( ({users, loading, error}) => {
      console.log({users})
      this.usuarios = users;
      this.loading = loading; 
      this.error = error;
    })
    
    this.store.dispatch(cargarUsuarios())

  }

}

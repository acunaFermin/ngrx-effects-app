import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuario } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {

  user: Usuario | null = null;
  loading:boolean = false;
  error:any;

  constructor( 
    private router:ActivatedRoute,
    private store: Store<AppState> 
  ) { }

  ngOnInit() {

    this.router.params.subscribe( ({id}) => {
      this.store.dispatch( cargarUsuario({ id }) )
    })

    this.store.select('usuario').subscribe( ({ user, loading, error }) => {
      console.log({user});
      this.user = user;
      this.loading = loading;
      this.error = error;
    })

  }

}

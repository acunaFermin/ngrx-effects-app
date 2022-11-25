import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { UsuarioService } from "src/app/services/usuario.service";
import * as usuariosActions from "../actions";



@Injectable()
export class UsuarioEffects {

    constructor(
        private actions$: Actions,
        private usuariosService: UsuarioService
    ){}

    cargarUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuariosActions.cargarUsuario ),
            mergeMap(
                ( action ) => this.usuariosService.getUsersById( action.id )
                    .pipe(
                        map( user => usuariosActions.cargarUsuarioSuccess({ usuario: user }) ),
                        catchError(err => of ( usuariosActions.cargarUsuarioError({ payload: err })))
                    )
            )
        )
    );
}
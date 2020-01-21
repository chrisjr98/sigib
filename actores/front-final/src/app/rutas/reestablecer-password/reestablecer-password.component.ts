import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { validacionCorreo, setearMensajes, mensajesValidacionCorreo } from 'src/app/shared/validaciones';
import { debounceTime, catchError, map } from 'rxjs/operators';
import { toastErrorConexionServidor, toastExitoReset, toastErrorReset } from 'src/app/shared/toaster';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reestablecer-password',
  templateUrl: './reestablecer-password.component.html',
  styleUrls: ['./reestablecer-password.component.css']
})
export class ReestablecerPasswordComponent implements OnInit {

  formulario: FormGroup;
  mensajesErrorCorreo: string[] = [];

  constructor(private readonly _autenticacionService: AutenticacionService,
    private readonly _formBuilder: FormBuilder,
    private readonly _toastService: ToasterService,
    private readonly _router: Router) { }

  ngOnInit() {
    this.formulario = this._formBuilder.group({
      correo: [
        '',
        validacionCorreo,
        this.validarAsyncExisteUsuario.bind(this)
      ],
    });

    this.formulario.valueChanges
      .pipe(debounceTime(100))
      .subscribe(() => {
        this.mensajesErrorCorreo = setearMensajes(this.formulario.get('correo'), mensajesValidacionCorreo);
      });
  }

  validarAsyncExisteUsuario(control: AbstractControl): { [key: string]: any } | null {
    return this._autenticacionService.existeUsuario(control.value)
      .pipe(
        map(res => {
          const existeUsuario = res.existe;
          if (existeUsuario) {
            return null;
          } else {
            return { noexiste: true };
          }
        }),
        catchError((error) => {
          this._toastService.pop(toastErrorConexionServidor);
          return of( { noexiste: true });
        }),
      );
  }

  resetPasword() {
    this._autenticacionService.resetPassword(this.formulario.get('correo').value)
    .subscribe((resultado) => {
      this._toastService.pop(toastExitoReset);
      this._router.navigate(['/']);
    },
    (error) => {
      this._toastService.pop(toastErrorReset);
    });
  }
}

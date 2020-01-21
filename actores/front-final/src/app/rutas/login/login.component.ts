import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { validacionCorreo, setearMensajes, mensajesValidacionCorreo, mensajesValidacionLetras } from '../../shared/validaciones';
import { debounceTime, catchError } from 'rxjs/operators';
import { map } from 'rxjs/internal/operators';
import { of } from 'rxjs';
import { toastFalloLogin, toastErrorConexionServidor } from 'src/app/shared/toaster';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin: FormGroup;

  mensajesErrorCorreo: string[] = [];
  mensajesErrorPassword: string[] = [];


  constructor(private readonly _autenticacionService: AutenticacionService,
    private readonly _formBuilder: FormBuilder,
    private readonly _toastService: ToasterService) { }

  ngOnInit() {
    this.formularioLogin = this._formBuilder.group({
      correo: [
        '',
        validacionCorreo,
        this.validarAsyncExisteUsuario.bind(this)
      ],
      password: [
        '',
        Validators.required
      ]
    });

    this.formularioLogin.valueChanges
      .pipe(debounceTime(100))
      .subscribe(() => {
        this.mensajesErrorCorreo = setearMensajes(this.formularioLogin.get('correo'), mensajesValidacionCorreo);
        this.mensajesErrorPassword = setearMensajes(this.formularioLogin.get('password'), mensajesValidacionLetras);
      });
  }

  logear() {
    this._autenticacionService.login(
      this.formularioLogin.get('correo').value,
      this.formularioLogin.get('password').value,
      (errorServicio) => {
        this._toastService.pop(toastFalloLogin);
      }
    )
      ;
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
}

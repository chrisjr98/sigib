import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioInterface } from 'src/app/modulos/usuario/interfaces/usuario.interface';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { validacionLetras, validacionCorreo, setearMensajes, mensajesValidacionLetras, mensajesValidacionCorreo } from 'src/app/shared/validaciones';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-usuario-formulario',
  templateUrl: './usuario-formulario.component.html',
  styleUrls: ['./usuario-formulario.component.css']
})
export class UsuarioFormularioComponent implements OnInit {

  formulario: FormGroup;

  mensajesErrorNombre: string[]=[];
  mensajesErrorCorreo: string[]=[];
  mensajesErrorRol: string[]=[];
  mensajesErrorApellidos: string[]=[];
  mensajesErrorDireccion: string[]=[];
  mensajesErrorNick: string[]=[];

  @Input() usuario:UsuarioInterface;

  @Input() soloVer: boolean=false;

  @Output() formularioValido:EventEmitter<UsuarioInterface|boolean>=new EventEmitter();

  @Input() puedeEditarFormulario: boolean= false;

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _usuarioService: UsuarioService) { }

  ngOnInit() {

    this.inicializarFormulario();

    this.enviarFormularioValido();

    if(this.usuario){
      this.llenarFormulario();
    }
  }

  llenarFormulario(){
    this.formulario.patchValue({
      nombres: this.usuario.nombres,
      correo: this.usuario.correo,
      rol: this.usuario.rol,
      apellidos: this.usuario.apellidos,
      direccion: this.usuario.direccion,
      nick: this.usuario.nick
    })
  }

  inicializarFormulario(){
    this.formulario = this._formBuilder.group({
      nombres: [
        {value: '', disabled: false},
        validacionLetras
      ],
      correo: [
        '',
        validacionCorreo
      ],
      rol:[
        'admin',
        [Validators.required]
      ],
      apellidos:[
        '',
        validacionLetras
      ],
      nick: [
        {value: 'seniorX', disabled: false},
        validacionLetras
      ],
      direccion: [
        {value: '', disabled: false},
        validacionLetras
      ],
    });

    if(this.puedeEditarFormulario){
      this.formulario.disable();
      this.formulario.get('nick').enable();
      this.formulario.get('rol').enable();
      this.formulario.get('direccion').enable();
    }

    if(this.soloVer){
      this.formulario.disable();
    }

    this.formulario.valueChanges
      .pipe(debounceTime(0))
    .subscribe(()=>{
      this.mensajesErrorRol = setearMensajes(this.formulario.get('rol'), mensajesValidacionLetras);
      this.mensajesErrorNombre = setearMensajes(this.formulario.get('nombres'), mensajesValidacionLetras);
      this.mensajesErrorCorreo = setearMensajes(this.formulario.get('correo'), mensajesValidacionCorreo);
      this.mensajesErrorApellidos = setearMensajes(this.formulario.get('apellidos'), mensajesValidacionLetras);
      this.mensajesErrorDireccion = setearMensajes(this.formulario.get('direccion'), mensajesValidacionLetras);
      this.mensajesErrorNick = setearMensajes(this.formulario.get('nick'), mensajesValidacionLetras);
    });
  }

  enviarFormularioValido(){
    this.formulario.valueChanges
    .subscribe(()=>{
      console.log(this.formulario);
      if(this.formulario.valid){
        this.formularioValido.emit(this.formulario.value);
      }else{
        this.formularioValido.emit(false);
      }
    });
  }

}

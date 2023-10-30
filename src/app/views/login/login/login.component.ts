import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { UsuarioService } from 'src/app/core/auth/services/usuario.service';
import { TemaService } from 'src/app/shared/services/tema.service';
import { LoginUsuarioViewModel } from '../models/formLoginViewModel';
import { TokenUsuario } from '../models/tokenUsuario';
import { LoadingService } from 'src/app/shared/loading/loadingService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent
  implements
  OnInit {
    form!: FormGroup
    mostrarCarregamento$!: Observable<boolean>

    constructor(private formBuilder: FormBuilder,
      private service: AuthService,
      private snackBar: MatSnackBar,
      private router: Router,
      private usuarioService: UsuarioService,
      private loadingService: LoadingService,
      private temaService: TemaService

    ) { }

    ngOnInit(): void {
      this.mostrarCarregamento$ = this.loadingService.estaCarregando()

     this.temaService.carregarTemaPadrao()

      this.form = this.formBuilder.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        senha: new FormControl('', [Validators.required])
      })
    }


    onSubmit() {
      if (this.form.valid) {

        let usuario = new LoginUsuarioViewModel(this.form.value.email, this.form.value.senha)

        this.service.autenticar(usuario)

          .subscribe({
            error: (erro: Error) => {
              this.snackBar.open(erro.message, 'Usuário não encontrado')
            },

            next: (usuario) => {
              const tokenUsuario: TokenUsuario = {
                chave: usuario.dados.chave,
                usuario: usuario.dados.usuarioToken,
                dataExpiracao: usuario.dados.dataExpiracao,
              }

              this.usuarioService.logarUsario(tokenUsuario)
              this.router.navigate(['/dashboard'])
            }
          })
      }
    }
}

import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenUsuario } from './views/login/models/tokenUsuario';
import { UsuarioService } from './core/auth/services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'note-keeper-material';

  usuarioLogado$!: Observable<TokenUsuario | null>;


  constructor(
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.usuarioLogado$ = this.usuarioService.usuarioLogado()

  }
}

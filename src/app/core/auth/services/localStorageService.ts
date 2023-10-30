import { Injectable } from "@angular/core";
import { TokenUsuario } from "src/app/views/login/models/tokenUsuario";


@Injectable()

export class LocalStorageService{
  endereco:string = 'tokenNoteKepper';

  public salvarToken(res: any): void {
    const token: TokenUsuario = {
      chave: res.dados.chave,
      usuario: res.dados.usuarioToken,
      dataExpiracao: res.dados.dataExpiracao,
    }

    localStorage.setItem(this.endereco, JSON.stringify(token))
  }


  public obterUsuarioLogado(): TokenUsuario {
    return JSON.parse(localStorage.getItem(this.endereco)!) as TokenUsuario
  }

  public limparDadosLocais() {
    localStorage.removeItem(this.endereco)
  }
}

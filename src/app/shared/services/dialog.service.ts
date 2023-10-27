import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Categoria } from 'src/app/views/categorias/model/categoria';
import { DialogComponent } from '../componentes/dialog/dialog.component';
import { Nota } from 'src/app/views/notas/model/Nota';

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog,) { }


  confirmaExcluirCategoria(c: Categoria) {
    return this.dialog.open(DialogComponent, {
      width: 'auto',
      data: {
        titulo: 'Excluir Categoria',
        msg: 'Confirma excluir a categoria:',
        registro: c.nome
      }
    })
  }

  confirmaExcluirNota(nota: Nota) {
    return this.dialog.open(DialogComponent, {
      width: '350px',
      data: {
        titulo: 'Excluir Nota',
        msg: 'Confirma excluir a nota:',
        registro: nota.titulo
      }
    })
  }

}




import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

import { Categoria } from '../model/categoria';
import { CategoriasService } from '../services/categorias.service';
import { DialogService } from 'src/app/shared/services/dialog.service';


@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.scss']
})
export class ListarCategoriasComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private service: CategoriasService,
    private snack: MatSnackBar) {
  }

  categorias$!: Observable<Categoria[]>

  ngOnInit(): void {
    this.categorias$ = this.route.data.pipe(map(dados => dados['categorias']))
  }

  openDialog(categoria: Categoria): void {
    let dialog = this.dialogService.confirmaExcluirCategoria(categoria)

    dialog.afterClosed().subscribe(result => {
      if (result === true)
        this.excluir(categoria)
    })
  }


  private excluir(data: Categoria) {
    this.service.excluir(data.id)
      .subscribe({
        error: (err) => this.snack.open(err.message, "Erro"),
        next: () => {
          this.snack.open("Categoria excluída", "Sucesso")
          this.categorias$ = this.service.listarCategorias()
        }
      });
  }
}

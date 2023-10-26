import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

import { Categoria } from '../model/categoria';
import { CategoriasService } from '../services/categorias.service';

@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.scss']
})
export class ListarCategoriasComponent implements OnInit {

  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private service: CategoriasService,
    private snack: MatSnackBar) {

  }

  categorias$!: Observable<Categoria[]>

  ngOnInit(): void {
    this.categorias$ = this.route.data.pipe(map(dados => dados['categorias']))
  }

  openDialog(data: Categoria): void {
    let dialog = this.dialog.open(this.dialogTemplate, {
      width: '350px',
      data: { nome: data.nome }
    });

    dialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.excluir(data);
      }
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

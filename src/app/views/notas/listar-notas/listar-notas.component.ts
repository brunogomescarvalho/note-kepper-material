import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap, tap } from 'rxjs';

import { Nota } from '../model/Nota';
import { NotasService } from '../services/notas.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { Categoria } from '../../categorias/model/categoria';

@Component({
  selector: 'app-listar-notas',
  templateUrl: './listar-notas.component.html',
  styleUrls: ['./listar-notas.component.scss']
})
export class ListarNotasComponent implements OnInit {

  links = ['Todas', 'Arquivadas'];
  activeLink = this.links[0];

  notas$!: Observable<Nota[]>

  categorias$!: Observable<Categoria[]>


  constructor(private route: ActivatedRoute, private service: NotasService, private dialogService: DialogService,

    private snack: MatSnackBar) { }

  ngOnInit(): void {

    const dados$ = this.route.data;

    this.categorias$ = dados$.pipe(map(data => data['categorias']));

    this.notas$ = dados$.pipe(map(data => data['notas']));

  }

  alterarLista(event: any) {
    let opcao = event == 'Arquivadas'
    this.notas$ = this.service.selecionarTodos(opcao)
  }

  openDialog(nota: Nota): void {
    let dialog = this.dialogService.confirmaExcluirNota(nota)

    dialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.excluir(nota);
      }
    })
  }

  filtrar(categoria: Categoria) {
    let arquivado = this.activeLink == 'Arquivadas'
    this.notas$ = this.service.buscarPorCategoria(categoria.id, arquivado)

  }


  private excluir(nota: Nota) {
    let opcao = this.activeLink == 'Arquivadas'

    this.service.excluirNota(nota.id!)
      .subscribe({
        error: (err) => this.snack.open(err.message, "Erro"),
        next: () => {
          this.snack.open("Nota excluída", "Sucesso")
          this.notas$ = this.service.selecionarTodos(opcao)
        }
      });
  }
}



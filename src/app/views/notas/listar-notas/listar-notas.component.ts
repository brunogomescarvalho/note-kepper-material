import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

import { Nota } from '../model/Nota';
import { FiltroArquivadoEnum, NotasService } from '../services/notas.service';
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

    this.notas$ = dados$.pipe(map(data => data['notas']))
  }

  alterarLista(event: any) {

    let arquivado = event == 'Arquivadas'

    let filtro = arquivado ? FiltroArquivadoEnum.Arquivados : FiltroArquivadoEnum.Nao_arquivados

    this.notas$ = this.service.selecionarTodos(filtro)
  }

  openDialog(nota: Nota): void {
    let dialog = this.dialogService.confirmaExcluirNota(nota)

    dialog.afterClosed().subscribe(result => {
      if (result === true)
        this.excluir(nota);

    })
  }

  filtrar(categoria?: Categoria) {

    let arquivado = this.activeLink == 'Arquivadas'

    let filtro = arquivado ? FiltroArquivadoEnum.Arquivados : FiltroArquivadoEnum.Nao_arquivados

    this.notas$ = categoria ?

      this.service.buscarPorCategoria(categoria.id, filtro)

      : this.service.selecionarTodos(filtro)

  }


  private excluir(nota: Nota) {
    let arquivado = this.activeLink == 'Arquivadas'

    let filtro = arquivado ? FiltroArquivadoEnum.Arquivados : FiltroArquivadoEnum.Nao_arquivados

    this.service.excluirNota(nota.id!)
      .subscribe({
        error: (err) => {this.snack.open(err.message, "Erro"),console.log(err)},
        next: () => {
          this.snack.open("Nota excluída", "Sucesso")
          this.notas$ = this.service.selecionarTodos(filtro)
        }
      });
  }

  temaNota(nota: Nota): string {
    return nota.prioridade == 0 ? 'primary' : nota.prioridade == 1 ? 'accent' : 'warn'
  }
}



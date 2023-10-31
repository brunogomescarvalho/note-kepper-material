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

  categoriaSelecionada?: Categoria;


  constructor(private route: ActivatedRoute, private service: NotasService, private dialogService: DialogService,

    private snack: MatSnackBar) { }

  ngOnInit(): void {

    const dados$ = this.route.data;

    this.categorias$ = dados$.pipe(map(data => data['categorias']));

    this.notas$ = dados$.pipe(map(data => data['notas']))
  }

  public alterarLista() {

    let filtro = this.obterFiltro();

    this.notas$ = this.obterListagem(this.categoriaSelecionada, filtro)
  }

  public temaNota(nota: Nota): string {
    return nota.prioridade == 0 ? 'primary' : nota.prioridade == 1 ? 'accent' : 'warn'
  }

  public alterarArquivado(nota: Nota) {
    this.service.arquivarNota(nota)
      .subscribe({
        error: (err) => this.snack.open(err.message, "Erro"),
        next: () => {
          this.snack.open("Nota alterada", "Sucesso")

          let filtro = this.obterFiltro();
          this.notas$ = this.obterListagem(this.categoriaSelecionada, filtro)
        }
      });
  }

  public openDialog(nota: Nota): void {
    let dialog = this.dialogService.confirmaExcluirNota(nota)

    dialog.afterClosed().subscribe(result => {
      if (result === true)
        this.excluir(nota);

    })
  }

  public filtrar(categoria?: Categoria) {

    this.categoriaSelecionada = categoria!

    let filtro = this.obterFiltro();

    this.notas$ = this.obterListagem(this.categoriaSelecionada, filtro)

  }


  private obterFiltro() {
    let arquivado = this.activeLink == 'Arquivadas';

    return arquivado ? FiltroArquivadoEnum.Arquivados : FiltroArquivadoEnum.Nao_arquivados;

  }

  private obterListagem(categoria: Categoria | undefined, filtro: FiltroArquivadoEnum): Observable<Nota[]> {
    return categoria ? this.service.buscarPorCategoria(categoria.id, filtro) : this.service.selecionarTodos(filtro);
  }

  private excluir(nota: Nota) {
    let filtro = this.obterFiltro();

    this.service.excluirNota(nota.id!)
      .subscribe({
        error: (err) => this.snack.open(err.message, "Erro"),
        next: () => {
          this.snack.open("Nota excluída", "Sucesso")
          this.notas$ = this.service.selecionarTodos(filtro)
        }
      });
  }


}



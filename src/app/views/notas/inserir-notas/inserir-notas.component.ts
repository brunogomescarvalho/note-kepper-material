import { Observable, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../categorias/model/categoria';
import { ActivatedRoute, Router } from '@angular/router';
import { NotasService } from '../services/notas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Nota } from '../model/Nota';

@Component({
  selector: 'app-inserir-notas',
  templateUrl: './inserir-notas.component.html',
  styleUrls: ['./inserir-notas.component.scss']
})
export class InserirNotasComponent implements OnInit {


  categorias$!: Observable<Categoria[]>

  constructor(private route: ActivatedRoute, private service: NotasService, private snack: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.categorias$ = this.route.data.pipe(map(data => data['categorias']))
  }

  cadastrar(nota: Nota) {
    this.service.criarNota(nota)
      .subscribe({
        error: (err) => this.snack.open(err.message),
        next: () => {
          this.snack.open("Nota cadastrada!", "Sucesso")
          this.router.navigate(["/notas/listar"])
        }
      })
  }

}

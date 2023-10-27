import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';

import { Categoria } from '../../categorias/model/categoria';
import { Nota } from '../model/Nota';
import { NotasService } from '../services/notas.service';

@Component({
  selector: 'app-editar-notas',
  templateUrl: './editar-notas.component.html',
  styleUrls: ['./editar-notas.component.scss']
})
export class EditarNotasComponent {
  categorias$!: Observable<Categoria[]>

  nota!: Nota

  constructor(private route: ActivatedRoute, private service: NotasService, private snack: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.categorias$ = this.route.data.pipe(map(data => data['categorias']))

    this.nota = this.route.snapshot.data['nota'];
  }

  editar(nota: Nota) {
    this.route.paramMap.pipe(map(x => x.get('id')!),

      switchMap((id: any) =>
        this.service.editarNota(id, nota)
      ))
      .subscribe({
        error: (err) => this.snack.open(err.message),
        next: () => {
          this.snack.open("Nota editada!", "Sucesso")
          this.router.navigate(["/notas/listar"])
        }
      })
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoriasService } from '../services/categorias.service';
import { Categoria } from '../model/categoria';

@Component({
  selector: 'app-editar-categorias',
  templateUrl: './editar-categorias.component.html',
  styleUrls: ['./editar-categorias.component.scss']
})
export class EditarCategoriasComponent implements OnInit {
  form!: FormGroup
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private service: CategoriasService, private snack: MatSnackBar, private router: Router) { }



  ngOnInit(): void {
    let categoria = this.route.snapshot.data['categoria']
    this.form = this.fb.group({
      nome: ['']
    })

    this.form.patchValue(categoria)
  }

  editar() {
    if (this.form.valid) {
      let id =this.route.snapshot.params['id']

      let categoria: Categoria = {
        id: id,
        nome: this.form.value.nome
      }

      this.service.editar(categoria)
        .subscribe({
          error: (err) => this.snack.open(err.message),
          next: () => {
            this.snack.open("Categoria editada!", "Sucesso")
            this.router.navigate(["/categorias/listar"])
          }
        })
    }
  }

}

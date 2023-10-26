import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriasService } from '../services/categorias.service';
import { Categoria } from '../model/categoria';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inserir-categorias',
  templateUrl: './inserir-categorias.component.html',
  styleUrls: ['./inserir-categorias.component.scss']
})
export class InserirCategoriasComponent implements OnInit {

  form!: FormGroup
  constructor(private fb: FormBuilder, private service: CategoriasService, private snack: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['']
    })
  }

  salvar() {
    if (this.form.valid) {
      let categoria: Categoria = this.form.value

      this.service.cadastrar(categoria)
        .subscribe({
          error: (err) => this.snack.open(err.message),
          next: () => {
            this.snack.open("Categoria cadastrada!", "Sucesso")
            this.router.navigate(["/categorias/listar"])
          }
        })
    }
  }

}

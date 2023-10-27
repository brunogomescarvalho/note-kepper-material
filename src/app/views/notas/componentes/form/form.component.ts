import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Nota } from '../../model/Nota';
import { Categoria } from 'src/app/views/categorias/model/categoria';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form!: FormGroup

  @Output() onEnviarNota = new EventEmitter<Nota>()

  @Input() nota?: Nota

  @Input({ required: true }) categorias!: Categoria[] | null

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      conteudo: ['', [Validators.required, Validators.minLength(5)]],
      categoria: [null, [Validators.required]],
      arquivado: [false],
      tema: ['primary']
    })

    if (this.nota)
      this.form.patchValue(this.nota)
  }

  onSubmit() {
    if (this.form.valid) {
      let nota = {
        ...this.form.value,
        categoriaId: this.form.value.categoria.id
      }

      this.onEnviarNota.emit(nota)
    }
  }
}

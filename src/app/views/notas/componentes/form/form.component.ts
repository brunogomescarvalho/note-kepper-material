import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Nota, Tema } from '../../model/Nota';
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
      categoriaId: ['', [Validators.required]],
      arquivada: [false],
      prioridade: ['primary']
    })

    if (this.nota) {

      let nota = {
        ...this.nota,
        prioridade: this.configurarTema(this.nota)
      }

      this.form.patchValue(nota)
    }
  }

  onSubmit() {
    if (this.form.valid) {

      let nota = {
        ...this.form.value,
        prioridade: this.configurarTema(this.form.value.prioridade)
      }
      this.onEnviarNota.emit(nota)
    }
  }

  configurarTema(tema: Tema | Nota): string | number {
    if (typeof (tema) === 'string') { return tema == 'primary' ? 0 : tema == 'accent' ? 1 : 2 }
    else { return tema.prioridade == 0 ? 'primary' : tema.prioridade == 1 ? 'accent' : 'warn' }
  }

}

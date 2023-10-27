import { Categoria } from "../../categorias/model/categoria"

export type Tema = 'basic' | 'accent' | 'warn'

export class Nota {
  id?: number
  titulo: string
  conteudo: string
  arquivado: boolean
  categoriaId?: number
  categoria?: Categoria
  tema: Tema

  constructor() {
    this.id = undefined,
      this.titulo = '',
      this.conteudo = '',
      this.arquivado = false,
      this.categoriaId = undefined,
      this.categoria = undefined,
      this.tema = 'basic'
  }

}

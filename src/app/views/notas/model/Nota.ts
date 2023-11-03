import { Categoria } from "../../categorias/model/categoria"

export type Tema = 'primary' | 'accent' | 'warn'

export class Nota {
  id?: string
  titulo: string
  conteudo: string
  arquivada: boolean
  categoriaId?: string
  categoria?: Categoria
  prioridade: PrioridadeOpcaoEnum | string

  constructor() {
    this.id = "",
      this.titulo = "",
      this.conteudo = "",
      this.arquivada = false,
      this.categoriaId = "",
      this.categoria = undefined,
      this.prioridade = 0
  }

}

export enum PrioridadeOpcaoEnum
{
    Padrao, Aviso, Alta
}

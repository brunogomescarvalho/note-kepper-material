import { Categoria } from "../../categorias/model/categoria"

export type Tema = 'primary' | 'accent' | 'warn'

export class Nota {
  id?: string
  titulo: string
  conteudo: string
  arquivado: boolean
  categoriaId?: number
  categoria?: Categoria
  prioridade: PrioridadeOpcaoEnum | string

  constructor() {
    this.id = '',
      this.titulo = '',
      this.conteudo = '',
      this.arquivado = false,
      this.categoriaId = undefined,
      this.categoria = undefined,
      this.prioridade = 0
  }

}

export enum PrioridadeOpcaoEnum
{
    Padrao, Aviso, Alta
}

import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class TemaService {
  private renderer!: Renderer2

  private alterarCorImagens!: BehaviorSubject<string | null>

  private darkTheme: string = 'dark-theme'

  constructor(private rf: RendererFactory2) {
    this.alterarCorImagens = new BehaviorSubject<string | null>(null)

    this.renderer = this.rf.createRenderer(null, null)
  }

  alterarTema() {
    if (document.documentElement.className == this.darkTheme) {

      this.renderer.removeClass(document.documentElement, this.darkTheme)
      this.alterarCorImagens.next(null)
    }
    else {
      this.renderer.addClass(document.documentElement, this.darkTheme)
      this.alterarCorImagens.next(this.darkTheme)
    }
  }

  temaAlteradoObservable() {
    return this.alterarCorImagens.asObservable()
  }
}

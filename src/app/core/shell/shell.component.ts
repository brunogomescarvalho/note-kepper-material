import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TemaService } from 'src/app/shared/services/tema.service';
import { LoadingService } from 'src/app/shared/loading/loadingService';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);

  mostrarCarregamento$!: Observable<boolean>

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private temaService: TemaService,
    private loadingService: LoadingService) { }


  ngOnInit(): void {
    this.mostrarCarregamento$ = this.loadingService.estaCarregando()
  }



  alterarTema() {
    this.temaService.alterarTema()
  }
}

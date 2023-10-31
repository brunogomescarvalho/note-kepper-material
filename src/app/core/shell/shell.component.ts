import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoadingService } from 'src/app/shared/loading/loadingService';
import { TemaService } from 'src/app/shared/services/tema.service';

import { AuthService } from '../auth/services/auth.service';

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
    private loadingService: LoadingService,
    private serviceAuth: AuthService,
    private router: Router) { }


  ngOnInit(): void {
    this.mostrarCarregamento$ = this.loadingService.estaCarregando()
  }

  alterarTema() {
    this.temaService.alterarTema()
  }

  sair() {
    this.serviceAuth.logout()
      .subscribe(() => {
        this.router.navigate(['/login'])
      })
  }
}

import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { TemaService } from 'src/app/shared/services/tema.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  alterarTema$!: Observable<string | null>

  constructor(private temaService: TemaService) { }

  ngOnInit(): void {
    this.alterarTema$ = this.temaService.temaAlteradoObservable()
  }



}


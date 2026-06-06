import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'panel-angular-fresh';
  esRutaAuth = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Detectar cambios de ruta para ocultar menú en login/registro
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.esRutaAuth = event.urlAfterRedirects.includes('/auth');
    });
  }
}

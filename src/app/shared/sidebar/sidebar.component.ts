import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  constructor(private gserv: GifsService) {}
  buscar(termino: string) {
    this.gserv.buscarGifs(termino);
  }
  get historial() {
    return this.gserv.historial;
  }
}

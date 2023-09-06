import { Component, ElementRef, ViewChild } from '@angular/core';

import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [],
})
export class BusquedaComponent {
  constructor(private gifsService: GifsService) {}

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  buscar() {
    const value = this.txtBuscar.nativeElement.value;
    if (value.trim().length === 0) {
      return;
    } else {
      this.gifsService.buscarGifs(value);
    }

    this.txtBuscar.nativeElement.value = '';
  }
}

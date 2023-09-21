import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('history')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('lastSearch')!) || [];
  }

  // tocken de la api de gifts!
  private apiKey: string = 'RQ0bs7bDApCWrfL13XDvxENUE49Q6ULz';
  private _historial: string[] = [];
  // base: string = 'http://localhost:3000';
  base: string = 'http://api.giphy.com/v1/gifs/search';

  public resultados: Gif[] = [];

  get historial(): string[] {
    return [...this._historial];
  }

  buscarGifs(query: string = ''): void {
    //  Api local con Json Server
    /** 
      query = query.toLowerCase();
      this.http
        .get(`${this.base}/posts/${query}`)
          .subscribe((val: any) => {
            if (!this._historial.includes(val.title)) {
            this._historial.unshift(val.title);
            this._historial = this._historial.slice(0, 10);
            console.log(val.title)
          }
        }
      );
    */
    this.http
      .get<SearchGifsResponse>(
        `${this.base}?api_key=${this.apiKey}&q=${query}&limit=10`
      )
      .subscribe((resp) => {
        console.log(resp.data[0]);
        query = query.toLowerCase();
        if (!this._historial.includes(query)) {
          this._historial.unshift(query);
          this._historial = this._historial.slice(0, 10);

          localStorage.setItem('history', JSON.stringify(this._historial));
        }
        this.resultados = resp.data;
        localStorage.setItem('lastSearch', JSON.stringify(this.resultados));
      });
  }
}

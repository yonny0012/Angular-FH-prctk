import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  constructor(private http: HttpClient) {}

  // tocken de la api de gifts!
  private apiKey: string = 'RQ0bs7bDApCWrfL13XDvxENUE49Q6ULz';
  private _historial: string[] = [];
  // base: string = 'http://localhost:3000';
  base: string = 'http://api.giphy.com/v1/gifs/search';

  public resultados: any[] = [];

  get historial(): string[] {
    return [...this._historial];
  }

  buscarGifs(query: string = ''): void {
    // query = query.toLowerCase();
    // this.http
    //   .get(`${this.base}/posts/${query}`)
    //   .subscribe((val: any) => {
    //     if (!this._historial.includes(val.title)) {
    //       this._historial.unshift(val.title);
    //       this._historial = this._historial.slice(0, 10);
    //       console.log(val.title)
    //     }
    //   }
    // );
    this.http
      .get(
        `${this.base}?api_key=RQ0bs7bDApCWrfL13XDvxENUE49Q6ULz&q=${query}&limit=10`
      )
      .subscribe((resp: any) => {
        console.log(resp.data);
        query = query.toLowerCase();
        if (!this._historial.includes(resp.title)) {
          this._historial.unshift(query);
          this._historial = this._historial.slice(0, 10);
        }
        this.resultados = resp.data;
      });
  }
}

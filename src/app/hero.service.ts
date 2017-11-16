import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';

import { MessageService } from './message.service';

const httpOptions = {
    headers: new HttpHeaders({ 'content-type': 'application/json' })
}

@Injectable()
export class HeroService {

    private heroesUrl: string = 'api/heroes';

    constructor(
        private httpClient: HttpClient, 
        private messageService: MessageService) { }


    log(message: string) {
        this.messageService.add('HeroService: '+message);
    }

    getHeroes(): Observable<Hero[]> {
        return this.httpClient.get<Hero[]>(this.heroesUrl)
            .pipe(
                tap(heroes => this.log('obteve array de heroes')),
                catchError(this.handleError('getHeroes', []))
            );
    }

    getHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.httpClient.get<Hero>(url)
            .pipe(
                tap(x => this.log(`obteve hero específico de id=${id}`)),
                catchError(this.handleError<Hero>(`getHero id=${id}`))
            );
    }

    addHero(hero: Hero): Observable<Hero> {
        return this.httpClient.post<Hero>(this.heroesUrl, hero, httpOptions)
            .pipe(
                tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
                catchError(this.handleError<Hero>('addHero'))
            );
    }

    updateHero(hero: Hero): Observable<any> {
        return this.httpClient.put(this.heroesUrl, hero, httpOptions)
            .pipe(
                tap(x => this.log(`atualizado hero de id=${hero.id}`)),
                catchError(this.handleError<any>('updateHero'))
            );
    }

    deleteHero(hero: Hero | number): Observable<Hero> {
        const id = typeof hero === 'number' ? hero : hero.id;
        const url = `${this.heroesUrl}/${id}`;
        return this.httpClient.delete<Hero>(url, httpOptions)
            .pipe(
                tap(x => this.log(`deletado hero id=${id}`)),
                catchError(this.handleError<Hero>('deleteHero'))
            );
    }

    searchHeroes(term: string): Observable<Hero[]> {
        if (!term.trim())
            return (of([]));

        return this.httpClient.get<Hero[]>(`api/heroes/?name=${term}`)
            .pipe(
                tap(x => this.log(`encontrado hero com o termo "${term}"`)),
                catchError(this.handleError<Hero[]>('searchHeroes', []))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`${operation} falhou: ${error.message}`);
            return of(result as T);
        }
    }

}

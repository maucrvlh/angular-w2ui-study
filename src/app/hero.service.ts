import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

import { MessageService } from './message.service';

@Injectable()
export class HeroService {

    constructor(private messageService: MessageService) { }

    getHeroes(): Observable<Hero[]> {
        this.messageService.add('HeroService: retornou a lista de serviços');
        return of(HEROES);
    }

    getHero(id: number): Observable<Hero> {
        this.messageService.add(`HeroService: retornou o herói de id ${id}`);
        return of(HEROES.find(hero => hero.id === id));
    }

}

import { Component, OnInit } from '@angular/core';
import { forkJoin, from, fromEvent, Observable, of, timer } from 'rxjs';
import { ajax } from 'rxjs/ajax'
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-test-observables',
  templateUrl: './test-observables.component.html',
  styleUrls: ['./test-observables.component.css']
})
export class TestObservablesComponent implements OnInit {
  triggerBtn: any;
  checkFromEvent: any;
  randomName$: any;
  randomBeer$: any;
  randomAddress$: any;

  constructor() { }

  ngOnInit(): void {
    const observable$ = new Observable(subscriber => {
      console.log("Observable executed")
      subscriber.next('Alica');
      subscriber.next('ben');
      const intervalId = setTimeout(() => {
        subscriber.next('Khan');
        subscriber.complete();
      }, 2000);

      /* Teardown logic to prevent memory leaks */
      return () => {
        clearInterval(intervalId)
      }
    });

    const observer = {
      next: (value: any) => {
        return console.log(value);
      }
    }

    observable$.subscribe({
      next: value => console.log(value),
      complete: () => console.log('Completed')
    })

    const subscription = observable$.subscribe(observer);
    subscription.unsubscribe(); //prevent memory leaks

    /* Cold observable implementation */
    const ajax$ = ajax('https://random-data-api.com/api/beer/random_beer');
    ajax$.subscribe(value => {
      console.log("Brand name 1:", value.response.brand)
    })
    ajax$.subscribe(value => {
      console.log("Brand name 2:", value.response.brand)
    })
    ajax$.subscribe(value => {
      console.log("Brand name 3:", value.response.brand)
    })

    /* of creation function */

    of('Khan', 'Viz', 'Pogboom').subscribe({
      next: value => console.log(value),
      complete: () => console.log('Completed')
    });

    /* from creation function */
    from(['Khan1', 'Viz1', 'Pogboom1']).subscribe({
      next: value => console.log(value),
      complete: () => console.log('Completed')
    });

    /* from promise */
    const promiseValue = new Promise((resolve, reject) => {
      /* resolve('Resolved'); */
      reject('Rejected');
    });

    const observable1$ = from(promiseValue);
    observable1$.subscribe({
      next: value => console.log(value),
      error: err => console.log('Err:', err),
      complete: () => console.log('Completed')
    });

    /* fromEvent trigger */
    this.triggerBtn = document.querySelector('button#trigger');
    this.checkFromEvent = fromEvent<MouseEvent>(this.triggerBtn, 'click').subscribe(
      event => console.log(event?.type, event?.x, event?.y)
    );
    setTimeout(() => {
      console.log('Inside Timeout');
      this.checkFromEvent.unsubscribe();
    }, 4000);

    /* Timer creation function */
    timer(6000).subscribe({
      next: value => console.log(value),
      complete: () => console.log("Completed")
    });

    /* forkJoin */
    const randomName$ = ajax('https://random-data-api.com/api/name/random_name');
    const randomBeer$ = ajax('https://random-data-api.com/api/beer/random_beer');
    const randomAddress$ = ajax('https://random-data-api.com/api/address/random_address');

    randomName$.subscribe(
      ajaxResponse => console.log("Forkjoin",ajaxResponse.response.first_name)
    );
    randomBeer$.subscribe(
      ajaxResponse => console.log("Forkjoin",ajaxResponse.response.brand)
    );
    randomAddress$.subscribe(
      ajaxResponse => console.log("Forkjoin",ajaxResponse.response.city)
    );

    forkJoin([randomName$,randomBeer$,randomAddress$]).subscribe({
      next: ([nameAjax,beerAjax,addressAjax])=>console.log(`${nameAjax.response.first_name} likes to have ${beerAjax.response.brand} from ${addressAjax.response.city}`),
      error: err=>console.log("Error")
    });

    /* Pipeable operators */
    interface NewsLetter{
      category: 'Business' | 'Sports';
      content: string;
    }

    const news$= new Observable<NewsLetter>(subscriber=>{
      setTimeout(()=>{
        subscriber.next({category:'Sports',content:'Ronaldo'})
      },1000);
      setTimeout(()=>{
        subscriber.next({category:'Business',content:'Mark'})
      },3000);
      setTimeout(()=>{
        subscriber.next({category:'Sports',content:'Messi'})
      },5000);
      setTimeout(()=>{
        subscriber.next({category:'Business',content:'Zuckerberg'})
      },7000);
    });

    news$.pipe(
      filter(item=>item.category =='Sports')
    ).subscribe(item=>{
      console.log(item)
    })
  }

  /* Once complete or error is completed teardown logic is called */

  /* observable$.subscribe(observer)  This is how it works*/





}

export class Weatherdata {

  city: string
  dt: number = 0
  name:String
  coord : { lat:number , lon:number}
  main : {
    temp : 0, temp_min : 0, temp_max : 0
  }
  isDay : boolean = true ;
  isFav: boolean = false ;

  constructor( ) {

  }
}

class Vehicle{
constructor(make, model,year){
this.make=make;
this.model= model;
this.year=year;
}
honk(){
return "beep";
}
toString(){
return `The vehicle is a ${this.make}, ${this.model}, ${this.year}`;
    }
}

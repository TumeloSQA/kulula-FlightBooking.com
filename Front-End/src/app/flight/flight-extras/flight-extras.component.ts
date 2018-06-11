import { Component, OnInit } from '@angular/core';
import{User} from'../../shared/user.model';
import {UserService} from '../../shared/user.service';
import {NgForm} from '@angular/forms';
import {Router} from'@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FlightBooking} from '../../FlightModel/flight-booking.model';
import {Airport} from '../../FlightModel/Flight-Departure.model';
import {Route} from '../../FlightModel/Flight-Arrival.model';
import {AirportService} from '../../flightServices/Flight-Departure.service';
import {RouteService} from '../../flightServices/Flight-Arrival.service';
import {PreferredClass} from '../../FlightModel/preferred-class.model';
import {PreferredClassService} from '../../flightServices/preferred-class.service';
import {CartService} from '../../flightServices/cart.service';
import {Cart} from'../../FlightModel/cart.model';
import { FlightExtra } from '../../flightmodel/flight-extra.model';
import { FlightExtraService } from '../../flightServices/flight-extra.service';
import {SeatSelection} from '../../FlightModel/seat-selection.model';
import {SeatSelectionService} from '../../flightServices/seat-selection.service';
@Component({
  selector: 'app-flight-extras',
  templateUrl: './flight-extras.component.html',
  styleUrls: ['./flight-extras.component.css'],
  providers:[CartService, UserService, FlightExtraService,PreferredClassService,RouteService,AirportService]
})
export class FlightExtrasComponent implements OnInit {
  user:User;
  arr1Length: number;
  userClaims : any;
  route : Route;
  airport : Airport;
  flightbooking: FlightBooking;
  CartTotalPrice: number;
  Flightbagcover: number;
  Extrabags: number;
  SLOWXSLounge:number;
  total : number;
  cart :Cart;
  cartList : Array<Cart> = [];
  flightExtrelist2:Array<FlightExtra> =[];
  SeatSelectionArray: Array<SeatSelection> =[];
  flightextra:FlightExtra;
  preferredclass1 :Array<PreferredClass> = [];
  date : string;
arrivalname: string;
routelist : Array<Route> =[];
airportlist:Array<Airport> = []
CartQuantity:number;
  constructor(private UserService : UserService,private router : Router,private toast : ToastrService,private cartservice : CartService,private flightExtraservice : FlightExtraService,private preferredclassservice : PreferredClassService,private airportservice: AirportService,private routeservice : RouteService) { }

  ngOnInit() {
    this.resetForm();
    this.UserService.getUserClaims().subscribe((data: any)=>{
      this.userClaims = data;
    });


    this.cartservice.getspecifiedCart();
    this.cartservice.cartList.subscribe((classtype:Array<Cart>)=>{
      this. cartList = classtype;
      if(classtype.length > 0){
       this.arr1Length = classtype.length;    
       this.CartTotalPrice = this.cartList[0].Totalprice;
       this.CartQuantity = this.cartList[0].Quantity;
      }
      
    })
    this.flightExtraservice.GetFlightExtra();
    this.flightExtraservice.getFlightExtraList();
   this.flightExtraservice.flightExtrelist2.subscribe((classtype:Array<FlightExtra>)=>{
     this.flightExtrelist2 = classtype;
          if(classtype.length > 0){
            this.arr1Length = classtype.length;
          console.log(this.getFlightbagcover())
          this.Flightbagcover = this.getFlightbagcover();
          this.Extrabags = this.getFlExtrabags();
          this.SLOWXSLounge = this.getSLOWXSLounge();
          }
   })

 
   this.airportservice.getAirpot();
   this.airportservice.getspecifiedAirport();
   this.airportservice.specifiedAirport.subscribe((classtype:Array<Airport>)=>{
     this.airportlist = classtype;
     if(classtype.length > 0){
       this.arr1Length = classtype.length;
       //this.time = this.gettime();
       this.date = this.departureDate();
     }
   })
   this.routeservice.GetRouteList();
   this.routeservice.getspecifiedroute();
   this.routeservice.specifiedroute.subscribe((classtype:Array<Route>)=>{
     this.routelist = classtype;
     if(classtype.length > 0){
       this.arr1Length = classtype.length;
       //this.arrivaltime = this.getarrtime();
       this.arrivalname = this.getArrival()
     }
   })
  }
    resetForm(form? :NgForm)
    {
       if(form != null)
       form.resetForm();
       this.flightbooking={
         FlightID: 0,
         CustomerID : 0,
         AirportID : 0,
         ExtraID: 0,
         SeatNumber: '',
         ReturningDate: '', 
         NumberOfTravellers: 0,
         TotalFare:0
       }
       if(form != null)
       form.reset();
       this.airport ={
        AirportID:0,
        AircraftID:0,
       ArrivalID: 0,
       AirportName:localStorage.getItem("AirportName"),
      DepartingTime:'',
      DepartingDate:''
      }
      if(form != null)
       form.reset();
       this.route={
        ArrivalID: 0,
        AirportName: '',
       ArrivalTime: '',
       ArrivalDate: ''
       }
      }


      departureDate(){
        for(var x =0;x < this.arr1Length; x++){
          if( this.airportlist[x].AirportID == +localStorage.getItem("AirportID")){
            return  this.airportlist[x].DepartingDate;
          }
         }
       }
       getArrivalname(){
        for(var x =0;x < this.arr1Length; x++){
          if( this.airportlist[x].AirportID == +localStorage.getItem("AirportID")){
            return  this.airportlist[x].ArrivalID;
          }
         }
      }
      getArrival(){
        for(var x =0;x < this.arr1Length; x++){
          if( this.routelist[x].ArrivalID == this.getArrivalname()){
            return  this.routelist[x].AirportName;
          }
         }
      
        }


      getFlightbagcover(){
        for(var x = 0;x < this.arr1Length; x++){
          if(this.flightExtrelist2[x].ExtraID == 1){
            return this.flightExtrelist2[x].Price;
          }
        }
      }
      getFlExtrabags(){
        for(var x = 0;x < this.arr1Length; x++){
          if(this.flightExtrelist2[x].ExtraID == 2){
            return this.flightExtrelist2[x].Price;
          }
        }
      }
      getSLOWXSLounge(){
        for(var x = 0;x < this.arr1Length; x++){
          if(this.flightExtrelist2[x].ExtraID == 3){
            return this.flightExtrelist2[x].Price;
          }
        }
      }

      
updatecart1(){
  this.cart ={
    CartID: this.cartList[0].CartID ,
    SeatNumber: null,
    PreferredClassID: this.cartList[0].PreferredClassID,
    ExtraID : this.flightExtrelist2[0].ExtraID,
    Totalprice: this.cartList[0].Quantity * (+this.Flightbagcover) + (+this.cartList[0].Totalprice),
    Quantity: this.cartList[0].Quantity
  }
this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{
  this.cartservice.getspecifiedCart();
   this.cartservice.Getcartlist();
   localStorage.setItem("Flight&bagcover",this.flightExtrelist2[0].Price + '');
  this.toast.info('Added to Cart!');
})
}
updatecart2(){
  this.cart ={
    CartID: this.cartList[0].CartID ,
    SeatNumber: null,
    PreferredClassID: this.cartList[0].PreferredClassID,
    ExtraID : this.flightExtrelist2[1].ExtraID,
    Totalprice: this.cartList[0].Quantity * (+this.Extrabags) + (+this.cartList[0].Totalprice),
    Quantity: this.cartList[0].Quantity
  }
this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{
  this.cartservice.getspecifiedCart();
   this.cartservice.Getcartlist();
   localStorage.setItem("Extrabags",this.flightExtrelist2[1].Price + '');
  this.toast.info('Added to Cart!');
})
}
updatecart3(){
  this.cart ={
    CartID: this.cartList[0].CartID ,
    SeatNumber:null,
    PreferredClassID: this.cartList[0].PreferredClassID,
    ExtraID : this.flightExtrelist2[2].ExtraID,
    Totalprice:this.cartList[0].Quantity * (+this.SLOWXSLounge) + (+this.cartList[0].Totalprice),
    Quantity: this.cartList[0].Quantity
  }
this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{
  this.cartservice.getspecifiedCart();
   this.cartservice.Getcartlist();
   localStorage.setItem("SLOWXSLounge",this.flightExtrelist2[2].Price + '');
  this.toast.info('Added to Cart!');
})
}
routers(){
  this.router.navigate(["/flight-payment"]);
}
}

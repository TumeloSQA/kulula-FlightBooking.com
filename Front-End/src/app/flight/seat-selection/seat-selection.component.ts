import { Component, OnInit } from '@angular/core';
import{User} from'../../shared/user.model';
import {UserService} from '../../shared/user.service';
import {NgForm} from '@angular/forms';
import {Router} from'@angular/router';
import {ToastrService} from 'ngx-toastr'
import {FlightBooking} from '../../FlightModel/flight-booking.model';
import {Airport} from '../../FlightModel/Flight-Departure.model';
import {Route} from '../../FlightModel/Flight-Arrival.model';;
import {AirportService} from '../../flightServices/Flight-Departure.service';
import {RouteService} from '../../flightServices/Flight-Arrival.service';
import {PreferredClass} from '../../FlightModel/preferred-class.model';
import {PreferredClassService} from '../../flightServices/preferred-class.service';
import {CartService} from '../../flightServices/cart.service';
import {Cart} from'../../FlightModel/cart.model';
import {FlightTravellerDetailService} from '../../flightServices/flight-traveller-detail.service';
import {FlightTravellerDetail} from'../../FlightModel/flight-traveller-detail.model';
import {SeatSelection} from '../../FlightModel/seat-selection.model';
import {SeatSelectionService} from '../../flightServices/seat-selection.service';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css'],
  providers:[CartService,PreferredClassService,FlightTravellerDetailService,SeatSelectionService,AirportService,RouteService]
})
export class SeatSelectionComponent implements OnInit {  
user:User;
cart:Cart
seatselection: SeatSelection;
arr1Length: number;
userClaims : any;
preferredclass : PreferredClass;
route : Route;
airport : Airport;
flightbooking: FlightBooking;
cartList : Array<Cart> = [];
CartTotalPrice:number;
CartQuantity:number;
flighttravellerdetail :FlightTravellerDetail;
specifiedflighttravellerdetail :Array<FlightTravellerDetail> =[]
numberoftravellers: number;
SeatSelectionArray: Array<SeatSelection> =[];
standardBack : number;
standardfont: number;
stretchzone: number;
exitrow: number;
frontrow: number;
seatQuantity: number;
date : string;
arrivalname: string;
routelist : Array<Route> =[];
airportlist:Array<Airport> = [];
  constructor(private seatselectionservice : SeatSelectionService,private UserService : UserService,private router : Router,private toast : ToastrService,private preferredclassservice : PreferredClassService,public cartservice : CartService, public travellersdetailsService : FlightTravellerDetailService,private airportservice: AirportService,private routeservice : RouteService) { }

  ngOnInit() {
    this.resetForm();
    this.seatselectionservice.GetSpecifiedseatselections();
    this.travellersdetailsService.getFlightTravellersDetailsList();
    this.UserService.getUserClaims().subscribe((data: any)=>{
      this.userClaims = data;
  })

  this.cartservice.getspecifiedCart();
  this.cartservice.Getcartlist();
  this.cartservice.cartList.subscribe((classtype:Array<Cart>)=>{
    this.cartList = classtype;
    if(classtype.length > 0){
     this.arr1Length = classtype.length;
         
     this.CartTotalPrice = this.cartList[0].Totalprice;
     this.CartQuantity = this.cartList[0].Quantity;
    }
  
  })

  this.seatselectionservice.GetSpecifiedseatselections();
  this.seatselectionservice.SeatSelectionArray.subscribe((classtype:Array<SeatSelection>)=>{
   this.SeatSelectionArray =classtype;
if(classtype.length > 0 ){
  this.arr1Length = classtype.length;
  console.log(this.SeatSelectionArray[0].SeatNumber)
  this.seatQuantity =
  this.standardBack = this.getspecifiedstandardBack();
this.standardfont = this.getspecifiedstandardfront();
this.stretchzone = this.getspecifiedstretchzone();
this.exitrow = this.getspecifiedExitRow();
this.frontrow = this.getspecifiedFrontRow();
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
  resetForm(form? : NgForm)
  {
     if(form != null)
     form.resetForm();
     this.flightbooking={
       FlightID: 0,
       CustomerID : 0,
       AirportID : 0,
       ExtraID: 0,
       SeatNumber:'',
       ReturningDate:'', 
       NumberOfTravellers:+localStorage.getItem("NumberOfTravellers"), 
       TotalFare:0
     }
     if(form != null)
     form.reset();
     this.airport ={
      AirportID:0,
      AircraftID:0,
      ArrivalID: 0,
     AirportName: localStorage.getItem("AirportName"),
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
     if(form != null)
     form.reset();
     this.flighttravellerdetail={
      TravellerID : 0,
      CustomerID: +localStorage.getItem("CustomerID"),
      SeatNumber: '',
      Firstname : '',
      Lastname : '',
      Dateofbirth : '',
      Gender : '',
      Mobilenumber: '',
      Email : ''
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
   /* getCartQuantity(){
      for(var x =0;x < this.arr1Length; x++ ){
    if(this.cartList[x].CartID == 1){
    return this.cartList[x].Quantity;

    }

      }
    }*/
    getspecifiedstandardBack(){
      for(var i = 0; i < this.arr1Length;i++){
        if(this.SeatSelectionArray[i].SeatType == "Standard (back)"){
          return this.SeatSelectionArray[i].Price
        }
      }
    }
    getspecifiedstandardfront(){
      for(var i = 0; i < this.arr1Length;i++){
        if(this.SeatSelectionArray[i].SeatType == "Standard (Font)"){
          return this.SeatSelectionArray[i].Price
        }
      }
    }
    getspecifiedstretchzone(){
      for(var i = 0; i < this.arr1Length;i++){
        if(this.SeatSelectionArray[i].SeatType == "Stretch Zone (Extra Legroom)"){
          return this.SeatSelectionArray[i].Price
        }
      }
    }
    getspecifiedExitRow(){
      for(var i = 0; i < this.arr1Length;i++){
        if(this.SeatSelectionArray[i].SeatType == "Exist Row (Extra Legroom)"){
          return this.SeatSelectionArray[i].Price
        }
      }
    }
    getspecifiedFrontRow(){
      for(var i = 0; i < this.arr1Length;i++){
        if(this.SeatSelectionArray[i].SeatType == "Front Row (Extra Legroom)"){
          return this.SeatSelectionArray[i].Price
        }
      }
    }


    /*updatecart1(){
      this.cart ={
        CartID: this.cartList[0].CartID ,
        SeatID: this.SeatSelectionArray[0].SeatID,
        PreferredClassID: +localStorage.getItem("PreferredClassID"),
        ExtraID : null,
        Totalprice: this.cartList[0].Quantity * (+this.standardBack) + (+this.getCartprice()),
        Quantity: this.cartList[0].Quantity
      }
    this.cartservice.Putpreferredclass(this.cart.CartID,this.cart).subscribe(data =>{
      this.cartservice.getspecifiedCart();
       this.cartservice.Getcartlist();
      this.toast.info('Added to Cart!');
    })
    }*/


      seatselection1A(){
       this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[0].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
         
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[0].SeatType,
          SeatNumber: this.SeatSelectionArray[0].SeatNumber,
          Price : this.SeatSelectionArray[0].Price,
          Quantity: this.SeatSelectionArray[0].Quantity - 1 ,
          Total : this.SeatSelectionArray[0].Quantity * this.SeatSelectionArray[0].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("1A") as HTMLInputElement;
        btnCont.disabled =true;
        })
        location.reload();
      }

      seatselection1B(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[1].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })
        this.seatselection={
          SeatType: this.SeatSelectionArray[1].SeatType,
          SeatNumber: this.SeatSelectionArray[1].SeatNumber,
          Price : this.SeatSelectionArray[1].Price,
          Quantity: this.SeatSelectionArray[1].Quantity - 1 ,
          Total : this.SeatSelectionArray[1].Quantity * this.SeatSelectionArray[1].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("1B") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }

      seatselection1C(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[2].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[2].SeatType,
          SeatNumber: this.SeatSelectionArray[2].SeatNumber,
          Price : this.SeatSelectionArray[2].Price,
          Quantity: this.SeatSelectionArray[2].Quantity - 1 ,
          Total : this.SeatSelectionArray[2].Quantity * this.SeatSelectionArray[2].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("1C") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }

      seatselection2A(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[3].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          
          SeatType: this.SeatSelectionArray[3].SeatType,
          SeatNumber: this.SeatSelectionArray[3].SeatNumber,
          Price : this.SeatSelectionArray[3].Price,
          Quantity: this.SeatSelectionArray[3].Quantity - 1 ,
          Total : this.SeatSelectionArray[3].Quantity * this.SeatSelectionArray[4].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("2A") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }


      seatselection2B(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[4].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[4].SeatType,
          SeatNumber: this.SeatSelectionArray[4].SeatNumber,
          Price : this.SeatSelectionArray[4].Price,
          Quantity: this.SeatSelectionArray[4].Quantity - 1 ,
          Total : this.SeatSelectionArray[4].Quantity * this.SeatSelectionArray[4].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("2B") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }


      seatselection2C(){
        this.cart ={
          CartID:0,
          SeatNumber: this.SeatSelectionArray[5].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[5].SeatType,
          SeatNumber: this.SeatSelectionArray[5].SeatNumber,
          Price : this.SeatSelectionArray[5].Price,
          Quantity: this.SeatSelectionArray[5].Quantity - 1 ,
          Total : this.SeatSelectionArray[5].Quantity * this.SeatSelectionArray[5].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("2C") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }


      seatselection3A(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[9].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[9].SeatType,
          SeatNumber: this.SeatSelectionArray[9].SeatNumber,
          Price : this.SeatSelectionArray[9].Price,
          Quantity: this.SeatSelectionArray[9].Quantity - 1 ,
          Total : this.SeatSelectionArray[9].Quantity * this.SeatSelectionArray[9].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("3A") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }


      seatselection3B(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[10].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[10].SeatType,
          SeatNumber: this.SeatSelectionArray[10].SeatNumber,
          Price : this.SeatSelectionArray[10].Price,
          Quantity: this.SeatSelectionArray[10].Quantity - 1 ,
          Total : this.SeatSelectionArray[10].Quantity * this.SeatSelectionArray[10].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("3B") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }

      seatselection3C(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[11].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[11].SeatType,
          SeatNumber: this.SeatSelectionArray[11].SeatNumber,
          Price : this.SeatSelectionArray[11].Price,
          Quantity: this.SeatSelectionArray[11].Quantity - 1 ,
          Total : this.SeatSelectionArray[11].Quantity * this.SeatSelectionArray[11].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("3C") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }

      seatselection4A(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[15].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[15].SeatType,
          SeatNumber: this.SeatSelectionArray[15].SeatNumber,
          Price : this.SeatSelectionArray[15].Price,
          Quantity: this.SeatSelectionArray[15].Quantity - 1 ,
          Total : this.SeatSelectionArray[15].Quantity * this.SeatSelectionArray[15].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("4A") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }

      seatselection4B(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[16].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[16].SeatType,
          SeatNumber: this.SeatSelectionArray[16].SeatNumber,
          Price : this.SeatSelectionArray[16].Price,
          Quantity: this.SeatSelectionArray[16].Quantity - 1 ,
          Total : this.SeatSelectionArray[16].Quantity * this.SeatSelectionArray[16].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("4B") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }

      seatselection4C(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[17].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[17].SeatType,
          SeatNumber: this.SeatSelectionArray[17].SeatNumber,
          Price : this.SeatSelectionArray[17].Price,
          Quantity: this.SeatSelectionArray[17].Quantity - 1 ,
          Total : this.SeatSelectionArray[17].Quantity * this.SeatSelectionArray[17].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("4C") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }

      seatselection5A(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[21].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[21].SeatType,
          SeatNumber: this.SeatSelectionArray[21].SeatNumber,
          Price : this.SeatSelectionArray[21].Price,
          Quantity: this.SeatSelectionArray[21].Quantity - 1 ,
          Total : this.SeatSelectionArray[21].Quantity * this.SeatSelectionArray[21].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("5A") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }
      seatselection5B(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[22].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[22].SeatType,
          SeatNumber: this.SeatSelectionArray[22].SeatNumber,
          Price : this.SeatSelectionArray[22].Price,
          Quantity: this.SeatSelectionArray[22].Quantity - 1 ,
          Total : this.SeatSelectionArray[22].Quantity * this.SeatSelectionArray[22].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("5B") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }
      seatselection5C(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[23].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[23].SeatType,
          SeatNumber: this.SeatSelectionArray[23].SeatNumber,
          Price : this.SeatSelectionArray[23].Price,
          Quantity: this.SeatSelectionArray[23].Quantity - 1 ,
          Total : this.SeatSelectionArray[23].Quantity * this.SeatSelectionArray[23].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("5C") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }
      seatselection6A(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[27].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[27].SeatType,
          SeatNumber: this.SeatSelectionArray[27].SeatNumber,
          Price : this.SeatSelectionArray[27].Price,
          Quantity: this.SeatSelectionArray[27].Quantity - 1 ,
          Total : this.SeatSelectionArray[27].Quantity * this.SeatSelectionArray[27].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("6A") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }

      seatselection6B(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[28].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[28].SeatType,
          SeatNumber: this.SeatSelectionArray[28].SeatNumber,
          Price : this.SeatSelectionArray[28].Price,
          Quantity: this.SeatSelectionArray[28].Quantity - 1 ,
          Total : this.SeatSelectionArray[28].Quantity * this.SeatSelectionArray[28].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("6B") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }


      seatselection6C(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[29].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[29].SeatType,
          SeatNumber: this.SeatSelectionArray[29].SeatNumber,
          Price : this.SeatSelectionArray[29].Price,
          Quantity: this.SeatSelectionArray[29].Quantity - 1 ,
          Total : this.SeatSelectionArray[29].Quantity * this.SeatSelectionArray[29].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("6C") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }
      seatselection7A(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[33].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[33].SeatType,
          SeatNumber: this.SeatSelectionArray[33].SeatNumber,
          Price : this.SeatSelectionArray[33].Price,
          Quantity: this.SeatSelectionArray[33].Quantity - 1 ,
          Total : this.SeatSelectionArray[33].Quantity * this.SeatSelectionArray[33].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("7A") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }
      seatselection7B(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[34].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[34].SeatType,
          SeatNumber: this.SeatSelectionArray[34].SeatNumber,
          Price : this.SeatSelectionArray[34].Price,
          Quantity: this.SeatSelectionArray[34].Quantity - 1 ,
          Total : this.SeatSelectionArray[34].Quantity * this.SeatSelectionArray[34].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("7B") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }

      seatselection7C(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[35].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[35].SeatType,
          SeatNumber: this.SeatSelectionArray[35].SeatNumber,
          Price : this.SeatSelectionArray[35].Price,
          Quantity: this.SeatSelectionArray[35].Quantity - 1 ,
          Total : this.SeatSelectionArray[35].Quantity * this.SeatSelectionArray[35].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("7C") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }


      seatselection8A(){
        this.cart ={
          CartID:0,
          SeatNumber: this.SeatSelectionArray[39].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[39].SeatType,
          SeatNumber: this.SeatSelectionArray[39].SeatNumber,
          Price : this.SeatSelectionArray[39].Price,
          Quantity: this.SeatSelectionArray[39].Quantity - 1 ,
          Total : this.SeatSelectionArray[39].Quantity * this.SeatSelectionArray[39].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("8A") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }


      seatselection8B(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[40].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[40].SeatType,
          SeatNumber: this.SeatSelectionArray[40].SeatNumber,
          Price : this.SeatSelectionArray[40].Price,
          Quantity: this.SeatSelectionArray[40].Quantity - 1 ,
          Total : this.SeatSelectionArray[40].Quantity * this.SeatSelectionArray[40].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("8B") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }


      seatselection8C(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[41].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[41].SeatType,
          SeatNumber: this.SeatSelectionArray[41].SeatNumber,
          Price : this.SeatSelectionArray[41].Price,
          Quantity: this.SeatSelectionArray[41].Quantity - 1 ,
          Total : this.SeatSelectionArray[41].Quantity * this.SeatSelectionArray[0].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("8C") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }


      seatselection9A(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[45].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.seatselection={
          SeatType: this.SeatSelectionArray[45].SeatType,
          SeatNumber: this.SeatSelectionArray[45].SeatNumber,
          Price : this.SeatSelectionArray[45].Price,
          Quantity: this.SeatSelectionArray[45].Quantity - 1 ,
          Total : this.SeatSelectionArray[45].Quantity * this.SeatSelectionArray[45].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("9A") as HTMLInputElement;
        btnCont.disabled =true;
      })
    }


      seatselection9B(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[46].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[46].SeatType,
          SeatNumber: this.SeatSelectionArray[46].SeatNumber,
          Price : this.SeatSelectionArray[46].Price,
          Quantity: this.SeatSelectionArray[46].Quantity - 1 ,
          Total : this.SeatSelectionArray[46].Quantity * this.SeatSelectionArray[46].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("9B") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }

      seatselection9C(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[47].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[47].SeatType,
          SeatNumber: this.SeatSelectionArray[47].SeatNumber,
          Price : this.SeatSelectionArray[47].Price,
          Quantity: this.SeatSelectionArray[47].Quantity - 1 ,
          Total : this.SeatSelectionArray[47].Quantity * this.SeatSelectionArray[47].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("9C") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }


//Second row  of seat selection
      seatselection2D(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[6].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[6].SeatType,
          SeatNumber: this.SeatSelectionArray[6].SeatNumber,
          Price : this.SeatSelectionArray[6].Price,
          Quantity: this.SeatSelectionArray[6].Quantity - 1 ,
          Total : this.SeatSelectionArray[6].Quantity * this.SeatSelectionArray[6].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("2D") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }

      seatselection2E(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[7].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[7].SeatType,
          SeatNumber: this.SeatSelectionArray[7].SeatNumber,
          Price : this.SeatSelectionArray[7].Price,
          Quantity: this.SeatSelectionArray[7].Quantity - 1 ,
          Total : this.SeatSelectionArray[7].Quantity * this.SeatSelectionArray[7].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("2E") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }

      seatselection2F(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[8].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[8].SeatType,
          SeatNumber: this.SeatSelectionArray[8].SeatNumber,
          Price : this.SeatSelectionArray[8].Price,
          Quantity: this.SeatSelectionArray[8].Quantity - 1 ,
          Total : this.SeatSelectionArray[8].Quantity * this.SeatSelectionArray[8].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("2F") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }


      seatselection3D(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[12].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[12].SeatType,
          SeatNumber: this.SeatSelectionArray[12].SeatNumber,
          Price : this.SeatSelectionArray[12].Price,
          Quantity: this.SeatSelectionArray[12].Quantity - 1 ,
          Total : this.SeatSelectionArray[12].Quantity * this.SeatSelectionArray[12].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("3D") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }

      seatselection3E(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[13].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[13].SeatType,
          SeatNumber: this.SeatSelectionArray[13].SeatNumber,
          Price : this.SeatSelectionArray[13].Price,
          Quantity: this.SeatSelectionArray[13].Quantity - 1 ,
          Total : this.SeatSelectionArray[13].Quantity * this.SeatSelectionArray[13].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("3E") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }

      seatselection3F(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[14].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[14].SeatType,
          SeatNumber: this.SeatSelectionArray[14].SeatNumber,
          Price : this.SeatSelectionArray[14].Price,
          Quantity: this.SeatSelectionArray[14].Quantity - 1 ,
          Total : this.SeatSelectionArray[14].Quantity * this.SeatSelectionArray[14].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("3F") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }

      seatselection4D(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[18].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[18].SeatType,
          SeatNumber: this.SeatSelectionArray[18].SeatNumber,
          Price : this.SeatSelectionArray[18].Price,
          Quantity: this.SeatSelectionArray[18].Quantity - 1 ,
          Total : this.SeatSelectionArray[18].Quantity * this.SeatSelectionArray[18].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("4D") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }


      seatselection4E(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[19].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[19].SeatType,
          SeatNumber: this.SeatSelectionArray[19].SeatNumber,
          Price : this.SeatSelectionArray[19].Price,
          Quantity: this.SeatSelectionArray[19].Quantity - 1 ,
          Total : this.SeatSelectionArray[19].Quantity * this.SeatSelectionArray[19].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("4E") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }
    
      seatselection4F(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[20].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[20].SeatType,
          SeatNumber: this.SeatSelectionArray[20].SeatNumber,
          Price : this.SeatSelectionArray[20].Price,
          Quantity: this.SeatSelectionArray[20].Quantity - 1 ,
          Total : this.SeatSelectionArray[20].Quantity * this.SeatSelectionArray[20].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("4F") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }
      seatselection5D(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[24].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[24].SeatType,
          SeatNumber: this.SeatSelectionArray[24].SeatNumber,
          Price : this.SeatSelectionArray[24].Price,
          Quantity: this.SeatSelectionArray[24].Quantity - 1 ,
          Total : this.SeatSelectionArray[24].Quantity * this.SeatSelectionArray[24].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("5D") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }

      seatselection5E(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[25].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[25].SeatType,
          SeatNumber: this.SeatSelectionArray[25].SeatNumber,
          Price : this.SeatSelectionArray[25].Price,
          Quantity: this.SeatSelectionArray[25].Quantity - 1 ,
          Total : this.SeatSelectionArray[25].Quantity * this.SeatSelectionArray[25].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("5E") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }

      seatselection5F(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[26].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[26].SeatType,
          SeatNumber: this.SeatSelectionArray[26].SeatNumber,
          Price : this.SeatSelectionArray[26].Price,
          Quantity: this.SeatSelectionArray[26].Quantity - 1 ,
          Total : this.SeatSelectionArray[26].Quantity * this.SeatSelectionArray[26].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("5F") as HTMLInputElement;
        btnCont.disabled =true;                                                                                                                      
      })
      location.reload();
    }

      seatselection6D(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[30].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[30].SeatType,
          SeatNumber: this.SeatSelectionArray[30].SeatNumber,
          Price : this.SeatSelectionArray[30].Price,
          Quantity: this.SeatSelectionArray[30].Quantity - 1 ,
          Total : this.SeatSelectionArray[30].Quantity * this.SeatSelectionArray[30].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("6D") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }

      seatselection6E(){

        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[31].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice:(this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[31].SeatType,
          SeatNumber: this.SeatSelectionArray[31].SeatNumber,
          Price : this.SeatSelectionArray[31].Price,
          Quantity: this.SeatSelectionArray[31].Quantity - 1 ,
          Total : this.SeatSelectionArray[31].Quantity * this.SeatSelectionArray[31].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("6E") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }

      seatselection6F(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[32].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[32].SeatType,
          SeatNumber: this.SeatSelectionArray[32].SeatNumber,
          Price : this.SeatSelectionArray[32].Price,
          Quantity: this.SeatSelectionArray[32].Quantity - 1 ,
          Total : this.SeatSelectionArray[32].Quantity * this.SeatSelectionArray[32].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("6F") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }

      seatselection7D(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[36].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice:(this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[36].SeatType,
          SeatNumber: this.SeatSelectionArray[36].SeatNumber,
          Price : this.SeatSelectionArray[36].Price,
          Quantity: this.SeatSelectionArray[36].Quantity - 1 ,
          Total : this.SeatSelectionArray[36].Quantity * this.SeatSelectionArray[36].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("7D") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }
      seatselection7E(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[37].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[37].SeatType,
          SeatNumber: this.SeatSelectionArray[37].SeatNumber,
          Price : this.SeatSelectionArray[37].Price,
          Quantity: this.SeatSelectionArray[37].Quantity - 1 ,
          Total : this.SeatSelectionArray[37].Quantity * this.SeatSelectionArray[37].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        localStorage.setItem("seatselection7E",this.SeatSelectionArray[37].SeatNumber+'');
        var btnCont = document.getElementById("7E") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }

      seatselection7F(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[38].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })


        this.seatselection={
          SeatType: this.SeatSelectionArray[38].SeatType,
          SeatNumber: this.SeatSelectionArray[38].SeatNumber,
          Price : this.SeatSelectionArray[38].Price,
          Quantity: this.SeatSelectionArray[38].Quantity - 1 ,
          Total : this.SeatSelectionArray[38].Quantity * this.SeatSelectionArray[38].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("7F") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }


      seatselection8D(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[42].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[42].SeatType,
          SeatNumber: this.SeatSelectionArray[42].SeatNumber,
          Price : this.SeatSelectionArray[42].Price,
          Quantity: this.SeatSelectionArray[42].Quantity - 1 ,
          Total : this.SeatSelectionArray[42].Quantity * this.SeatSelectionArray[42].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        localStorage.setItem("seatselection8D",this.SeatSelectionArray[42].SeatNumber+'');
        var btnCont = document.getElementById("8D") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }


      seatselection8E(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[43].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart()
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[43].SeatType,
          SeatNumber: this.SeatSelectionArray[43].SeatNumber,
          Price : this.SeatSelectionArray[43].Price,
          Quantity: this.SeatSelectionArray[43].Quantity - 1 ,
          Total : this.SeatSelectionArray[43].Quantity * this.SeatSelectionArray[43].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("8E") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }

      seatselection8F(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[44].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[44].SeatType,
          SeatNumber: this.SeatSelectionArray[44].SeatNumber,
          Price : this.SeatSelectionArray[44].Price,
          Quantity: this.SeatSelectionArray[44].Quantity - 1 ,
          Total : this.SeatSelectionArray[44].Quantity * this.SeatSelectionArray[44].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("8F") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }

      seatselection9D(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[48].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[48].SeatType,
          SeatNumber: this.SeatSelectionArray[48].SeatNumber,
          Price : this.SeatSelectionArray[48].Price,
          Quantity: this.SeatSelectionArray[48].Quantity - 1 ,
          Total : this.SeatSelectionArray[48].Quantity * this.SeatSelectionArray[48].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("9D") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }

      seatselection9E(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[49].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[49].SeatType,
          SeatNumber: this.SeatSelectionArray[49].SeatNumber,
          Price : this.SeatSelectionArray[49].Price,
          Quantity: this.SeatSelectionArray[49].Quantity - 1 ,
          Total : this.SeatSelectionArray[49].Quantity * this.SeatSelectionArray[49].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("9E") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }
      seatselection9F(){
        this.cart ={
          CartID: 0,
          SeatNumber: this.SeatSelectionArray[50].SeatNumber,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PostCart(this.cart).subscribe(data =>{
          this.cartservice.getspecifiedCart();
           this.cartservice.Getcartlist();
          this.toast.info('Added to Cart!');
        })
        this.cart ={
          CartID: this.cartList[0].CartID,
          SeatNumber: null,
          PreferredClassID: this.cartList[0].PreferredClassID,
          ExtraID : null,
          Totalprice: (this.frontrow) + (this.cartList[0].Totalprice),
          Quantity: this.cartList[0].Quantity
        }
        this.cartservice.PutCart(this.cart.CartID,this.cart).subscribe(data =>{

        })

        this.seatselection={
          SeatType: this.SeatSelectionArray[50].SeatType,
          SeatNumber: this.SeatSelectionArray[50].SeatNumber,
          Price : this.SeatSelectionArray[50].Price,
          Quantity: this.SeatSelectionArray[50].Quantity - 1,
          Total : this.SeatSelectionArray[50].Quantity * this.SeatSelectionArray[50].Price
        }
        this.seatselectionservice.Putseatselections(this.seatselection.SeatNumber, this.seatselection).subscribe(data =>{
        var btnCont = document.getElementById("9F") as HTMLInputElement;
        btnCont.disabled =true;
      })
      location.reload();
    }


    routers(){
      this.router.navigate(["/flight-extras"]);
    }
}

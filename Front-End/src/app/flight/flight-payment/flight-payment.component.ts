import { Component, OnInit } from '@angular/core';
import{User} from'../../shared/user.model';
import {UserService} from '../../shared/user.service';
import {NgForm} from '@angular/forms';
import {Router} from'@angular/router';
import {ToastrService} from 'ngx-toastr'
import {FlightBooking} from '../../FlightModel/flight-booking.model';
import {Airport} from '../../FlightModel/Flight-Departure.model';
import {Route} from '../../FlightModel/Flight-Arrival.model'
import {AirportService} from '../../flightServices/Flight-Departure.service';
import {RouteService} from '../../flightServices/Flight-Arrival.service';
import {PreferredClass} from '../../FlightModel/preferred-class.model';
import {PreferredClassService} from '../../flightServices/preferred-class.service';
import {CartService} from '../../flightServices/cart.service';
import {Cart} from'../../FlightModel/cart.model';
import {FlightTravellerDetailService} from '../../flightServices/flight-traveller-detail.service';
import {FlightTravellerDetail} from'../../FlightModel/flight-traveller-detail.model';
import {CreditCard} from '../../FlightModel/credit-card.model';
import {CreditCardService} from '../../flightServices/credit-card.service';
import {InternetPaymentSID} from '../../FlightModel/internet-payment-sid.model';
import {InternetPaymentSIDService} from '../../flightServices/internet-payment-sid.service';
import {Payment} from '../../FlightModel/payment';
import {PaymentService} from '../../flightServices/payment.service';
import { FlightExtra } from '../../flightmodel/flight-extra.model';
import { FlightExtraService } from '../../flightServices/flight-extra.service';
import {AirCraft} from '../../FlightModel/air-craft.model';
import {AircraftService} from '../../flightServices/aircraft.service';
import {FlightBookingService} from '../../flightServices/flight-booking.service';

@Component({
  selector: 'app-flight-payment',
  templateUrl: './flight-payment.component.html',
  styleUrls: ['./flight-payment.component.css'],
  providers:[CartService,PreferredClassService,FlightTravellerDetailService,CreditCardService,InternetPaymentSIDService,PaymentService,AirportService,RouteService,FlightExtraService,AircraftService,FlightBookingService]
})
export class FlightPaymentComponent implements OnInit {
  user:User;
  arr1Length: number;
  userClaims : any;
  preferredclass : PreferredClass;
  route : Route;
  airport : Airport;
  flightbooking: FlightBooking;
  cartList : Array<Cart> = [];
  CartTotalPrice:number;
  CartQuantity:number;
  preferredclasslist: Array<PreferredClass> =[];
  flighttravellerdetail :FlightTravellerDetail;
  specifiedclass : string;
  creditCard : CreditCard;
  internetpayment :InternetPaymentSID;
  payment : Payment;
  date : string;
  arrivalname: string;
  routelist : Array<Route> =[];
  airportlist:Array<Airport> = [];
  flightextra:FlightExtra;
  aircraftname:string;
  aircraft: Array<AirCraft> =[];
  preferredclass1 :Array<PreferredClass> = [];
  arrivaltime: string;
  time: string;
  preferredclassamount : number;
  ToTalExtras: number;
  constructor(private UserService : UserService,private router : Router,private toast : ToastrService,private preferredclassservice : PreferredClassService,private cartservice : CartService, private travellersdetailsService : FlightTravellerDetailService,private creditcardservice : CreditCardService, private internetpaymentSIDservice :InternetPaymentSIDService,private paymentservice : PaymentService,private airportservice: AirportService,private routeservice : RouteService,private flightExtraservice : FlightExtraService,private aircraftservice : AircraftService,private flightbookingservice : FlightBookingService) { }

  ngOnInit() {
    this.resetForm();
    this.UserService.getUserClaims().subscribe((data: any)=>{
      this.userClaims = data;
     
  })
  this.ToTalExtras = (+localStorage.getItem("Flight&bagcover")) +  (+localStorage.getItem("Extrabags")) + (+localStorage.getItem("SLOWXSLounge"));
this.cartservice.getspecifiedCart();
this.cartservice.cartList.subscribe((classtype:Array<Cart>)=>{
  this. cartList = classtype;
  if(classtype.length > 0){
   this.arr1Length = classtype.length;    
   this.CartTotalPrice = this.cartList[0].Totalprice;
   this.CartQuantity = this.cartList[0].Quantity;
   
  }
  
})
this.aircraftservice.Getaircraftlist();
this.aircraftservice.getspecifiedAirCraft();
this.aircraftservice.specifiedAirCraft.subscribe((classtype:Array<AirCraft>)=>{
  this.aircraft = classtype;
  if(classtype.length > 0){
    this.arr1Length = classtype.length;
    this.aircraftname = this.getairname();
  }
})

this.airportservice.getAirpot();
this.airportservice.getspecifiedAirport();
this.airportservice.specifiedAirport.subscribe((classtype:Array<Airport>)=>{
 this.airportlist = classtype;
 if(classtype.length > 0){
   this.arr1Length = classtype.length;
   this.time = this.gettime();
   this.date = this.departureDate();
 }
})
this.routeservice.GetRouteList();
this.routeservice.getspecifiedroute();
this.routeservice.specifiedroute.subscribe((classtype:Array<Route>)=>{
 this.routelist = classtype;
 if(classtype.length > 0){
   this.arr1Length = classtype.length;
   this.arrivaltime = this.getarrtime();
   this.arrivalname = this.getArrival()
 }
})
this.preferredclassservice.Getpreferredclasslist();
this.preferredclassservice.Getpreferredclass();
this.preferredclassservice.preferredclassl.subscribe((classtype:Array<PreferredClass>)=>{
this.preferredclass1 = classtype;
if(classtype.length > 0){
 this.arr1Length = classtype.length;    
 
this.specifiedclass = this.getprefferedClass();
this.preferredclassamount = this.getPrefferedClassPrice();
}

})

  }
  resetForm(form? : NgForm)
  {
     if(form != null)
     form.resetForm();
     this.flightbooking={
       FlightID: 0,
       CustomerID : +localStorage.getItem("CustomerID"),
       AirportID : +localStorage.getItem("AirportID"),
       ExtraID: 0,
       SeatNumber:'',
      ReturningDate: localStorage.getItem("ReturningDate"), 
       NumberOfTravellers:0, 
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
     if(form != null)
     form.reset();
     this.flighttravellerdetail={
      TravellerID : 0,
      CustomerID: +localStorage.getItem("CustomerID"),
      SeatNumber: null,
      Firstname : '',
      Lastname : '',
      Dateofbirth : '',
      Gender : '',
      Mobilenumber: '',
      Email : ''
     }
     if(form != null)
       form.reset();
       this.creditCard={
        CreditID: 0,
        PaymentID:null,
        CardNumber:'',
        Cardname:'',
        ExpirationDate:'',
        Cvv:'',
        Address:'',
        Country:'',
        City:'',
        PostalCode:''
       }
     
     if(form != null)
      form.reset();
      this.internetpayment={
        InternetPaymentID:0,
        PaymentID: null,
        BranchCode: '',
        BranchName: '',
        CardNumber: ''
      }
     
    }

    gettime(){
      for(var x =0;x < this.arr1Length; x++){
       if( this.airportlist[x].AirportID == +localStorage.getItem("AirportID")){
         return  this.airportlist[x].DepartingTime;
       }
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
      getaircraft(){
        for(var x =0;x < this.arr1Length; x++){
          if(this.airportlist[x].AirportID == +localStorage.getItem("AirportID")){
            return  this.airportlist[x].AircraftID;
          }
         }
      }
      getairname(){
        for(var x =0;x < this.arr1Length; x++){
          if(this.aircraft[x].AircraftID == this.getaircraft()){
            return  this.aircraft[x].AircraftName;
          }
         }
      }
      getprefferedClass(){
        for(var x =0;x < this.arr1Length; x++){
          if(this.preferredclass1[x].PreferredClassID == this.cartList[0].PreferredClassID ){
            return  this.preferredclass1[x].FlightType;
          }
        }
      }
      getarrivaltime(){
        for(var x =0;x < this.arr1Length; x++){
          if(this.airportlist[x].AirportID == +localStorage.getItem("AirportID")){
            return  this.airportlist[x].ArrivalID;
          }
         }
      }
      getarrtime(){
        for(var x =0;x < this.arr1Length; x++){
          if(this.routelist[x].ArrivalID == this.getarrivaltime()){
            return  this.routelist[x].ArrivalTime;
          }
         }
      }
      getPrefferedClassPrice(){
      for(var x =0;x < this.arr1Length; x++){
        if(this.preferredclass1[x].PreferredClassID == this.cartList[0].PreferredClassID ){
          return  this.preferredclass1[x].Price;
        }
      }
    }

    OnsubmitCrediCard(form : NgForm){
   this.creditcardservice.PostCrediCard(form.value).subscribe((data:any)=>{
   this.resetForm(form);
   this.creditcardservice.getCreditCard();
   this.toast.success('You Have Successfully saved');
   }); 
    }

    OnSubmitInternetPayment(form : NgForm){
     this.internetpaymentSIDservice.PostInternetPaymentSID(form.value).subscribe((data:any)=>{
    this.resetForm(form);
    this.toast.success('You Have Successfully saved');
    }); 

}
onSubmitPayment(){
  this.flightbooking={
    FlightID: 0,
    CustomerID : +localStorage.getItem("CustomerID"),
    AirportID : +localStorage.getItem("AirportID"),
    ExtraID: this.cartList[0].ExtraID,
    SeatNumber: this.cartList[0].SeatNumber,
    ReturningDate: localStorage.getItem("ReturningDate"), 
    NumberOfTravellers: this.cartList[0].Quantity, 
    TotalFare: this.cartList[0].Totalprice
  }
  this.flightbookingservice.PostFlightBooking(this.flightbooking).subscribe(data =>{

  });
if((document.getElementById('Credit') as HTMLInputElement).checked){
  this.payment={
    PaymentID:0,
    CustomerID:+localStorage.getItem("CustomerID"),
    PaymentType:'Credit Card',
    TotalAmount:  this.CartTotalPrice
  }

  this.paymentservice.PostPayment(this.payment).subscribe((data:any)=>{
    this.toast.success('You Have Successfully Paid');
    localStorage.setItem("Payment", this.payment.PaymentType +'');
    this.router.navigate(['/confirmation']);
  });
}
else if((document.getElementById('SID') as HTMLInputElement).checked){
  this.payment={
    PaymentID:0,
    CustomerID:+localStorage.getItem("CustomerID"),
    PaymentType:'Internet Payment SID',
    TotalAmount: this.CartTotalPrice
  }

  this.paymentservice.PostPayment(this.payment).subscribe((data:any)=>{
    this.toast.success('You Have Successfully Paid');
    localStorage.setItem("Payment", this.payment.PaymentType +'');
    this.router.navigate(['/confirmation']);
  });
}

}

shows(){
  document.getElementById('div1').style.display = 'none';
  document.getElementById('form2').style.display = 'Block';
}

shows1(){
  document.getElementById('div1').style.display = 'Block';
  document.getElementById('form2').style.display = 'none';
}

disableCredit(){
 var credit = document.getElementById('Credit') as HTMLInputElement;
 credit.disabled = true;
}
disableSID(){
  var SID = document.getElementById('SID') as HTMLInputElement;
  SID.disabled = true;
}
}

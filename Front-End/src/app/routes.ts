import {Routes} from '@angular/router';
import {HompageComponent} from './homepage/homepage.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {ProfileComponent} from'./profile/profile.component';
import{PersonalDetailsComponent} from './profile/personal-details/personal-details.component';
import {BillingInformationComponent} from'./profile/billing-information/billing-information.component';
import{AccountSettingsComponent} from'./profile/account-settings/account-settings.component';
import { AuthGuard } from './auth/auth.guard';
import {FlightComponent} from './flight/flight.component';
import {HotelComponent} from'./hotel/hotel.component';
import {CarHireComponent} from './car-hire/car-hire.component';
import {AdministratorComponent} from'./administrator/administrator.component';
import {ManageAirportComponent} from './administrator/manage-Flight-Departure/manage-airport.component';
import {ManageFlightExtrasComponent} from './administrator/manage-flight-extras/manage-flight-extras.component';
import {ManageRouteComponent} from './administrator/manage-FlightArrival/manage-route.component';
import {FlightBusinessClassComponent } from './flight/flight-business-class/flight-business-class.component';
import {FlightEconomyClassComponent } from './flight/flight-economy-class/flight-economy-class.component';
import {ManagePreferredClassComponent} from './administrator/manage-preferred-class/manage-preferred-class.component';
import {FlightExtrasComponent} from './flight/flight-extras/flight-extras.component';
import {FlightPaymentComponent} from'./flight/flight-payment/flight-payment.component';
import {FlightPassengerComponent} from './flight/flight-passenger/flight-passenger.component';
import {SeatSelectionComponent} from'./flight/seat-selection/seat-selection.component';
import {ManageSeatSelectionComponent} from './administrator/manage-seat-selection/manage-seat-selection.component';
import {ManageAircraftComponent} from './administrator/manage-aircraft/manage-aircraft.component';
import {ManageFlightBookingComponent} from './administrator/manage-flight-booking/manage-flight-booking.component';
import {ConfirmationComponent} from './flight/confirmation/confirmation.component';

export const appRoutes : Routes =[
{path : 'homepage', component : HompageComponent,canActivate:[AuthGuard] },
{path : 'sign-up', component : SignUpComponent,},
{path: 'sign-in', component : SignInComponent},
{path:'administrator',component :AdministratorComponent,canActivate:[AuthGuard]},
{path:'flight', component: FlightComponent,canActivate:[AuthGuard]},
{path:'hotel',component: HotelComponent,canActivate:[AuthGuard]},
{path:'car-hire',component:CarHireComponent ,canActivate:[AuthGuard]},
{path: 'profile',component: ProfileComponent,canActivate:[AuthGuard]},
{
path: 'personal-details',component: ProfileComponent,
children:[{path:'', component: PersonalDetailsComponent}]
},
{
path: 'billing-information',component: ProfileComponent,
children:[{path:'',component:BillingInformationComponent}]
},
{
    path:'account-settings',component: ProfileComponent,
    children:[{path:'',component:AccountSettingsComponent}]
},
{path:'manage-airport',component:ManageAirportComponent,canActivate:[AuthGuard]},
{path:'manage-flight-extras',component:ManageFlightExtrasComponent,canActivate:[AuthGuard]},
{path:'manage-route',component:ManageRouteComponent,canActivate:[AuthGuard]},
{path:'manage-seat-selection',component:ManageSeatSelectionComponent,canActivate:[AuthGuard]},
{path:'flight-economy-class',component:FlightEconomyClassComponent,canActivate:[AuthGuard]},
{path:'flight-business-class',component:FlightBusinessClassComponent,canActivate:[AuthGuard]},
{path:'manage-preferred-class',component:ManagePreferredClassComponent,canActivate:[AuthGuard]},
{path:'flight-payment',component:FlightPaymentComponent,canActivate:[AuthGuard]},
{path:'flight-passenger',component:FlightPassengerComponent,canActivate:[AuthGuard]},
{path:'seat-selection',component:SeatSelectionComponent,canActivate:[AuthGuard]},
{path:'flight-extras',component:FlightExtrasComponent,canActivate:[AuthGuard]},
{path:'manage-aircraft',component:ManageAircraftComponent,canActivate:[AuthGuard]},
{path:'manage-flight-booking',component:ManageFlightBookingComponent,canActivate:[AuthGuard]},
{path:'confirmation',component:ConfirmationComponent,canActivate:[AuthGuard]},
{path : '', redirectTo: '/sign-in', pathMatch : 'full'}
];


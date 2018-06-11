import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2DropdownModule } from 'ng2-material-dropdown';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserService } from './shared/user.service';
import { HompageComponent } from './homepage/homepage.component';
import {RouterModule} from '@angular/router';
import {appRoutes} from './routes';
import {ToastrModule} from 'ngx-toastr';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { PersonalDetailsComponent } from './profile/personal-details/personal-details.component';
import { AccountSettingsComponent } from './profile/account-settings/account-settings.component';
import { BillingInformationComponent } from './profile/billing-information/billing-information.component';
import { FlightComponent } from './flight/flight.component';
import { HotelComponent } from './hotel/hotel.component';
import { CarHireComponent } from './car-hire/car-hire.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { ManageAirportComponent } from './administrator/manage-Flight-Departure/manage-airport.component';
import { ManageRouteComponent } from './administrator/manage-FlightArrival/manage-route.component';
import { ManageFlightExtrasComponent } from './administrator/manage-flight-extras/manage-flight-extras.component';
import { FlightPassengerComponent } from './flight/flight-passenger/flight-passenger.component';
import { SeatSelectionComponent } from './flight/seat-selection/seat-selection.component';
import { FlightExtrasComponent } from './flight/flight-extras/flight-extras.component';
import { FlightPaymentComponent } from './flight/flight-payment/flight-payment.component';
import { ConfirmationComponent } from './flight/confirmation/confirmation.component';
import { FlightBusinessClassComponent } from './flight/flight-business-class/flight-business-class.component';
import { FlightEconomyClassComponent } from './flight/flight-economy-class/flight-economy-class.component';
import { ManagePreferredClassComponent } from './administrator/manage-preferred-class/manage-preferred-class.component';
import { ManageSeatSelectionComponent } from './administrator/manage-seat-selection/manage-seat-selection.component';
import { ManageFlightBookingComponent } from './administrator/manage-flight-booking/manage-flight-booking.component';
import { ManageAircraftComponent } from './administrator/manage-aircraft/manage-aircraft.component';




@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    HompageComponent,
    ProfileComponent,
    PersonalDetailsComponent,
    AccountSettingsComponent,
    BillingInformationComponent,
    FlightComponent,
    HotelComponent,
    CarHireComponent,
    AdministratorComponent,
    ManageAirportComponent,
    ManageRouteComponent,
    ManageFlightExtrasComponent,
    FlightPassengerComponent,
    SeatSelectionComponent,
    FlightExtrasComponent,
    FlightPaymentComponent,
    ConfirmationComponent,
    FlightBusinessClassComponent,
    FlightEconomyClassComponent,
    ManagePreferredClassComponent,
    ManageSeatSelectionComponent,
    ManageFlightBookingComponent,
    ManageAircraftComponent,
    
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    Ng2DropdownModule

  ],
  providers: [UserService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {

 }

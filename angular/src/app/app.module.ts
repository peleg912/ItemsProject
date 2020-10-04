import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllItemsComponent } from './components/all-items/all-items.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateModalComponent } from './components/update-modal/update-modal.component';
import { WitdrawModalComponent } from './components/witdraw-modal/witdraw-modal.component';
import { DepositModalComponent } from './components/deposit-modal/deposit-modal.component';



@NgModule({
  declarations: [
    AppComponent,
    AllItemsComponent,
    UpdateModalComponent,
    WitdrawModalComponent,
    DepositModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ UpdateModalComponent , WitdrawModalComponent, DepositModalComponent]
})
export class AppModule { }

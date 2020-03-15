import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { AddressesComponent } from './addresses/addresses.component';
import { FormAddressComponent } from './form-address/form-address.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrdersComponent } from './orders/orders.component';
import { CardOrderComponent } from './card-order/card-order.component';
import { MatCardModule } from '@angular/material/card';
import { CardAddressComponent } from './card-address/card-address.component';
import { BottomSheetAddressPickerComponent } from './bottom-sheet-address-picker/bottom-sheet-address-picker.component';
import { BottomSheetPaymentPickerComponent } from './bottom-sheet-payment-picker/bottom-sheet-payment-picker.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    AccountComponent,
    OrderDetailComponent,
    OrdersComponent,
    FormAddressComponent,
    AddressesComponent,
    CardOrderComponent,
    CardAddressComponent,
    BottomSheetAddressPickerComponent,
    BottomSheetPaymentPickerComponent,
  ],
  imports: [
    AccountRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatTabsModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatOptionModule,
    MatFormFieldModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSelectModule,
  ],
  exports: [OrderDetailComponent]
})
export class AccountModule { }

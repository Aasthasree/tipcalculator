import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'


})
export class AppComponent {
  billAmountControl = new FormControl(0);
  numPeopleControl = new FormControl(1);

  selectedTip: number = 0;
  customTip: number | null = null;
  tipAmountPerPerson: number = 0;
  totalAmountPerPerson: number = 0;

  tips: number[] = [5, 10, 15, 25, 50];

  selectTip(tip: number): void {
    this.selectedTip = tip;
    this.customTip = null;
    this.calculateTip();
  }


  enterCustomTip(): void {
    const customTipValue = prompt('Enter custom tip percentage:');
    if (customTipValue) {
      this.customTip = parseFloat(customTipValue);
      this.selectedTip = 0;
      this.calculateTip();
    }
  }


  calculateTip(): void {
    const billAmount = this.billAmountControl.value ?? 0;
    const numPeople = this.numPeopleControl.value ?? 1;
    const tipPercentage = this.customTip !== null ? this.customTip : this.selectedTip;

    if (billAmount > 0 && tipPercentage >= 0 && numPeople > 0) {
      const tipAmount = (billAmount * tipPercentage) / 100;
      const totalAmount = billAmount + tipAmount;

      this.tipAmountPerPerson = tipAmount / numPeople;
      this.totalAmountPerPerson = totalAmount / numPeople;
    } else {
      this.tipAmountPerPerson = 0;
      this.totalAmountPerPerson = 0;
    }
  }

  resetForm(): void {
    this.billAmountControl.setValue(0);
    this.numPeopleControl.setValue(1);
    this.selectedTip = 0;
    this.customTip = null;
    this.tipAmountPerPerson = 0;
    this.totalAmountPerPerson = 0;
  }
}

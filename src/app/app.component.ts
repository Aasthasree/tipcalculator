import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
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
  billAmountControl = new FormControl(null, [
    Validators.required,
  ]);
  numPeopleControl = new FormControl(null, [
    Validators.required,
  ]);
  customTipControl = new FormControl('');

  selectedTip: number = 0;
  customTip: number | null = null;
  tipAmountPerPerson: number = 0;
  totalAmountPerPerson: number = 0;
  isCustomInputVisible = false;


  tips: number[] = [5, 10, 15, 25, 50];

  selectTip(tip: number): void {
    this.selectedTip = tip;
    this.customTip = null;
    this.isCustomInputVisible = false;
    this.calculateTip();
  }

  showCustomInput(): void {
    this.isCustomInputVisible = true;
  }

  onCustomTipInput(customTipValue: string): void {
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
    this.billAmountControl.reset();
    this.numPeopleControl.reset();
    this.selectedTip = 0;
    this.customTip = null;
    this.tipAmountPerPerson = 0;
    this.totalAmountPerPerson = 0;
  }
}

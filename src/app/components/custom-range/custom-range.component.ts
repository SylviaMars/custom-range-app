import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Input } from '@angular/core';
import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomRangeComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ngc-range',
  templateUrl: './custom-range.component.html',
  styleUrls: ['./custom-range.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomRangeComponent),
    multi: true
  }]
})
export class CustomRangeComponent implements OnInit, ControlValueAccessor {

  @Input() fixed = false;
  @Input() minValue: any;
  @Input() maxValue: any;

  firstBulletDragPosition  = {x: 0, y: 0};
  secondBulletDragPosition = {x: 200, y: 0};

  firstInputActive = false;
  secondInputActive = false;

  firstValue = 0;
  secondValue = 200;

  firstBoundaryWidth     = '188px';
  secondBoundaryWidth    = 200;
  secondBoundaryPosition = '0px';

  constructor() {
  }
  writeValue(obj: any): void {
    // throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    if (this.maxValue === undefined) {
      this.maxValue = 300;
    }
    // const firstPointer = document.querySelector('#firstPointer') as HTMLInputElement;
    // const secondPointer = document.querySelector('#secondPointer') as HTMLInputElement;
    const input1 = document.querySelector('#firstValueInput') as HTMLInputElement;
    // firstPointer.style.transform = 'translate3d(0px, 0px, 0px)';
    // secondPointer.style.transform = 'translate3d(0px, 0px, 0px)';
    window.addEventListener('click', (aux) => {
      console.log(aux.currentTarget);
      if (input1 !== null) {
        if (this.firstInputActive === true && !input1.hasAttribute('focus')){
          this.inputActive(true);
        }
      }
    });
  }

  changeBulletPosition(inputValue: string, isFirstBullet: boolean): void {
    // tslint:disable-next-line: radix
    if (isFirstBullet) {
      // tslint:disable-next-line: radix
      this.firstBulletDragPosition = {x: parseInt(inputValue), y: 0};
    } else {
      // tslint:disable-next-line: radix
      this.secondBulletDragPosition = {x: parseInt(inputValue), y: 0};
    }
  }

  getFirstBulletValue(event: CdkDragEnd): void {
    console.log('first bullet position' + event.source.getFreeDragPosition().x);
    // this.firstValue = this.getPercentage(200, event.source.getFreeDragPosition().x);
    this.firstValue = event.source.getFreeDragPosition().x;
    // this.secondBoundaryWidth = this.getSecondBoundaryWidth();
    // this.secondBoundaryPosition = this.getSecondBoundaryPosition();
  }

  getSecondBulletValue(event: CdkDragEnd): void {
    console.log('first bullet position ' + event.source.getFreeDragPosition().x);
    this.secondValue = event.source.getFreeDragPosition().x;
  }

  /**
   * @returns Position desired in percentage using a rule of three.
   * @param valueSelected bullet axis position in px.
   * @param maxValue position from the second bullet; initially the total width from the range
   * div - 12px which is the size from the bullet.
   */
  getPercentage(maxValue: number, position: number): number {
    console.log('maxValue:' + maxValue, 'position: ' + position );
    return (position / 100) * maxValue;
  }

  inputActive(isFirstInput: boolean): void{
    if (isFirstInput) {
      this.firstInputActive === false ? this.firstInputActive = true : this.firstInputActive = false;
    } else {
      this.secondInputActive === false ? this.secondInputActive = true : this.secondInputActive = false;
    }
  }

  getFirstBoundaryWidth(): string{
    console.log('sec.value' + this.secondValue);
    const auxValue = this.secondValue < 88 ? this.secondValue + 12 : this.secondValue + 12;
    return (auxValue).toString() + 'px';
  }

  getSecondBoundaryWidth(): void{
    const num = this.firstValue > 12 ? (this.maxValue - this.firstValue) : (this.maxValue - this.firstValue);
    this.secondBoundaryWidth = num;
    this.secondBulletDragPosition = {x: this.getRelativePosition(), y: this.secondBulletDragPosition.y}; }

  getSecondBoundaryPosition(): void {
    this.secondBoundaryPosition = (this.firstValue).toString() + 'px';
  }

  getRelativePosition(): number {
    return (this.secondBulletDragPosition.x / 200) * this.secondBoundaryWidth;
  }

}

import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'custom-range-exercise1',
  templateUrl: './exercise1.component.html',
  styleUrls: ['./exercise1.component.scss']
})
export class Exercise1Component implements OnInit {

  maxValue = 200;
  minValue = 0;

  firstBulletDragPosition  = {x: 5, y: 0};
  secondBulletDragPosition = {x: 200, y: 0};

  firstInputActive = false;
  secondInputActive = false;

  firstValue = 1;
  secondValue = 200;

  constructor() { }

  ngOnInit(): void {
    const firstPointer = document.querySelector('#firstPointer') as HTMLInputElement;
    const secondPointer = document.querySelector('#secondPointer') as HTMLInputElement;
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
      this.firstBulletDragPosition = {x: parseInt(inputValue), y: this.firstBulletDragPosition.y};
    } else {
      // tslint:disable-next-line: radix
      this.secondBulletDragPosition = {x: parseInt(inputValue), y: this.secondBulletDragPosition.y};
    }
    console.log(this.firstBulletDragPosition, this.secondBulletDragPosition);
  }

  getFirstBulletValue(event: CdkDragEnd): void {
    console.log('first bullet position' + event.source.getFreeDragPosition().x);
    // this.firstValue = this.getPercentage(200, event.source.getFreeDragPosition().x);
    this.firstValue = event.source.getFreeDragPosition().x;
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
  getWidth(isFirstBullet: boolean): string {
    console.log('width: ' + Math.round(this.secondValue));
    const auxValue = this.secondValue + 12;
    console.log ('dsfsdfs' + auxValue);
    return (auxValue).toString() + 'px';
  }
  getSecondBoundaryPosition(): string {
    return (this.firstValue).toString() + 'px';
  }


}

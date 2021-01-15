import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Input, Output} from '@angular/core';
import { Component, OnInit, forwardRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { PriceRange } from 'src/app/models/PriceRange.model';
import { FormGroup, FormControl } from '@angular/forms';

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
    @Input() minValue: number;
    @Input() maxValue: number;
    @Output() rangeChange = new EventEmitter();

    form: FormGroup;
    priceRange: PriceRange = {min: 0, max: 100};

    // Bullets coordenates
    firstBulletDragPosition = { x: 0, y: 0 };
    secondBulletDragPosition = { x: 200, y: 0 };

    // Is input form active or else show label
    firstInputActive = false;
    secondInputActive = false;

    // Axis limit values in px
    minPxValue = 0;
    maxPxValue = 200;

    // Boundaries for bullet positions
    firstBoundaryWidth = 200;
    secondBoundaryWidth = 200;
    secondBoundaryPosition = 0;

    pricePerPx = 0;

    constructor(private detectChange: ChangeDetectorRef) {
        this.minValue = 0;
        this.maxValue = 10;
        this.priceRange = new PriceRange();
        this.form = new FormGroup({
            firstValueInput: new FormControl('', [Validators.minLength(0)]),
            secondValueInput: new FormControl('', [Validators.maxLength(1000)])
        });
    }

    onChange: (_: any) => void = (_: any) => {};
    onTouched: () => void = () => {};
    updateChanges(): void {
        this.onChange(this.priceRange);
    }
    writeValue(priceRange: PriceRange): void {
        this.priceRange = priceRange;
        this.updateChanges();
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    ngOnInit(): void {}

    /**
     * Given a price value from input, change corresponding bullet position.
     * @param inputValue Price value from input.
     * @param isFirstBullet Check if is relative to minValue or maxValue.
     */
    changeBulletPosition(inputValue: string, isFirstBullet: boolean): void {
        if (isFirstBullet) {
            if ( (parseInt(inputValue, 0) >= this.minValue) && this.maxValue > parseInt(inputValue, 0)) {
                const position = this.getProportion(this.maxPxValue, parseInt(inputValue, 0), (this.maxValue - this.minValue));
                this.firstBulletDragPosition = { x: position, y: 0 };
                this.secondBoundaryWidth = (this.maxPxValue - position) - 12;
                this.secondBoundaryPosition = position + 12;
                this.secondBulletDragPosition = { x: (200 - position) - 12, y: 0 };
            } else {
                this.form.controls.firstValueInput.setErrors({ invalid: true });
            }
        } else {
            if ( (parseInt(inputValue, 0) <= this.maxValue) && this.minValue < parseInt(inputValue, 0)) {
                const auxW = this.secondBoundaryWidth;
                const auxM = this.secondBoundaryPosition;
                this.secondBoundaryWidth = 0;
                this.secondBoundaryPosition = 0;
                const position = this.getProportion(this.maxPxValue, parseInt(inputValue, 0), (this.maxValue - this.minValue));
                this.secondBulletDragPosition = { x: position, y: 0 };
                this.firstBoundaryWidth = position + auxM;
                this.secondBoundaryWidth = auxW;
                this.secondBoundaryPosition = auxM;
            } else {
                this.form.controls.secondValueInput.setErrors({ invalid: true });
            }
            // calculate fisrt boundary width;
        }
    }

    /**
     * Given a price value calculate px proportion using a rule of three.
     * @returns px position.
     * @param x Relative value.
     * @param selectedValue Input value.
     * @param maxValue Total price range.
     */
    getProportion(x: number, selectedValue: number, maxValue: number): number {
        return  Math.floor((selectedValue * x) / maxValue);
    }

    /**
     * Get relation price per px.
     * E.g. (300€ as max price - 5€ as min price) / 200px as axis total width
     */
    getPricePerPx(): number {
        const rangeTotal = this.maxValue - this.minValue;
        return rangeTotal / this.maxPxValue;
    }

    /**
     * Calculate price by given position.
     * @param position Bullet position.
     */
    getRelativePrice(position: number, margin?: number): number {
        const pricePerPx = this.getPricePerPx();
        let calc = 0;
        if (margin) {
            const total = position + margin;
            calc = Math.floor((total * pricePerPx) + this.minValue);
        } else {
            calc = Math.floor((position * pricePerPx) + this.minValue);
        }
        return calc;
    }

    /**
     * Sets min price by bullet position value.
     * @param event Event emitted when the user stops dragging a draggable.
     */
    getFirstBulletValue(event: CdkDragEnd): void {
        this.priceRange.min = this.getRelativePrice(event.source.getFreeDragPosition().x);
        this.firstBulletDragPosition.x = event.source.getFreeDragPosition().x;
        const position = this.getProportion(this.maxPxValue, this.priceRange.min, (this.maxValue - this.minValue));
        console.log(position);
        this.secondBoundaryPosition = this.firstBulletDragPosition.x + 12;
        this.secondBoundaryWidth = (this.maxPxValue - this.secondBoundaryPosition);
        this.secondBulletDragPosition = { x: (this.secondBulletDragPosition.x - this.secondBoundaryPosition), y: 0 };
        this.rangeChange.emit(this.priceRange);
    }

    getSecondBulletValue(event: CdkDragEnd): void {
        this.priceRange.max = this.getRelativePrice(event.source.getFreeDragPosition().x, this.secondBoundaryPosition);
        this.secondBulletDragPosition.x = event.source.getFreeDragPosition().x;
        this.rangeChange.emit(this.priceRange);
    }

    /**
     * Switches inputs to active or inactive in order to display price label or input form.
     */
    inputActive(isFirstInput: boolean): void {
        if (isFirstInput) {
            this.firstInputActive === false ? this.firstInputActive = true : this.firstInputActive = false;
        } else {
            this.secondInputActive === false ? this.secondInputActive = true : this.secondInputActive = false;
        }
    }

    getFirstBoundaryWidth(): string {
        // const auxValue = this.secondValue < 188 ? this.secondValue + 12 : this.secondValue - 12;
        return (this.maxPxValue).toString() + 'px';
    }

    getSecondBoundaryWidth(): void {
        const num = this.minPxValue > 12 ? (this.maxValue - this.minPxValue) : (this.maxValue - this.minPxValue);
        this.secondBoundaryWidth = num;
        // this.secondBulletDragPosition = { x: this.getRelativePosition(), y: this.secondBulletDragPosition.y };
    }

    getSecondBoundaryPosition(): void {
        //this.secondBoundaryPosition = (this.minPxValue).toString() + 'px';
    }

    // getRelativePosition(): number {
    //     return (this.secondBulletDragPosition.x / 200) * this.secondBoundaryWidth;
    // }

}

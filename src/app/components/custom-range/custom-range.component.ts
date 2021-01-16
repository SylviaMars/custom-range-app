import { CdkDragMove } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, ElementRef, Input, Output, ViewChild} from '@angular/core';
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

    boundary = 212;

    pricePerPx = 0;

    dragDisabled = false;

    window = window.document;

    constructor(private detectChange: ChangeDetectorRef) {
        this.minValue = 0;
        this.maxValue = 10;
        this.priceRange = new PriceRange();
        this.form = new FormGroup({
            firstValueInput: new FormControl('', [Validators.minLength(0)]),
            secondValueInput: new FormControl('', [Validators.maxLength(10000)])
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

    ngOnInit(): void {
        window.document.addEventListener('click', (e: MouseEvent) => {
            if (e.target !== null ) {
                const ev = e.target as HTMLTextAreaElement;
                switch (ev.id) {
                    case 'firstValueLabel': {
                        this.firstInputActive = true;
                        break;
                    }
                    case 'secondValueLabel': {
                        this.secondInputActive = true;
                        break;
                    }
                    case 'firstValueInput': {
                        this.firstInputActive = true;
                        break;
                    }
                    case 'secondValueInput': {
                        this.secondInputActive = true;
                        break;
                    }
                    default: {
                        this.firstInputActive = false;
                        this.secondInputActive = false;
                        break;
                    }
                }
            }
        });
    }

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
            } else {
                this.form.controls.firstValueInput.setErrors({ invalid: true });
            }
        } else {
            if ( (parseInt(inputValue, 0) <= this.maxValue) && this.minValue < parseInt(inputValue, 0)) {
                const position = this.getProportion(this.maxPxValue, parseInt(inputValue, 0), (this.maxValue - this.minValue));
                this.secondBulletDragPosition = { x: position, y: 0 };
            } else {
                this.form.controls.secondValueInput.setErrors({ invalid: true });
            }
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
        return  (selectedValue * x) / maxValue;
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
    getRelativePrice(position: number): number {
        const pricePerPx = this.getPricePerPx();
        let calc = 0;
        if (position === 200){
            calc = (position * pricePerPx) + +(this.minValue);
        } else {
            calc = position * pricePerPx;
        }
        return calc;
    }

    /**
     * Sets min price for first bullet position value.
     * @param event Event emitted when the user stops dragging a draggable.
     */
    getFirstBulletValue(event: CdkDragMove): void {
        if ((event.source.getFreeDragPosition().x + 11) < this.secondBulletDragPosition.x){
            this.priceRange.min = this.getRelativePrice(event.source.getFreeDragPosition().x);
            this.firstBulletDragPosition.x = event.source.getFreeDragPosition().x;
            this.firstBulletDragPosition.y = 0;
            this.rangeChange.emit(this.priceRange);
        } else {
            document.dispatchEvent(new Event('mouseup'));
            this.firstBulletDragPosition = { x: this.secondBulletDragPosition.x - 12, y: 0 };
        }
    }

    /**
     * Sets min price for second bullet position value.
     * @param event Event emitted when the user stops dragging a draggable.
     */
    getSecondBulletValue(event: CdkDragMove): void {
        if (event.source.getFreeDragPosition().x > this.firstBulletDragPosition.x){
            this.priceRange.max = this.getRelativePrice(event.source.getFreeDragPosition().x);
            this.secondBulletDragPosition.x = event.source.getFreeDragPosition().x;
            this.secondBulletDragPosition.y = 0;
            this.rangeChange.emit(this.priceRange);
        } else {
            document.dispatchEvent(new Event('mouseup'));
            this.secondBulletDragPosition = { x: this.firstBulletDragPosition.x + 12, y: 0 };
        }
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

}

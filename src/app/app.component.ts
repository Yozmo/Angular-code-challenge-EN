import { AsyncPipe, JsonPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { VehiclesSelectors } from './store/vehicles.selectors';
import { VehicleActions } from './store/vehicles.actions';
import { VehicleForm, VehiclesType, vehicles } from './models/vehicles';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { VehicleImageComponent } from './vehicle-image/vehicle-image.component';
import { Subscription, distinctUntilChanged } from 'rxjs';


/**
 * For the simplicity of the example, we're using the same component.
 * I don't see any reasons to split it into multiple components.
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [NgForOf, NgIf, ReactiveFormsModule, AsyncPipe, JsonPipe, NgClass, VehicleImageComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly vehicleSelectors = inject(VehiclesSelectors);
  private readonly vehicleActions = inject(VehicleActions);
  private readonly fb = inject(FormBuilder);
  private readonly subscription = new Subscription();
  

  readonly vehicleTypes$ = this.vehicleSelectors.selectVehicleTypes$();
  readonly subVehiclesTypes$ = this.vehicleSelectors.selectSubVehicles$();

  vehicleForm!: FormGroup;
 
  constructor() {
    this.vehicleForm = this.fb.group<VehicleForm>({
      vehicleType: new FormControl(null),
      vehicleSubType: new FormControl(null),
      plateNumber: new FormControl('', {
        nonNullable: true,
         // validate the plate number with the following pattern:
         // 1. two letters - two letters - two digits
         // 2. two letters - two digits - two letters
        validators: [Validators.required, Validators.pattern(/^(?:[A-Z]{2}-[A-Z]{2}-\d{2}|[A-Z]{2}-\d{2}-[A-Z]{2})$/)]
      }),
    });
  }

  ngOnInit() {
    this.subscription.add(this.vehicleSelectors.selectCurrentVehicleType$()
      .subscribe((vehicleType) => {
        this.vehicleForm.patchValue({
          vehicleType,
          vehicleSubType: vehicleType !== VehiclesType.Scooter ? vehicles[vehicleType][0] : null,
        });
      }));

    this.subscription.add(this.vehicleForm.valueChanges
      .subscribe(({ vehicleType, plateNumber }) => {
        this.vehicleForm.patchValue({'plateNumber': plateNumber.replace(/[A-Z0-9]{2}(?=\w)/g, `$&-`).toUpperCase()}, { emitEvent: false });
      }));

    this.subscription.add(this.vehicleForm.get('vehicleType')?.valueChanges
    .pipe(distinctUntilChanged())
    .subscribe((vehicleType) => {
      this.changeVehicleType(vehicleType)
    }));
  }


  /**
   * Even if the component is never destroyed, for the sake of the example,
   * we're unsubscribing from the subscription. 
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  changeVehicleType(vehicleType: VehiclesType) {
    this.vehicleActions.changeVechicleType(vehicleType);
    this.vehicleForm.patchValue({'vehicleSubType': vehicleType !== VehiclesType.Scooter ? vehicles[vehicleType][0] : null, 'plateNumber': ''});
    this.vehicleForm.markAsUntouched();
  }

  // #performanceMatters
  trackByFn(index: number, item: string) {
    return index;
  }


  isScooterCurrentVehicle() {
    return this.vehicleForm.get('vehicleType')?.value === VehiclesType.Scooter;
  }

  getCurrentImage() {
    const vehicleType = this.vehicleForm.get('vehicleType')?.value.toLowerCase();

    return `./assets/${vehicleType}.jpg`;
  }

  submit() {
    console.log(this.vehicleForm.value);
    this.vehicleForm.markAsPristine();
  }
}

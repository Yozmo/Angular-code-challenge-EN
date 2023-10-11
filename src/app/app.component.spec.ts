import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { VehiclesType } from './models/vehicles';
import { VehicleImageComponent } from './vehicle-image/vehicle-image.component';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore({  })],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


  describe('getting the image', () => {
    let app: AppComponent;

    beforeEach(async () => {
      const fixture = TestBed.createComponent(AppComponent);
      app = fixture.componentInstance;
    });

    it('should return the image with the car', () => {
      app.vehicleForm.patchValue({ vehicleType: VehiclesType.Auto});

      expect(app.getCurrentImage()).toEqual('./assets/auto.jpg');
    });

    it('should return the image with the motor', () => {
      app.vehicleForm.patchValue({ vehicleType: VehiclesType.Motor});

      expect(app.getCurrentImage()).toEqual('./assets/motor.jpg');
    });

    it('should return the image with the scutter', () => {
      app.vehicleForm.patchValue({ vehicleType: VehiclesType.Scooter});

      expect(app.getCurrentImage()).toEqual('./assets/scooter.jpg');
    });
  });

  describe('verify the vehicle type is not scooter', () => {
    let app: AppComponent;

    beforeEach(async () => {
      const fixture = TestBed.createComponent(AppComponent);
      app = fixture.componentInstance;
    });

    it('should return false if the vehicle type is auto', () => {
      app.vehicleForm.patchValue({ vehicleType: VehiclesType.Auto});

      expect(app.isScooterCurrentVehicle()).toBeFalse();
    });

    it('should return false if the vehicle type is motor', () => {
      app.vehicleForm.patchValue({ vehicleType: VehiclesType.Motor});

      expect(app.isScooterCurrentVehicle()).toBeFalse();
    });

    it('should return true if the vehicle type is scooter', () => {
      app.vehicleForm.patchValue({ vehicleType: VehiclesType.Scooter});

      expect(app.isScooterCurrentVehicle()).toBeTrue();
    });
  });

  describe('verify the vehicle type is not scooter', () => {
    let app: AppComponent;

    beforeEach(async () => {
      const fixture = TestBed.createComponent(AppComponent);
      app = fixture.componentInstance;
    });

    it('should return false if the vehicle type is auto', () => {
      app.vehicleForm.patchValue({ vehicleType: VehiclesType.Auto});

      expect(app.isScooterCurrentVehicle()).toBeFalse();
    });

    it('should return false if the vehicle type is motor', () => {
      app.vehicleForm.patchValue({ vehicleType: VehiclesType.Motor});

      expect(app.isScooterCurrentVehicle()).toBeFalse();
    });

    it('should return true if the vehicle type is scooter', () => {
      app.vehicleForm.patchValue({ vehicleType: VehiclesType.Scooter});

      expect(app.isScooterCurrentVehicle()).toBeTrue();
    });
  });
});

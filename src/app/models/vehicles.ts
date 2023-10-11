import { FormControl } from '@angular/forms';

export enum VehiclesType {
  Auto = 'Auto',
  Motor  = 'Motor',
  Scooter = 'Scooter',
}

export const vehicles = {
  [VehiclesType.Auto]: ['Hatchback', 'Sedan', 'Cabriolet', 'Coupe', 'MultiPurposeVehicle (MVP)', 'Terreinauto'],
  [VehiclesType.Motor]: ['All-road', 'Naked', 'Enduro', 'Race', 'Toermotor', 'Chopper', 'Zijspan'],
  [VehiclesType.Scooter]: null,
};

export interface VehicleForm {
  vehicleType: FormControl<VehiclesType|null>;
  vehicleSubType: FormControl<string|null>;
  plateNumber: FormControl<string>;
}
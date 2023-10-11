import { createReducer, on } from "@ngrx/store";
import { VehiclesType, vehicles } from "../models/vehicles";
import { changeVechicleTypeAction } from "./vehicles.actions";

export const appFeatureKey = 'vehicles';

export interface AppState {
  currentVehicleType: VehiclesType;
  vehiclesTypes: VehiclesType[];
  vehiclesSubTypes: string[] | null;
}

export const initialAppState: AppState = {
  currentVehicleType: VehiclesType.Auto,
  vehiclesTypes: [VehiclesType.Auto, VehiclesType.Motor, VehiclesType.Scooter],
  vehiclesSubTypes: vehicles[VehiclesType.Auto],
};

export const vehicleReducer = createReducer(
  initialAppState,
  on(changeVechicleTypeAction, (state, { vechicleType }) => ({
    ...state,
    currentVehicleType: vechicleType,
    vehiclesSubTypes: vehicles[vechicleType],
  }))
);
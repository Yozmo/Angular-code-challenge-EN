import { Store, createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState, appFeatureKey } from "./vehicles.reducer";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { VehiclesType } from "../models/vehicles";

const selectFeature = createFeatureSelector<AppState>(appFeatureKey);

const selectVehicleTypes = createSelector(
  selectFeature,
  (state) => state.vehiclesTypes
);

const selectSubVehicles = createSelector(
  selectFeature,
  (state) => state.vehiclesSubTypes
);

const selectCurrentVehicleType = createSelector(
  selectFeature,
  (state) => state.currentVehicleType
);

@Injectable({
  providedIn: 'root'
})
export class VehiclesSelectors {
  private readonly store = inject(Store<AppState>);

  selectVehicleTypes$(): Observable<VehiclesType[]> {
    return this.store.select(selectVehicleTypes);
  }

  selectSubVehicles$(): Observable<string[] | null> {
    return this.store.select(selectSubVehicles);
  }

  selectCurrentVehicleType$(): Observable<VehiclesType> {
    return this.store.select(selectCurrentVehicleType);
  }
}
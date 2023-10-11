import { Store, createAction, props } from "@ngrx/store";
import { VehiclesType } from "../models/vehicles";
import { Injectable, inject } from "@angular/core";


export const changeVechicleTypeAction = createAction(
  '[Vechicles] Change Vechicle Type', props<{ vechicleType: VehiclesType }>()
);


@Injectable({
  providedIn: 'root',
})
export class VehicleActions {
  private readonly store = inject(Store);


  changeVechicleType(vechicleType: VehiclesType) {
    this.store.dispatch(changeVechicleTypeAction({ vechicleType }));
  }
}
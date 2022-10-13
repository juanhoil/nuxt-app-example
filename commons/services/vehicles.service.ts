import { Vehicle } from "../types/vehicles.model";
import { BaseService } from "./base.service";

class VehiclesService extends BaseService<Vehicle> {
  constructor() {
    super('vehicles')
  }
}
export const vehiclesService = new VehiclesService();

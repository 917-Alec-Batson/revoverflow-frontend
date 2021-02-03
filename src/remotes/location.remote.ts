/**
 * @author Stephen Wong
 */

import { authAxios } from "./internal.axios";
import { Location } from "../models/location";

export const getLocations = async () => {
  const response = await authAxios.get<Location[]>(`/locations`);
  return response.data;
};

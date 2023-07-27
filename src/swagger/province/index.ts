import { PathRequest } from "~/swagger/type";

export const getProvinces: PathRequest = {
  tags: ['Province'],
  summary: 'v1/provinces.GET',
  responses: {
    '200': { description: 'Return list of province' }
  }
}
export const getDistricts: PathRequest = {
  tags: ['Province'],
  summary: 'v1/provinces/:province_code/districts.GET',
  parameters: [
    {
      in: 'path',
      name: 'province_code',
      type: 'integer',
      required: true,
    }
  ],
  responses: {
    '200': { description: 'Return list of district by province code' }
  }
}
export const getWards: PathRequest = {
  tags: ['Province'],
  summary: 'v1/districts/:district_code/wards.GET',
  parameters: [
    {
      in: 'path',
      name: 'district_code',
      type: 'integer',
      required: true,
    }
  ],
  responses: {
    '200': { description: 'Return list of ward by district code' }
  }
}
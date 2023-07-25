import { Request, Response } from "express"
import axios from "axios"
import { prismaClient } from "~/prisma-client"
import { paginationData, transformDataHelper } from "~/helpers"
import { omit } from "lodash"

class ProvinceController {
  async provinces(req: Request, res: Response) {
    const [response, total] = await prismaClient.$transaction([
      prismaClient.province.findMany(),
      prismaClient.province.count()
    ])
    if (total === 0) {
      const result = await axios.get('https://provinces.open-api.vn/api/?depth=1').then(res => res.data)
      await prismaClient.province.createMany({
        data: result.map((i: any) => { return omit(i, 'districts') })
      })
      return res.send(transformDataHelper(paginationData(result, result.length, 1, result.length)))
    }
    return res.send(paginationData(response, response.length, 1, response.length))
  }

  async districtsByProvince(req: Request, res: Response) {
    const { province_code } = req.params
    const total = await prismaClient.district.count()
    if (total === 0) {
      const provincesApi = await axios.get('https://provinces.open-api.vn/api/?depth=2')
      const districts = provincesApi.data.map((item: any) => item.districts).flat().map((i: any) => { return omit(i, 'wards') })
      await prismaClient.district.createMany({
        data: districts
      })
      const data = districts.filter((i: any) => i.province_code === Number(province_code))
      return res.send(transformDataHelper(paginationData(data, data.length, 1, data.length)))
    }
    const response = await prismaClient.district.findMany({
      where: { province_code: Number(province_code) }
    })
    return res.send(transformDataHelper(paginationData(response, response.length, 1, response.length)))
  }

  async getWardsByDistrict(req: Request, res: Response) {
    const { district_code } = req.params
    const total = await prismaClient.ward.count()
    if (total === 0) {
      const wardsApi = await axios.get('https://provinces.open-api.vn/api/w/').then(res => res.data)
      await prismaClient.ward.createMany({
        data: wardsApi
      })
      const data = wardsApi.filter((i: any) => i.district_code = Number(district_code))
      return res.send(transformDataHelper(paginationData(data, data.length, 1, data.length)))
    }
    const response = await prismaClient.ward.findMany({
      where: { district_code: Number(district_code) }
    })
    return res.send(transformDataHelper(paginationData(response, response.length, 1, response.length)))
  }
}
export const provinceController = new ProvinceController()
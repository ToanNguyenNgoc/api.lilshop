import { Request, Response } from "express"

export function convertBoolean(type: any) {
  let result
  if (type === 'false') return result = false
  if (type === 'true') return result = true
  return result
}

export function convertOrderBy(type: any) {
  let result
  if (!type || type === 'desc') return result = 'desc'
  if (type === 'asc') return result = 'asc'
  return result
}
export function convertOrderByProduct(type: any) {
  let orderBy: any = { 'created_at': 'desc' }
  switch (type) {
    case 'created_at':
      return orderBy = { 'created_at': 'asc' };
    case 'price':
      return orderBy = { 'price_special': 'asc' };
    case '-price':
      return orderBy = { 'price_special': 'desc' };
    case 'price_original':
      return orderBy = { 'price_original': 'asc' };
    case '-price_original':
      return orderBy = { 'price_original': 'desc' };
    default:
      break;
  }
  return orderBy
}
export function convertFilterCategoryProduct(req: Request) {
  const category_names: string[] = typeof req.query.category_ids === "string" ?
    req.query.category_ids.split('|') : []
  const category_ids: number[] = category_names.length > 0 ?
    category_names.map(i => Number(i)).filter(Boolean) : []
  return {
    category_names,
    category_ids
  }
}
export function convertOrderByBanner(type: any) {
  let orderBy: any = { 'created_at': 'desc' }
  switch (type) {
    case 'created_at':
      return orderBy = { 'created_at': 'asc' };
    case 'priority':
      return orderBy = { 'priority': 'asc' };
    case '-priority':
      return orderBy = { 'priority': 'desc' };
    default:
      break;
  }
  return orderBy
}

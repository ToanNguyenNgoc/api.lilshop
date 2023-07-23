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

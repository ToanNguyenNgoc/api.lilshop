export const transformDataHelper = <T>(context: T) => {
  return {
    statusCode: 200,
    context
  }
}
export const paginationData = <T>(data: T, total: number, page: number, limit: number) => {
  const context = {
    data,
    total,
    total_page: Math.ceil(total / limit),
    prev_page: page - 1 > 0 ? page - 1 : 0,
    current_page: page,
    next_page: page + 1 > Math.ceil(total / limit) ? Math.ceil(total / limit) : page + 1
  }
  return context
}
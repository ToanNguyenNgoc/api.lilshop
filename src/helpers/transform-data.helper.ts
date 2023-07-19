export const transformDataHelper = <T>(context: T) => {
  return {
    statusCode: 200,
    context
  }
}
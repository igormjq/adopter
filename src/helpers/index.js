export const responseGenerator = (status, data, message) => {
  switch(status) {
    case 200:
      return {
        status,
        data
      }
    case 201: {
      return {
        status,
        message,
        data
      }
    }
  }
}
interface APIResponse {
  timestamp: number
  message: string
  data: Object
}

function handleApiResponse(
  data: Object,
  message: string = 'OK',
  timestamp: number = Date.now()
): APIResponse {
  return {
    timestamp: timestamp,
    message: message,
    data: data,
  }
}

export { handleApiResponse }

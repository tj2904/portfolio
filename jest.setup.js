// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock Response and ReadableStream for Next.js API routes
if (typeof Response === 'undefined') {
  global.Response = class Response {
    constructor(body, init) {
      this.body = body
      this.init = init
      this.status = init?.status || 200
      this.statusText = init?.statusText || ''
      this.headers = new Headers(init?.headers)
    }
  }
}

if (typeof ReadableStream === 'undefined') {
  global.ReadableStream = class ReadableStream {
    constructor() {
      // Minimal mock for testing
    }
  }
}

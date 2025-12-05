import { NextRequest } from 'next/server'
import { GET } from '../route'

// Mock @vercel/og ImageResponse
jest.mock('@vercel/og', () => ({
  ImageResponse: jest.fn().mockImplementation((element) => {
    return {
      body: 'mocked-image-response',
      element,
    }
  }),
}))

describe('OG Image API Route', () => {
  it('returns a response', async () => {
    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams({ title: 'Test Title' }),
      },
    } as NextRequest

    const response = await GET(mockRequest)

    expect(response).toBeDefined()
  })

  it('handles requests with title parameter', async () => {
    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams({ title: 'My Project' }),
      },
    } as NextRequest

    const response = await GET(mockRequest)

    expect(response).toBeDefined()
  })

  it('handles requests without title parameter', async () => {
    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams(),
      },
    } as NextRequest

    const response = await GET(mockRequest)

    expect(response).toBeDefined()
  })
})

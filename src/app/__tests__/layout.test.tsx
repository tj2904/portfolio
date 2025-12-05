import { render, screen } from '@testing-library/react'
import RootLayout, { metadata } from '../layout'

// Mock the Analytics and SpeedInsights components
jest.mock(
  '@vercel/analytics/react',
  () => ({
    Analytics: () => <div data-testid="analytics">Analytics</div>,
  }),
  { virtual: true },
)

jest.mock(
  '@vercel/speed-insights/next',
  () => ({
    SpeedInsights: () => <div data-testid="speed-insights">SpeedInsights</div>,
  }),
  { virtual: true },
)

describe('RootLayout', () => {
  it('renders children correctly', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders html element with correct attributes', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
    )

    const html = container.querySelector('html')
    expect(html).toHaveAttribute('lang', 'en')
    expect(html).toHaveClass('h-full')
    expect(html).toHaveClass('bg-white')
    expect(html).toHaveClass('antialiased')
  })

  it('renders body element with correct classes', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
    )

    const body = container.querySelector('body')
    expect(body).toHaveClass('flex')
    expect(body).toHaveClass('min-h-full')
  })

  it('includes Analytics component', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
    )

    expect(screen.getByTestId('analytics')).toBeInTheDocument()
  })

  it('includes SpeedInsights component', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
    )

    expect(screen.getByTestId('speed-insights')).toBeInTheDocument()
  })

  it('includes preconnect link for fonts', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
    )

    const preconnect = container.querySelector('link[rel="preconnect"]')
    expect(preconnect).toBeInTheDocument()
    expect(preconnect).toHaveAttribute('href', 'https://cdn.fontshare.com')
  })

  it('includes font stylesheet link', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
    )

    const stylesheet = container.querySelector('link[rel="stylesheet"]')
    expect(stylesheet).toBeInTheDocument()
    expect(stylesheet?.getAttribute('href')).toContain('fontshare.com')
  })

  it('includes og:site_name meta tag', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
    )

    const ogSiteName = container.querySelector('meta[property="og:site_name"]')
    expect(ogSiteName).toBeInTheDocument()
    expect(ogSiteName).toHaveAttribute('content', 'tj2904.com')
  })

  describe('Metadata', () => {
    it('has correct title template', () => {
      expect(metadata.title).toHaveProperty('template', 'Tim Jackson : %s')
    })

    it('has correct default title', () => {
      expect(metadata.title).toHaveProperty(
        'default',
        "Tim Jackson's Portfolio",
      )
    })

    it('has correct description', () => {
      expect(metadata.description).toBe(
        "A collection of Tim Jackson's work and projects.",
      )
    })
  })
})

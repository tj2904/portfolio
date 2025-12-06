import { render, screen } from '@testing-library/react'
import NotFound from '../not-found'

// Mock next/link
jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode
    href: string
    className?: string
  }) => {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }
  MockLink.displayName = 'Link'
  return MockLink
})

// Mock the Waveform component
jest.mock('@/components/Waveform', () => ({
  Waveform: ({ className }: { className?: string }) => (
    <div data-testid="waveform" className={className}>
      Waveform
    </div>
  ),
}))

describe('NotFound Page', () => {
  it('renders the 404 status', () => {
    render(<NotFound />)

    expect(screen.getByText('404')).toBeInTheDocument()
  })

  it('renders the page not found heading', () => {
    render(<NotFound />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Page not found',
    )
  })

  it('displays the error message', () => {
    render(<NotFound />)

    // Use regex to handle any apostrophe variation
    expect(
      screen.getByText(/Sorry, we couldn.t find the page you.re looking for\./),
    ).toBeInTheDocument()
  })

  it('renders a link back to home', () => {
    render(<NotFound />)

    const homeLink = screen.getByRole('link', { name: /go back home/i })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('renders the Waveform component', () => {
    render(<NotFound />)

    expect(screen.getByTestId('waveform')).toBeInTheDocument()
  })

  it('has correct structure with main element', () => {
    const { container } = render(<NotFound />)

    const main = container.querySelector('main')
    expect(main).toBeInTheDocument()
  })

  it('displays font-mono class on 404 text', () => {
    render(<NotFound />)

    const notFoundText = screen.getByText('404')
    expect(notFoundText).toHaveClass('font-mono')
  })

  it('applies correct styling classes to main', () => {
    const { container } = render(<NotFound />)

    const main = container.querySelector('main')
    expect(main).toHaveClass('relative')
    expect(main).toHaveClass('flex')
    expect(main).toHaveClass('h-full')
  })

  it('home link has correct styling classes', () => {
    render(<NotFound />)

    const homeLink = screen.getByRole('link', { name: /go back home/i })
    expect(homeLink).toHaveClass('text-pink-500')
  })
})

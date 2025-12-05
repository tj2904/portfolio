import { render, screen, fireEvent } from '@testing-library/react'
import { AboutSection } from '../AboutSection'

// Mock the TinyWaveFormIcon component
jest.mock('@/components/TinyWaveFormIcon', () => ({
  TinyWaveFormIcon: ({
    colors,
    className,
  }: {
    colors: string[]
    className?: string
  }) => (
    <div
      data-testid="tiny-waveform-icon"
      data-colors={colors.join(',')}
      className={className}
    >
      Icon
    </div>
  ),
}))

describe('AboutSection', () => {
  it('renders the section element', () => {
    const { container } = render(<AboutSection />)

    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('renders the About heading', () => {
    render(<AboutSection />)

    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders TinyWaveFormIcon with correct colors', () => {
    render(<AboutSection />)

    const icon = screen.getByTestId('tiny-waveform-icon')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('data-colors', 'fill-violet-300,fill-pink-300')
  })

  it('renders the about text', () => {
    render(<AboutSection />)

    expect(screen.getByText(/This site collates projects/i)).toBeInTheDocument()
  })

  it('shows "Show more" button initially', () => {
    render(<AboutSection />)

    const button = screen.getByRole('button', { name: /show more/i })
    expect(button).toBeInTheDocument()
  })

  it('text has line-clamp initially', () => {
    const { container } = render(<AboutSection />)

    const paragraph = container.querySelector('p')
    expect(paragraph).toHaveClass('lg:line-clamp-4')
  })

  it('expands text when "Show more" is clicked', () => {
    const { container } = render(<AboutSection />)

    const button = screen.getByRole('button', { name: /show more/i })
    fireEvent.click(button)

    const paragraph = container.querySelector('p')
    expect(paragraph).not.toHaveClass('lg:line-clamp-4')
  })

  it('hides "Show more" button after expanding', () => {
    render(<AboutSection />)

    const button = screen.getByRole('button', { name: /show more/i })
    fireEvent.click(button)

    expect(
      screen.queryByRole('button', { name: /show more/i }),
    ).not.toBeInTheDocument()
  })

  it('forwards additional props to section element', () => {
    const { container } = render(<AboutSection className="custom-class" />)

    const section = container.querySelector('section')
    expect(section).toHaveClass('custom-class')
  })

  it('heading has correct structure and classes', () => {
    render(<AboutSection />)

    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveClass('flex')
    expect(heading).toHaveClass('items-center')
    expect(heading).toHaveClass('font-mono')
  })
})

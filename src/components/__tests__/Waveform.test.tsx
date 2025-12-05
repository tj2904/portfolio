import { render } from '@testing-library/react'
import { Waveform } from '../Waveform'

describe('Waveform', () => {
  it('renders an SVG element', () => {
    const { container } = render(<Waveform />)

    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('has aria-hidden attribute', () => {
    const { container } = render(<Waveform />)

    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders defs section with gradients and masks', () => {
    const { container } = render(<Waveform />)

    const defs = container.querySelector('defs')
    expect(defs).toBeInTheDocument()
  })

  it('renders linear gradients', () => {
    const { container } = render(<Waveform />)

    const gradients = container.querySelectorAll('linearGradient')
    expect(gradients.length).toBeGreaterThanOrEqual(2)
  })

  it('renders mask element', () => {
    const { container } = render(<Waveform />)

    const mask = container.querySelector('mask')
    expect(mask).toBeInTheDocument()
  })

  it('renders pattern element', () => {
    const { container } = render(<Waveform />)

    const pattern = container.querySelector('pattern')
    expect(pattern).toBeInTheDocument()
  })

  it('pattern has correct height', () => {
    const { container } = render(<Waveform />)

    const pattern = container.querySelector('pattern')
    expect(pattern).toHaveAttribute('height', '100%')
  })

  it('renders 100 bars in pattern', () => {
    const { container } = render(<Waveform />)

    const pattern = container.querySelector('pattern')
    const bars = pattern?.querySelectorAll('rect')
    expect(bars?.length).toBe(100)
  })

  it('renders main rect with full dimensions', () => {
    const { container } = render(<Waveform />)

    const rects = container.querySelectorAll(
      'rect[width="100%"][height="100%"]',
    )
    expect(rects.length).toBeGreaterThan(0)
  })

  it('main rect has opacity', () => {
    const { container } = render(<Waveform />)

    const svg = container.querySelector('svg')
    const rects = svg?.querySelectorAll('rect[width="100%"][height="100%"]')
    const mainRect = Array.from(rects || []).find((rect) =>
      rect.getAttribute('fill')?.includes('gradient'),
    )

    expect(mainRect).toHaveAttribute('opacity', '0.35')
  })

  it('forwards additional props to SVG', () => {
    const { container } = render(<Waveform className="custom-class" />)

    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('custom-class')
  })
})

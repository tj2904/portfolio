import { render } from '@testing-library/react'
import { TinyWaveFormIcon } from '../TinyWaveFormIcon'

describe('TinyWaveFormIcon', () => {
  const defaultColors = ['fill-indigo-300', 'fill-blue-300']

  it('renders an SVG element', () => {
    const { container } = render(<TinyWaveFormIcon colors={defaultColors} />)

    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('has correct viewBox', () => {
    const { container } = render(<TinyWaveFormIcon colors={defaultColors} />)

    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 10 10')
  })

  it('has aria-hidden attribute', () => {
    const { container } = render(<TinyWaveFormIcon colors={defaultColors} />)

    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders two path elements', () => {
    const { container } = render(<TinyWaveFormIcon colors={defaultColors} />)

    const paths = container.querySelectorAll('path')
    expect(paths.length).toBe(2)
  })

  it('applies first color to first path', () => {
    const { container } = render(<TinyWaveFormIcon colors={defaultColors} />)

    const paths = container.querySelectorAll('path')
    expect(paths[0]).toHaveClass(defaultColors[0])
  })

  it('applies second color to second path', () => {
    const { container } = render(<TinyWaveFormIcon colors={defaultColors} />)

    const paths = container.querySelectorAll('path')
    expect(paths[1]).toHaveClass(defaultColors[1])
  })

  it('forwards additional props to SVG element', () => {
    const { container } = render(
      <TinyWaveFormIcon colors={defaultColors} className="custom-class" />,
    )

    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('custom-class')
  })

  it('works with different color arrays', () => {
    const customColors = ['fill-red-500', 'fill-green-500']
    const { container } = render(<TinyWaveFormIcon colors={customColors} />)

    const paths = container.querySelectorAll('path')
    expect(paths[0]).toHaveClass('fill-red-500')
    expect(paths[1]).toHaveClass('fill-green-500')
  })
})

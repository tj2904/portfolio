import { render } from '@testing-library/react'
import { Container } from '../Container'

describe('Container', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Container>
        <div>Test Content</div>
      </Container>,
    )

    expect(getByText('Test Content')).toBeInTheDocument()
  })

  it('applies default classes', () => {
    const { container } = render(
      <Container>
        <div>Test</div>
      </Container>,
    )

    const outerDiv = container.firstChild as HTMLElement
    expect(outerDiv).toHaveClass('lg:px-8')
  })

  it('merges custom className with default classes', () => {
    const { container } = render(
      <Container className="custom-class">
        <div>Test</div>
      </Container>,
    )

    const outerDiv = container.firstChild as HTMLElement
    expect(outerDiv).toHaveClass('lg:px-8')
    expect(outerDiv).toHaveClass('custom-class')
  })

  it('forwards additional props to div element', () => {
    const { container } = render(
      <Container data-testid="test-container">
        <div>Test</div>
      </Container>,
    )

    const outerDiv = container.firstChild as HTMLElement
    expect(outerDiv).toHaveAttribute('data-testid', 'test-container')
  })
})

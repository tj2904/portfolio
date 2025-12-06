import { render } from '@testing-library/react'
import { FormattedDate } from '../FormattedDate'

describe('FormattedDate', () => {
  it('renders a time element', () => {
    const date = new Date('2023-05-15')
    const { container } = render(<FormattedDate date={date} />)

    const timeElement = container.querySelector('time')
    expect(timeElement).toBeInTheDocument()
  })

  it('formats date as "Month Year"', () => {
    const date = new Date('2023-05-15')
    const { getByText } = render(<FormattedDate date={date} />)

    expect(getByText('May 2023')).toBeInTheDocument()
  })

  it('includes ISO datetime attribute', () => {
    const date = new Date('2023-05-15')
    const { container } = render(<FormattedDate date={date} />)

    const timeElement = container.querySelector('time')
    expect(timeElement).toHaveAttribute('datetime', date.toISOString())
  })

  it('forwards additional props to time element', () => {
    const date = new Date('2023-05-15')
    const { container } = render(
      <FormattedDate date={date} className="custom-class" />,
    )

    const timeElement = container.querySelector('time')
    expect(timeElement).toHaveClass('custom-class')
  })

  it('handles different dates correctly', () => {
    const testCases = [
      { date: new Date('2024-01-01'), expected: 'January 2024' },
      { date: new Date('2023-12-25'), expected: 'December 2023' },
      { date: new Date('2022-07-04'), expected: 'July 2022' },
    ]

    testCases.forEach(({ date, expected }) => {
      const { getByText } = render(<FormattedDate date={date} />)
      expect(getByText(expected)).toBeInTheDocument()
    })
  })
})

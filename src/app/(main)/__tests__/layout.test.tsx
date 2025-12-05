import { render, screen } from '@testing-library/react'
import MainLayout from '../layout'

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // Remove Next.js specific props
    const { priority, ...htmlProps } = props
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...htmlProps} />
  },
}))

// Mock next/link
jest.mock('next/link', () => {
  return ({
    children,
    href,
    className,
    'aria-label': ariaLabel,
  }: {
    children: React.ReactNode
    href: string
    className?: string
    'aria-label'?: string
  }) => {
    return (
      <a href={href} className={className} aria-label={ariaLabel}>
        {children}
      </a>
    )
  }
})

// Mock components
jest.mock('@/components/AboutSection', () => ({
  AboutSection: ({ className }: { className?: string }) => (
    <div data-testid="about-section" className={className}>
      About Section
    </div>
  ),
}))

jest.mock('@/components/TinyWaveFormIcon', () => ({
  TinyWaveFormIcon: () => <div data-testid="tiny-waveform-icon">Icon</div>,
}))

jest.mock('@/components/Waveform', () => ({
  Waveform: ({ className }: { className?: string }) => (
    <div data-testid="waveform" className={className}>
      Waveform
    </div>
  ),
}))

describe('MainLayout', () => {
  it('renders children correctly', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>,
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders header element', () => {
    const { container } = render(
      <MainLayout>
        <div>Test</div>
      </MainLayout>,
    )

    const header = container.querySelector('header')
    expect(header).toBeInTheDocument()
  })

  it('renders main element', () => {
    const { container } = render(
      <MainLayout>
        <div>Test</div>
      </MainLayout>,
    )

    const main = container.querySelector('main')
    expect(main).toBeInTheDocument()
  })

  it('renders footer element', () => {
    const { container } = render(
      <MainLayout>
        <div>Test</div>
      </MainLayout>,
    )

    const footer = container.querySelector('footer')
    expect(footer).toBeInTheDocument()
  })

  it('displays profile image', () => {
    const { container } = render(
      <MainLayout>
        <div>Test</div>
      </MainLayout>,
    )

    const image = container.querySelector('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt')
  })

  it('displays name and credentials', () => {
    render(
      <MainLayout>
        <div>Test</div>
      </MainLayout>,
    )

    expect(screen.getByText('Tim Jackson MSc MIET')).toBeInTheDocument()
  })

  it('displays tagline', () => {
    render(
      <MainLayout>
        <div>Test</div>
      </MainLayout>,
    )

    expect(
      screen.getByText(
        'A solution-focused Data Scientist and experienced leader.',
      ),
    ).toBeInTheDocument()
  })

  it('renders AboutSection in sidebar', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>,
    )

    const aboutSections = screen.getAllByTestId('about-section')
    // There should be two: one in sidebar (hidden on mobile) and one in footer (hidden on desktop)
    expect(aboutSections.length).toBe(2)

    // The first one should be in the sidebar with hidden/lg:block classes
    const sidebarAbout = aboutSections[0]
    expect(sidebarAbout).toHaveClass('hidden')
    expect(sidebarAbout).toHaveClass('lg:block')
  })

  it('renders social links', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>,
    )

    expect(screen.getByLabelText('GitHub')).toBeInTheDocument()
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByLabelText('X')).toBeInTheDocument()
  })

  it('social links have correct hrefs', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>,
    )

    const githubLink = screen.getByLabelText('GitHub')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/tj2904')

    const linkedInLink = screen.getByLabelText('LinkedIn')
    expect(linkedInLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/tj2904/',
    )

    const xLink = screen.getByLabelText('X')
    expect(xLink).toHaveAttribute('href', 'https://www.x.com/tj2904')
  })

  it('renders Waveform in main', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>,
    )

    expect(screen.getByTestId('waveform')).toBeInTheDocument()
  })

  it('renders Connect heading', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>,
    )

    expect(screen.getByText('Connect')).toBeInTheDocument()
  })

  it('renders "Crafted by" sections', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>,
    )

    const craftedByTexts = screen.getAllByText('Crafted by')
    expect(craftedByTexts.length).toBeGreaterThan(0)
  })

  it('homepage link has correct aria-label', () => {
    render(
      <MainLayout>
        <div>Test</div>
      </MainLayout>,
    )

    const homeLink = screen.getByLabelText('Homepage')
    expect(homeLink).toHaveAttribute('href', '/')
  })
})

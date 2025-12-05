import { render, screen } from '@testing-library/react'
import Home, { generateMetadata } from '../page'
import projectList from '@/lib/projects'

// Mock the Container component
jest.mock('@/components/Container', () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="container">{children}</div>
  ),
}))

// Mock the FormattedDate component
jest.mock('@/components/FormattedDate', () => ({
  FormattedDate: ({ date }: { date: Date }) => (
    <time>{date.toLocaleDateString()}</time>
  ),
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

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { priority, ...htmlProps } = props
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...htmlProps} />
  },
}))

// Mock react-icons
jest.mock('react-icons/vsc', () => ({
  VscChecklist: () => <span>ChecklistIcon</span>,
  VscVmRunning: () => <span>VmRunningIcon</span>,
}))

describe('Home Page', () => {
  it('renders the page title', async () => {
    const HomeResolved = await Home()
    render(HomeResolved)

    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('renders all projects from projectList', async () => {
    const HomeResolved = await Home()
    render(HomeResolved)

    // Sort projects same way as component
    const sortedProjects = [...projectList].sort(
      (a, b) => a.sortOrder - b.sortOrder,
    )

    sortedProjects.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument()
    })
  })

  it('displays project descriptions', async () => {
    const HomeResolved = await Home()
    render(HomeResolved)

    const sortedProjects = [...projectList].sort(
      (a, b) => a.sortOrder - b.sortOrder,
    )

    sortedProjects.forEach((project) => {
      expect(screen.getByText(project.description)).toBeInTheDocument()
    })
  })

  it('renders project links correctly', async () => {
    const HomeResolved = await Home()
    render(HomeResolved)

    const detailsLinks = screen.getAllByLabelText(/Details for project/i)
    expect(detailsLinks.length).toBeGreaterThan(0)
  })

  it('renders live deployment links for software projects with links', async () => {
    const HomeResolved = await Home()
    render(HomeResolved)

    const softwareProjectsWithLinks = projectList.filter(
      (p) => p.type === 'software' && p.link.length > 0,
    )

    if (softwareProjectsWithLinks.length > 0) {
      const liveLinks = screen.getAllByLabelText(/Live site for project/i)
      expect(liveLinks.length).toBe(softwareProjectsWithLinks.length)
    }
  })

  it('renders project images for projects with images', async () => {
    const HomeResolved = await Home()
    const { container } = render(HomeResolved)

    const projectsWithImages = projectList.filter((p) => p.image.length > 0)
    const images = container.querySelectorAll('img')

    expect(images.length).toBe(projectsWithImages.length)
  })

  it('sorts projects by sortOrder', async () => {
    const HomeResolved = await Home()
    render(HomeResolved)

    const sortedProjects = [...projectList].sort(
      (a, b) => a.sortOrder - b.sortOrder,
    )
    const projectHeadings = screen
      .getAllByRole('heading', { level: 2 })
      .map((h) => h.textContent)

    // All h2s should be project titles (h1 is "Projects")
    sortedProjects.forEach((project, index) => {
      expect(projectHeadings[index]).toBe(project.title)
    })
  })

  it('each project has correct aria-labelledby', async () => {
    const HomeResolved = await Home()
    const { container } = render(HomeResolved)

    const articles = container.querySelectorAll('article')

    articles.forEach((article) => {
      const labelledBy = article.getAttribute('aria-labelledby')
      expect(labelledBy).toBeTruthy()
      expect(labelledBy).toMatch(/^project-\d+-title$/)
    })
  })

  it('links to correct project detail pages', async () => {
    const HomeResolved = await Home()
    const { container } = render(HomeResolved)

    projectList.forEach((project) => {
      const links = container.querySelectorAll(`a[href="/${project.slug}"]`)
      expect(links.length).toBeGreaterThan(0)
    })
  })

  it('has proper heading hierarchy', async () => {
    const HomeResolved = await Home()
    render(HomeResolved)

    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent('Projects')

    const h2s = screen.getAllByRole('heading', { level: 2 })
    expect(h2s.length).toBe(projectList.length)
  })
})

describe('generateMetadata', () => {
  it('returns metadata with correct title', async () => {
    const metadata = await generateMetadata()

    expect(metadata.title).toBe("Tim Jackson's Portfolio")
  })

  it('returns metadata with openGraph configuration', async () => {
    const metadata = await generateMetadata()

    expect(metadata.openGraph).toBeDefined()
    expect(metadata.openGraph?.title).toBe("Tim Jackson's Portfolio")
    expect(metadata.openGraph?.url).toBe('https://tj2904.com/')
    expect(metadata.openGraph?.description).toBe(
      "A collection of Tim's work and projects.",
    )
  })

  it('includes OG image URL', async () => {
    const metadata = await generateMetadata()

    expect(metadata.openGraph?.images).toBeDefined()
    expect(metadata.openGraph?.images).toHaveLength(1)
    expect(metadata.openGraph?.images?.[0]).toEqual({
      url: 'https://tj2904.com/api/og',
    })
  })
})

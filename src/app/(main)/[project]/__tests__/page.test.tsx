import { render, screen } from '@testing-library/react'
import { notFound } from 'next/navigation'
import Project, { generateMetadata } from '../page'
import projectList from '@/lib/projects'

// Mock React cache
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  cache: (fn: any) => fn,
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}))

// Mock next/link
jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode
    href: string
  }) => {
    return <a href={href}>{children}</a>
  }
  MockLink.displayName = 'Link'
  return MockLink
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

// Mock components
jest.mock('@/components/Container', () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="container">{children}</div>
  ),
}))

jest.mock('@/components/FormattedDate', () => ({
  FormattedDate: ({ date }: { date: Date }) => (
    <time>{date.toLocaleDateString()}</time>
  ),
}))

// Mock all the icons from react-icons/si
jest.mock('react-icons/si', () => {
  const mockIcons: any = {}
  const iconNames = [
    'SiAnaconda',
    'SiAxios',
    'SiChartdotjs',
    'SiCircleci',
    'SiCloudflare',
    'SiDocker',
    'SiFastapi',
    'SiFirebase',
    'SiFlask',
    'SiGeopandas',
    'SiGithub',
    'SiGithubactions',
    'SiHeroku',
    'SiJavascript',
    'SiJest',
    'SiJupyter',
    'SiNetlify',
    'SiNextdotjs',
    'SiNumpy',
    'SiPandas',
    'SiPlotly',
    'SiPostgresql',
    'SiPrisma',
    'SiPydantic',
    'SiPytest',
    'SiPython',
    'SiReact',
    'SiRender',
    'SiScikitlearn',
    'SiSentry',
    'SiStreamlit',
    'SiSupabase',
    'SiSwagger',
    'SiTableau',
    'SiTailwindcss',
    'SiTypescript',
    'SiVercel',
  ]
  iconNames.forEach((iconName) => {
    mockIcons[iconName] = () => <span>{iconName}</span>
  })
  return mockIcons
})

jest.mock('react-icons/tb', () => ({
  TbCode: () => <span>TbCode</span>,
}))

jest.mock('react-icons/vsc', () => ({
  VscVmRunning: () => <span>VscVmRunning</span>,
}))

jest.mock('react-icons/im', () => ({
  ImFilePdf: () => <span>ImFilePdf</span>,
}))

jest.mock('react-icons/go', () => ({
  GoDatabase: () => <span>GoDatabase</span>,
}))

describe('Project Detail Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Software Projects', () => {
    it('renders software project details', async () => {
      const softwareProject = projectList.find((p) => p.type === 'software')
      if (!softwareProject) {
        throw new Error('No software project found in test data')
      }

      const ProjectResolved = await Project({
        params: { project: softwareProject.slug },
      })
      render(ProjectResolved)

      expect(screen.getByText(softwareProject.title)).toBeInTheDocument()
      expect(screen.getByText(softwareProject.description)).toBeInTheDocument()
    })

    it('displays technology stack', async () => {
      const softwareProject = projectList.find((p) => p.type === 'software')
      if (!softwareProject) return

      const ProjectResolved = await Project({
        params: { project: softwareProject.slug },
      })
      render(ProjectResolved)

      expect(screen.getByText(/Technologies used:/i)).toBeInTheDocument()
    })

    it('displays deployment information', async () => {
      const softwareProject = projectList.find((p) => p.type === 'software')
      if (!softwareProject) return

      const ProjectResolved = await Project({
        params: { project: softwareProject.slug },
      })
      render(ProjectResolved)

      expect(screen.getByText(/Deployment/i)).toBeInTheDocument()
    })

    it('displays rationale section', async () => {
      const softwareProject = projectList.find((p) => p.type === 'software')
      if (!softwareProject) return

      const ProjectResolved = await Project({
        params: { project: softwareProject.slug },
      })
      render(ProjectResolved)

      expect(screen.getByText(softwareProject.rational)).toBeInTheDocument()
    })
  })

  describe('Report Projects', () => {
    it('renders report project details', async () => {
      const reportProject = projectList.find((p) => p.type === 'report')
      if (!reportProject) {
        // Skip if no report projects
        return
      }

      const ProjectResolved = await Project({
        params: { project: reportProject.slug },
      })
      render(ProjectResolved)

      expect(screen.getByText(reportProject.title)).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('calls notFound for invalid project slug', async () => {
      const mockNotFound = notFound as unknown as jest.Mock
      mockNotFound.mockImplementation(() => {
        throw new Error('Not Found')
      })

      await expect(
        Project({ params: { project: 'non-existent-slug' } }),
      ).rejects.toThrow('Not Found')

      expect(mockNotFound).toHaveBeenCalled()
    })
  })

  describe('Metadata Generation', () => {
    it('generates metadata for software projects', async () => {
      const softwareProject = projectList.find((p) => p.type === 'software')
      if (!softwareProject) return

      const metadata = await generateMetadata({
        params: { project: softwareProject.slug },
      })

      expect(metadata.title).toContain(softwareProject.title)
    })

    it('generates metadata for report projects', async () => {
      const reportProject = projectList.find((p) => p.type === 'report')
      if (!reportProject) return

      const metadata = await generateMetadata({
        params: { project: reportProject.slug },
      })

      expect(metadata.title).toContain(reportProject.title)
    })
  })

  describe('Layout and Structure', () => {
    it('renders article element', async () => {
      const project = projectList[0]
      const ProjectResolved = await Project({
        params: { project: project.slug },
      })
      const { container } = render(ProjectResolved)

      const article = container.querySelector('article')
      expect(article).toBeInTheDocument()
    })

    it('displays project publish date', async () => {
      const project = projectList[0]
      const ProjectResolved = await Project({
        params: { project: project.slug },
      })
      render(ProjectResolved)

      const timeElement = document.querySelector('time')
      expect(timeElement).toBeInTheDocument()
    })
  })
})

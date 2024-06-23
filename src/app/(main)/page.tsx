import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/Container'
import { FormattedDate } from '@/components/FormattedDate'

import projectList, { Project } from '@/lib/projects'
import { VscChecklist, VscVmRunning } from 'react-icons/vsc'

export async function generateMetadata() {
  let metadata: {
    title: string
    description?: string
    openGraph?: { title: string; url: string; description: string }
  } = {
    title: `Tim Jackson's Portfolio`,
    openGraph: {
      title: `Tim Jackson's Portfolio`,
      url: `https://tj2904.com/`,
      description: `A collection of Tim's work and projects.`,
    },
  }

  return metadata
}

function ProjectEntry({ project: project }: { project: Project }) {
  let date = new Date(project.published)

  return (
    <article
      aria-labelledby={`project-${project.id}-title`}
      className="py-10 sm:py-12"
    >
      <Container>
        <div className="flex flex-col items-start">
          <h2
            id={`project-${project.id}-title`}
            className="mt-2 text-lg font-bold text-slate-900"
          >
            <Link href={`/${project.slug}`}>{project.title}</Link>
          </h2>
          <FormattedDate
            date={date}
            className="order-first font-mono text-sm leading-7 text-slate-500"
          />
          <p className="mt-1 text-base leading-7 text-slate-700">
            {project.image.length > 0 && (
              <Link href={`/${project.slug}`}>
                <Image
                  src={`/assets/screenshots/${project.image}`}
                  alt={''} // Blank as it is purely decorative
                  height={250}
                  width={250}
                  className="mx-auto mb-4 rounded-md md:float-start md:mb-0 md:mr-4"
                />
              </Link>
            )}
            {project.description}
          </p>
          <div className="mt-4 flex items-center gap-4">
            {project.type === 'software' && project.link.length > 0 && (
              <>
                <Link
                  href={`${project.link}`}
                  className="flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
                  aria-label={`Live site for project ${project.title}`}
                >
                  <VscVmRunning className="mr-2" /> Live Deployment
                </Link>

                <span
                  aria-hidden="true"
                  className="text-sm font-bold text-slate-400"
                >
                  /
                </span>
              </>
            )}

            <Link
              href={`/${project.slug}`}
              className="flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
              aria-label={`Details for project ${project.title}`}
            >
              <VscChecklist className="mr-2" />
              Details
            </Link>
          </div>
        </div>
      </Container>
    </article>
  )
}

export default async function Home() {
  const projects = projectList.sort((a, b) => a.sortOrder - b.sortOrder)

  return (
    <div className="pb-12 pt-16 sm:pb-4 lg:pt-12">
      <Container>
        <h1 className="text-2xl font-bold leading-7 text-slate-900">
          Projects
        </h1>
      </Container>
      <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
        {projects.map((project) => (
          <ProjectEntry key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

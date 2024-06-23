import { cache } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/Container'
import { FormattedDate } from '@/components/FormattedDate'
import projectList from '@/lib/projects'
import type { Project } from '@/lib/projects'
import { TbCode } from 'react-icons/tb'
import {
  SiAnaconda,
  SiAmazonaws,
  SiAxios,
  SiChartdotjs,
  SiCircleci,
  SiCloudflare,
  SiDocker,
  SiFastapi,
  SiFirebase,
  SiFlask,
  SiGeopandas,
  SiGithub,
  SiGithubactions,
  SiHeroku,
  SiJavascript,
  SiJest,
  SiJupyter,
  SiMicrosoftsqlserver,
  SiNetlify,
  SiNextdotjs,
  SiNumpy,
  SiPandas,
  SiPlotly,
  SiPostgresql,
  SiPowerbi,
  SiPrisma,
  SiPydantic,
  SiPytest,
  SiPython,
  SiReact,
  SiRender,
  SiScikitlearn,
  SiSentry,
  SiSupabase,
  SiSwagger,
  SiTableau,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si'
import { VscVmRunning } from 'react-icons/vsc'
import { ImFilePdf } from 'react-icons/im'

// Map tech to icon
const techToIcon: { [key: string]: JSX.Element } = {
  Anaconda: <SiAnaconda />,
  AWS: <SiAmazonaws />,
  Axios: <SiAxios />,
  ChartJS: <SiChartdotjs />,
  CircleCI: <SiCircleci />,
  CloudFlare: <SiCloudflare />,
  Docker: <SiDocker />,
  FastAPI: <SiFastapi />,
  FireBase: <SiFirebase />,
  Flask: <SiFlask />,
  GeoPandas: <SiGeopandas />,
  'GitHub Actions': <SiGithubactions />,
  Heroku: <SiHeroku />,
  JavaScript: <SiJavascript />,
  Jest: <SiJest />,
  Jupyter: <SiJupyter />,
  MicrosoftSQL: <SiMicrosoftsqlserver />,
  Netlify: <SiNetlify />,
  NextJS: <SiNextdotjs />,
  Numpy: <SiNumpy />,
  Pandas: <SiPandas />,
  Ploty: <SiPlotly />,
  PostgreSQL: <SiPostgresql />,
  PowerBI: <SiPowerbi />,
  Prisma: <SiPrisma />,
  Pydantic: <SiPydantic />,
  Pytest: <SiPytest />,
  Python: <SiPython />,
  React: <SiReact />,
  Render: <SiRender />,
  'Scikit-Learn': <SiScikitlearn />,
  Sentry: <SiSentry />,
  SupaBase: <SiSupabase />,
  Swagger: <SiSwagger />,
  Tableau: <SiTableau />,
  TailwindCSS: <SiTailwindcss />,
  TypeScript: <SiTypescript />,
  Vercel: <SiVercel />,
}

const getProject = cache(async (slug: string) => {
  let project = projectList.find((project) => project.slug === slug)
  if (!project) {
    notFound()
  }
  return project
})

export async function generateMetadata({
  params,
}: {
  params: { project: string }
}) {
  let project = await getProject(params.project)

  let metadata: {
    title: string
    description?: string
    openGraph?: { title?: string; url?: string; image?: string }
  } = {
    title: `Projects - ${project.title} `,
    openGraph: {
      title: `Projects - ${project.title}`,
      url: `https://tj2904.com/${project.slug}`,
    },
  }

  if (project.type === 'software') {
    metadata = {
      ...metadata,
      description: `Details of Tim Jackson's ${project.title} project, including the technologies used and links to the live site and repository.`,
      openGraph: {
        ...metadata.openGraph,
        image: `https://tj2904.com/assets/screenshots/${project.image}`,
      },
    }
  } else if (project.type === 'report') {
    metadata = {
      ...metadata,
      description: `Details of Tim Jackson's ${project.title} report, including the abstract and link to the full text as PDF.`,
    }
  }

  return metadata
}

export default async function Project({
  params,
}: {
  params: { project: string }
}) {
  let project: Project = await getProject(params.project)
  let date = new Date(project.published)

  if (project.type === 'software') {
    return (
      <article className="py-16 lg:py-36">
        <Container>
          <header className="flex flex-col">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <h1 className="mt-2 text-4xl font-bold text-slate-900">
                  {project.title}
                </h1>
                <FormattedDate
                  date={date}
                  className="order-first font-mono text-sm leading-7 text-slate-500"
                />
              </div>
            </div>
            <p className="mt-3 text-lg font-medium leading-8 text-slate-700">
              {project.description}
            </p>
          </header>
          <hr className="my-12 border-gray-200" />
          {project.image && (
            <Image
              src={`/assets/screenshots/${project.image}`}
              alt={''} // Blank as it is purely decorative
              width={1200}
              height={600}
              className="rounded-md"
            />
          )}

          <div className="prose prose-slate mt-14 [&>h2:nth-of-type(3n)]:before:bg-violet-200 [&>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>h2]:mt-12 [&>h2]:flex [&>h2]:items-center [&>h2]:font-mono [&>h2]:text-sm [&>h2]:font-medium [&>h2]:leading-7 [&>h2]:text-slate-900 [&>h2]:before:mr-3 [&>h2]:before:h-3 [&>h2]:before:w-1.5 [&>h2]:before:rounded-r-full [&>h2]:before:bg-cyan-200 [&>ul]:mt-6 [&>ul]:list-['\2013\20'] [&>ul]:pl-5">
            {project.rational.length > 0 && (
              <>
                <h2>Rational for the project:</h2>
                {project.rational}
              </>
            )}

            <h2>Technologies used:</h2>
            <div className="list-none">
              {project.stack.map((item, index) => (
                <div key={index} className="flex items-center">
                  <span className="mr-2">
                    {techToIcon[item.tech] || (
                      <TbCode className="inline-block" />
                    )}
                  </span>
                  <span>{item.tech}</span>
                  {item.explanation && (
                    <span className="italic">{item.explanation}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="prose prose-slate mt-14 [&>h2:nth-of-type(3n)]:before:bg-violet-200 [&>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>h2]:mt-12 [&>h2]:flex [&>h2]:items-center [&>h2]:font-mono [&>h2]:text-sm [&>h2]:font-medium [&>h2]:leading-7 [&>h2]:text-slate-900 [&>h2]:before:mr-3 [&>h2]:before:h-3 [&>h2]:before:w-1.5 [&>h2]:before:rounded-r-full [&>h2]:before:bg-cyan-200 [&>ul]:mt-6 [&>ul]:list-['\2013\20'] [&>ul]:pl-5">
              {project.deployment && project.deployment.length > 0 && (
                <>
                  <h2>Deployment:</h2>
                  {project.deployment.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <span className="mr-2">
                        {techToIcon[item.tech] || (
                          <TbCode className="inline-block" />
                        )}
                      </span>
                      <span>{item.tech}</span>
                      {item.explanation && (
                        <span className="italic">{item.explanation}</span>
                      )}
                    </div>
                  ))}
                </>
              )}
              <h2>Links:</h2>
              {project.link.length > 0 && (
                <div className="flex items-center">
                  <span className="mr-2">
                    <VscVmRunning className="inline-block" />
                  </span>
                  <span>
                    <Link
                      href={project.link}
                      className="text-pink-500"
                      target="_blank"
                    >
                      Live Site
                    </Link>
                  </span>
                </div>
              )}

              <div className="flex items-center">
                <span className="mr-2">
                  <SiGithub className="inline-block" />
                </span>
                <span>
                  <Link
                    href={project.repo}
                    className="text-pink-500"
                    target="_blank"
                  >
                    Project Repo
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </article>
    )
  }
  if (project.type === 'report') {
    return (
      <article className="py-16 lg:py-36">
        <Container>
          <header className="flex flex-col">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <h1 className="mt-2 text-4xl font-bold text-slate-900">
                  {project.title}
                </h1>
                <FormattedDate
                  date={date}
                  className="order-first font-mono text-sm leading-7 text-slate-500"
                />
              </div>
            </div>
            <p className="mt-3 text-lg font-medium leading-8 text-slate-700">
              {project.description}
            </p>
          </header>
          <hr className="my-12 border-gray-200" />
          {project.image && (
            <Image
              src={`/assets/screenshots/${project.image}`}
              alt={`${project.title} screenshot`}
              width={1200}
              height={600}
            />
          )}

          <div className="prose prose-slate mt-14 [&>h2:nth-of-type(3n)]:before:bg-violet-200 [&>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>h2]:mt-12 [&>h2]:flex [&>h2]:items-center [&>h2]:font-mono [&>h2]:text-sm [&>h2]:font-medium [&>h2]:leading-7 [&>h2]:text-slate-900 [&>h2]:before:mr-3 [&>h2]:before:h-3 [&>h2]:before:w-1.5 [&>h2]:before:rounded-r-full [&>h2]:before:bg-cyan-200 [&>ul]:mt-6 [&>ul]:list-['\2013\20'] [&>ul]:pl-5">
            {project.rational.length > 0 && (
              <>
                <h2>Abstract:</h2>
                {project.rational}
              </>
            )}

            <h2>Document Downloads:</h2>
            <div className="flex items-center">
              <span className="mr-2">
                <ImFilePdf className="inline-block" />
              </span>
              <span>
                <Link
                  href={project.link}
                  className="text-pink-500"
                  target="_blank"
                >
                  PDF
                </Link>
              </span>
            </div>
          </div>
        </Container>
      </article>
    )
  }
}

import projectList, { type Project, type Projects } from '../projects'

describe('Projects Data', () => {
  it('exports an array of projects', () => {
    expect(Array.isArray(projectList)).toBe(true)
    expect(projectList.length).toBeGreaterThan(0)
  })

  it('each project has required fields', () => {
    projectList.forEach((project: Project) => {
      expect(project).toHaveProperty('id')
      expect(project).toHaveProperty('type')
      expect(project).toHaveProperty('sortOrder')
      expect(project).toHaveProperty('published')
      expect(project).toHaveProperty('slug')
      expect(project).toHaveProperty('title')
      expect(project).toHaveProperty('description')
      expect(project).toHaveProperty('image')
      expect(project).toHaveProperty('link')
      expect(project).toHaveProperty('repo')
      expect(project).toHaveProperty('rational')
      expect(project).toHaveProperty('stack')
      expect(project).toHaveProperty('deployment')
    })
  })

  it('each project has correct types', () => {
    projectList.forEach((project: Project) => {
      expect(typeof project.id).toBe('number')
      expect(['software', 'report']).toContain(project.type)
      expect(typeof project.sortOrder).toBe('number')
      expect(typeof project.published).toBe('string')
      expect(typeof project.slug).toBe('string')
      expect(typeof project.title).toBe('string')
      expect(typeof project.description).toBe('string')
      expect(typeof project.image).toBe('string')
      expect(typeof project.link).toBe('string')
      expect(typeof project.repo).toBe('string')
      expect(typeof project.rational).toBe('string')
      expect(Array.isArray(project.stack)).toBe(true)
      expect(Array.isArray(project.deployment)).toBe(true)
    })
  })

  it('each project has a unique id', () => {
    const ids = projectList.map((p) => p.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('each project has a unique slug', () => {
    const slugs = projectList.map((p) => p.slug)
    const uniqueSlugs = new Set(slugs)
    expect(uniqueSlugs.size).toBe(slugs.length)
  })

  it('published dates are in valid format', () => {
    projectList.forEach((project: Project) => {
      const date = new Date(project.published)
      expect(date.toString()).not.toBe('Invalid Date')
    })
  })

  it('slugs are URL-friendly', () => {
    projectList.forEach((project: Project) => {
      // Slugs should be lowercase and contain only letters, numbers, and hyphens
      expect(project.slug).toMatch(/^[a-z0-9-]+$/)
    })
  })

  it('sortOrder values are positive numbers', () => {
    projectList.forEach((project: Project) => {
      expect(project.sortOrder).toBeGreaterThan(0)
    })
  })

  it('stack items have tech property', () => {
    projectList.forEach((project: Project) => {
      project.stack.forEach((item) => {
        expect(item).toHaveProperty('tech')
        expect(typeof item.tech).toBe('string')
        expect(item.tech.length).toBeGreaterThan(0)
      })
    })
  })

  it('deployment items have tech property', () => {
    projectList.forEach((project: Project) => {
      project.deployment.forEach((item) => {
        expect(item).toHaveProperty('tech')
        expect(typeof item.tech).toBe('string')
        expect(item.tech.length).toBeGreaterThan(0)
      })
    })
  })
})

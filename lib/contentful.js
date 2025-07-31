import { createClient } from 'contentful'

const client = createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.API_KEY,
})

export default client

// Helper function to get all blog posts
export async function getAllBlogPosts() {
  const response = await client.getEntries({
    content_type: 'blogs',
    order: '-sys.createdAt',
  })
  return response.items
}

// Helper function to get a single blog post by slug
export async function getBlogPostBySlug(slug) {
  const response = await client.getEntries({
    content_type: 'blogs',
    'fields.slug': slug,
    limit: 1,
  })
  return response.items[0]
}

// Helper function to get all projects
export async function getAllProjects() {
  const response = await client.getEntries({
    content_type: 'projects',
    order: '-sys.createdAt',
  })
  return response.items
}

// Helper function to get a single project by slug
export async function getProjectBySlug(slug) {
  const response = await client.getEntries({
    content_type: 'projects',
    'fields.slug': slug,
    limit: 1,
  })
  return response.items[0]
}

// Helper function to get about me data
export async function getAboutMe() {
  const response = await client.getEntries({
    content_type: 'aboutMe',
    limit: 1,
  })
  return response.items[0]
}

// Helper function to get site information
export async function getSiteInformation() {
  const response = await client.getEntries({
    content_type: 'siteInformation',
    limit: 1,
  })
  return response.items[0]
}

// Helper function to get all services
export async function getAllServices() {
  const response = await client.getEntries({
    content_type: 'service',
    order: 'sys.createdAt',
  })
  return response.items
}

// Helper function to get all testimonials
export async function getAllTestimonials() {
  const response = await client.getEntries({
    content_type: 'testimonials',
    order: 'sys.createdAt',
  })
  return response.items
}

// Helper function to get all bucket list items
export async function getAllBucketList() {
  const response = await client.getEntries({
    content_type: 'bucketList',
    order: 'sys.createdAt',
  })
  return response.items
}

// Helper function to get all resume items
export async function getAllResume() {
  const response = await client.getEntries({
    content_type: 'resume',
    order: 'sys.createdAt',
  })
  return response.items
} 
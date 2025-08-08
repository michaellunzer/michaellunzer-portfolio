const { createClient } = require('contentful');

const client = createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.API_KEY,
})

module.exports = {
  default: client,
  getAllBlogPosts,
  getBlogPostBySlug,
  getAllProjects,
  getProjectBySlug,
  getAboutMe,
  getSiteInformation,
  getAllServices,
  getAllTestimonials,
  getAllBucketList,
  getAllResume
}

// Helper function to get all blog posts
async function getAllBlogPosts() {
  const response = await client.getEntries({
    content_type: 'blogs',
    order: '-fields.publishedDate',
  })
  return response.items
}

// Helper function to get a single blog post by slug
async function getBlogPostBySlug(slug) {
  const response = await client.getEntries({
    content_type: 'blogs',
    'fields.slug': slug,
    limit: 1,
  })
  return response.items[0]
}

// Helper function to get all projects
async function getAllProjects() {
  try {
    const response = await client.getEntries({
      content_type: 'projects',
      order: '-fields.publishedDate',
    })
    return response.items
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

// Helper function to get a single project by slug
async function getProjectBySlug(slug) {
  const response = await client.getEntries({
    content_type: 'projects',
    'fields.slug': slug,
    limit: 1,
  })
  return response.items[0]
}

// Helper function to get about me data
async function getAboutMe() {
  const response = await client.getEntries({
    content_type: 'aboutMe',
    limit: 1,
  })
  return response.items[0]
}

// Helper function to get site information
async function getSiteInformation() {
  try {
    const response = await client.getEntries({
      content_type: 'siteInformation',
      limit: 1,
    })
    return response.items[0]
  } catch (error) {
    console.error('Error fetching site information:', error)
    return null
  }
}

// Helper function to get all services
async function getAllServices() {
  const response = await client.getEntries({
    content_type: 'service',
    order: 'sys.createdAt',
  })
  return response.items
}

// Helper function to get all testimonials
async function getAllTestimonials() {
  const response = await client.getEntries({
    content_type: 'testimonials',
    order: 'sys.createdAt',
  })
  return response.items
}

// Helper function to get all bucket list items
async function getAllBucketList() {
  try {
    const response = await client.getEntries({
      content_type: 'bucketList',
      order: 'sys.createdAt',
    })
    return response.items
  } catch (error) {
    console.error('Error fetching bucket list:', error)
    return []
  }
}

// Helper function to get all resume items
async function getAllResume() {
  const response = await client.getEntries({
    content_type: 'resume',
    order: 'sys.createdAt',
  })
  return response.items
} 
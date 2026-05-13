const { createClient } = require('contentful');

const hasCredentials = process.env.SPACE_ID && process.env.API_KEY;

const client = hasCredentials
  ? createClient({
      space: process.env.SPACE_ID,
      accessToken: process.env.API_KEY,
    })
  : null;

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

async function getAllBlogPosts() {
  if (!client) return [];
  const response = await client.getEntries({
    content_type: 'blogs',
    order: '-fields.publishedDate',
  })
  return response.items
}

async function getBlogPostBySlug(slug) {
  if (!client) return undefined;
  const response = await client.getEntries({
    content_type: 'blogs',
    'fields.slug': slug,
    limit: 1,
  })
  return response.items[0]
}

async function getAllProjects() {
  if (!client) return [];
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

async function getProjectBySlug(slug) {
  if (!client) return undefined;
  const response = await client.getEntries({
    content_type: 'projects',
    'fields.slug': slug,
    limit: 1,
  })
  return response.items[0]
}

async function getAboutMe() {
  if (!client) return undefined;
  const response = await client.getEntries({
    content_type: 'aboutMe',
    limit: 1,
  })
  return response.items[0]
}

async function getSiteInformation() {
  if (!client) return null;
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

async function getAllServices() {
  if (!client) return [];
  const response = await client.getEntries({
    content_type: 'service',
    order: 'sys.createdAt',
  })
  return response.items
}

async function getAllTestimonials() {
  if (!client) return [];
  const response = await client.getEntries({
    content_type: 'testimonials',
    order: 'sys.createdAt',
  })
  return response.items
}

async function getAllBucketList() {
  if (!client) return [];
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

async function getAllResume() {
  if (!client) return [];
  const response = await client.getEntries({
    content_type: 'resume',
    order: 'sys.createdAt',
  })
  return response.items
} 
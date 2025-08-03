import { Suspense } from 'react'
import { getAboutMe, getSiteInformation, getAllServices, getAllBlogPosts, getAllProjects, getAllTestimonials, getAllBucketList } from '../../lib/contentful'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Banner from '../components/banner'
import About from '../components/about'
import Service from '../components/service'
import Blogs from '../components/blogs'
import Testimonial from '../components/testimonial'
import Contact from '../components/contact'
import Map from '../components/map'
import Projects from '../components/projects'
import BucketList from '../components/bucketlist'
import { HomeAssistantTemperature } from '../components/HomeAssistantTemperature'

export default async function HomePage() {
  // Fetch all data in parallel
  const [aboutMe, siteInfo, services, blogs, projects, testimonials, bucketList] = await Promise.all([
    getAboutMe(),
    getSiteInformation(),
    getAllServices(),
    getAllBlogPosts(),
    getAllProjects(),
    getAllTestimonials(),
    getAllBucketList(),
  ])

  return (
    <Layout header="home" siteInfo={siteInfo}>
      <SEO
        title={aboutMe?.fields?.designation || 'Michael Lunzer'}
        keywords={['Michael Lunzer', 'Customer Success Manager', 'Technical Account Manager']}
        siteInfo={siteInfo}
      />
      
      <Banner data={aboutMe} />

      <Suspense fallback={<div>Loading...</div>}>
        <HomeAssistantTemperature />
      </Suspense>

      {siteInfo?.fields?.menus?.includes('About') && (
        <About data={aboutMe} />
      )}

      {siteInfo?.fields?.menus?.includes('Service') && (
        <Service data={services} />
      )}

      {siteInfo?.fields?.menus?.includes('Blogs') && (
        <Blogs data={blogs} />
      )}

      {siteInfo?.fields?.menus?.includes('Projects') && (
        <Projects data={projects} isHomePage={true} />
      )}

      {siteInfo?.fields?.menus?.includes('Testimonials') && (
        <Testimonial data={testimonials} />
      )}

      {siteInfo?.fields?.menus?.includes('Bucket List') && (
        <BucketList data={bucketList} isHomePage={true} />
      )}

      {siteInfo?.fields?.menus?.includes('Contact') && (
        <Contact data={aboutMe?.fields?.gmail} />
      )}

      <Map />
    </Layout>
  )
} 
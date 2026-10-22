# Michael Lunzer Portfolio - Next.js Version

This is the Next.js conversion of the original GatsbyJS portfolio site.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Create environment variables:
Create a `.env.local` file in the root directory with the following variables:

```env
# Contentful Configuration
SPACE_ID=your_contentful_space_id
API_KEY=your_contentful_api_key

# Spotify Configuration
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token

# Analytics
SEGMENT_WRITE_KEY=your_segment_write_key

# Google Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.js          # Root layout
│   ├── page.js            # Home page
│   ├── blogs/             # Blog pages
│   ├── projects/          # Project pages
│   ├── bucketlist/        # Bucket list page
│   ├── spotify/           # Spotify page
│   ├── not-found.js       # 404 page
│   ├── robots.txt/        # Robots.txt route
│   ├── sitemap.xml/       # Sitemap route
│   └── rss.xml/           # RSS feed route
├── components/            # React components
├── css/                   # Stylesheets
└── images/                # Static images
lib/
└── contentful.js          # Contentful client utilities
```

## 🔄 Key Changes from Gatsby

### 1. Routing
- **Gatsby**: File-based routing in `src/pages/`
- **Next.js**: App Router in `src/app/` with dynamic routes

### 2. Data Fetching
- **Gatsby**: GraphQL queries with `gatsby-source-contentful`
- **Next.js**: Direct Contentful API calls with `contentful` package

### 3. Image Handling
- **Gatsby**: `gatsby-plugin-image` with `GatsbyImage`
- **Next.js**: `next/image` with optimized image loading

### 4. SEO
- **Gatsby**: `gatsby-plugin-react-helmet` with `react-helmet`
- **Next.js**: `react-helmet-async` for client-side SEO

### 5. Static Generation
- **Gatsby**: `gatsby-node.js` for page generation
- **Next.js**: `generateStaticParams()` for dynamic routes

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run export` - Export static site

## 📦 Dependencies

### Core
- **Next.js 14** - React framework
- **React 18** - UI library
- **Contentful** - CMS client

### UI & Styling
- **Bootstrap 5** - CSS framework
- **Font Awesome** - Icons

### Utilities
- **Moment.js** - Date formatting
- **Prism.js** - Code highlighting
- **React Share** - Social sharing
- **Disqus React** - Comments

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Netlify
1. Build command: `npm run build`
2. Publish directory: `out` (if using static export)
3. Set environment variables in Netlify dashboard

### Static Export
```bash
npm run build
npm run export
```

## 🔧 Configuration

### Next.js Config (`next.config.js`)
- Image optimization for Contentful domains
- Environment variables
- Security headers

### Contentful Integration (`lib/contentful.js`)
- Client configuration
- Helper functions for data fetching
- Type-safe content queries

## 📝 Content Management

All content is managed through Contentful CMS with the following content types:
- `aboutMe` - Personal information
- `blogs` - Blog posts
- `projects` - Portfolio projects
- `service` - Services offered
- `testimonials` - Client testimonials
- `bucketList` - Personal goals
- `siteInformation` - Site configuration

## 🎯 Features

- ✅ Server-side rendering
- ✅ Static site generation
- ✅ Dynamic routes
- ✅ Image optimization
- ✅ SEO optimization
- ✅ RSS feed
- ✅ Sitemap generation
- ✅ Social sharing
- ✅ Comments (Disqus)
- ✅ Spotify integration
- ✅ Responsive design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. 
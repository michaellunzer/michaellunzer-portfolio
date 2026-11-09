"use client";

import React, { useCallback, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/github.css';

// Helper function to extract YouTube video ID from various YouTube URL formats
const getYouTubeVideoId = (url) => {
  if (!url) return null;
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
};

// YouTube video embed component
const YouTubeEmbed = ({ videoId }) => {
  if (!videoId) return null;
  
  // A span, not a div: markdown nests links inside <p>, which cannot contain
  // block-level elements. The container is made block-level with CSS instead.
  return (
    <span className="youtube-embed-container">
      <iframe
        width="100%"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </span>
  );
};

// <model-viewer> is a custom element, so the library has to register it before
// the tag means anything. Load it lazily, once, and only on pages that use it.
const MODEL_VIEWER_SRC =
  'https://cdn.jsdelivr.net/npm/@google/model-viewer@4.4.0/dist/model-viewer.min.js';

// Interactive 3D model embed. Authored in Contentful as raw HTML:
//   <model-viewer src="https://assets.ctfassets.net/.../thing.glb"
//                 alt="..." caption="..."></model-viewer>
//
// Upload the .glb to Contentful as an asset and use that URL - note that
// public/ is gitignored in this repo, so a /models/... path would not deploy.
// Any other model-viewer attribute passes straight through, and zoom="true"
// re-enables scroll-to-zoom for an embed that is worth hijacking the wheel for.
const ModelViewer = ({ node, src, alt, caption, poster, zoom, ...rest }) => {
  const [status, setStatus] = useState('loading');

  // React must not set `src` itself. React treats src as a DOM property, so on
  // React 18 it lands as a property on the custom element instead of an
  // attribute, and model-viewer never starts loading - the embed renders as an
  // empty box with no error. Setting the attribute ourselves once the element
  // is in the DOM is what model-viewer actually documents, and it behaves the
  // same on React 18 and 19. Verified on both.
  const attachSrc = useCallback(
    (el) => {
      if (el && src) el.setAttribute('src', src);
    },
    [src]
  );

  useEffect(() => {
    let cancelled = false;

    if (!document.querySelector('script[data-model-viewer]')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = MODEL_VIEWER_SRC;
      script.dataset.modelViewer = '';
      script.addEventListener('error', () => {
        if (!cancelled) setStatus('error');
      });
      document.head.appendChild(script);
    }

    // Resolves whenever the element is registered, whether this instance
    // injected the script or an earlier one already did.
    window.customElements.whenDefined('model-viewer').then(() => {
      if (!cancelled) setStatus('ready');
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // A registered element still leaves an empty box if the .glb itself is
  // missing. model-viewer 4.x logs that failure to the console but does not
  // dispatch an event we can listen for, so check the URL ourselves. This runs
  // alongside the viewer rather than gating it, so a working model is not held
  // up by the check. Only treat "definitely not there" as a failure - a host
  // that rejects HEAD would otherwise look like a broken model.
  useEffect(() => {
    if (!src) return undefined;
    let cancelled = false;
    fetch(src, { method: 'HEAD' })
      .then((res) => {
        if (!cancelled && (res.status === 404 || res.status === 410 || res.status >= 500)) {
          setStatus('error');
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  return (
    <span className="model-viewer-container">
      {status === 'ready' ? (
        // Scrolling matters more than zooming for a model sitting mid-article:
        // disable-zoom lets the wheel/trackpad scroll the page instead of being
        // swallowed by the model, and touch-action="pan-y" does the same on
        // mobile. Opt back into zooming per embed with zoom="true".
        <model-viewer
          ref={attachSrc}
          alt={alt || 'Interactive 3D model'}
          poster={poster}
          camera-controls=""
          auto-rotate=""
          camera-orbit="-20deg 72deg auto"
          rotation-per-second="18deg"
          environment-image="neutral"
          shadow-intensity="1"
          exposure="1.05"
          {...(zoom === 'true' ? {} : { 'disable-zoom': '' })}
          touch-action="pan-y"
          {...rest}
        />
      ) : (
        <span className="model-viewer-fallback">
          {/* one flex child, so the spaces around the link survive */}
          <span>
            {status === 'error' ? (
              <>
                Could not load the 3D model.{' '}
                <a href={src} download className="markdown-link">
                  Download it
                </a>{' '}
                instead.
              </>
            ) : (
              'Loading 3D model…'
            )}
          </span>
        </span>
      )}
      {caption ? <span className="model-viewer-caption">{caption}</span> : null}
    </span>
  );
};

const MarkdownRenderer = ({ content }) => {
  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          // Interactive 3D models, authored as raw <model-viewer> HTML
          'model-viewer': ModelViewer,
          // Custom styling for code blocks
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <pre className="code-block">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className="inline-code" {...props}>
                {children}
              </code>
            );
          },
          // Custom styling for headings
          h1: ({ children }) => <h1 className="markdown-h1">{children}</h1>,
          h2: ({ children }) => <h2 className="markdown-h2">{children}</h2>,
          h3: ({ children }) => <h3 className="markdown-h3">{children}</h3>,
          h4: ({ children }) => <h4 className="markdown-h4">{children}</h4>,
          h5: ({ children }) => <h5 className="markdown-h5">{children}</h5>,
          h6: ({ children }) => <h6 className="markdown-h6">{children}</h6>,
          // Custom styling for links - handle YouTube links specially
          a: ({ href, children }) => {
            const videoId = getYouTubeVideoId(href);
            
            if (videoId) {
              return (
                <span className="youtube-link-container">
                  <YouTubeEmbed videoId={videoId} />
                  <a href={href} target="_blank" rel="noopener noreferrer" className="markdown-link youtube-link">
                    {children}
                  </a>
                </span>
              );
            }
            
            return (
              <a href={href} target="_blank" rel="noopener noreferrer" className="markdown-link">
                {children}
              </a>
            );
          },
          // Custom styling for lists
          ul: ({ children }) => <ul className="markdown-ul">{children}</ul>,
          ol: ({ children }) => <ol className="markdown-ol">{children}</ol>,
          // Custom styling for blockquotes
          blockquote: ({ children }) => (
            <blockquote className="markdown-blockquote">{children}</blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer; 
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

const config = [
  {
    // .cache is leftover Gatsby build output from before the Next migration,
    // .claude holds a full worktree copy of this repo; neither is our source.
    ignores: [
      '.next/**',
      '.cache/**',
      '.claude/**',
      'out/**',
      'build/**',
      'public/**',
    ],
  },
  ...nextCoreWebVitals,
]

export default config

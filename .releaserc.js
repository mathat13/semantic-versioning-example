
const branch = process.env.GITHUB_REF_NAME || process.env.CI_COMMIT_REF_NAME || 'unknown';
const isDev = branch === 'dev';

console.log(`Running semantic-release on branch: ${branch} (${isDev ? 'dev tag only' : 'main release'})`);

module.exports = {
  branches: [
    { name: 'main' },
    { name: 'dev', prerelease: 'dev' }
  ],

  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
        changelogTitle: '# Changelog',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md'],
        message: 'chore(release): ${nextRelease.version} [skip ci]',
      },
    ],
    // Only include GitHub plugin on main pushes, not on dev prereleases
    ...(isDev ? [] : ['@semantic-release/github'])
  ],
};
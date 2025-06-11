// File Path: next.config.js
// Purpose: Configures Next.js build settings, including enabling static exports.
// Key Components/Logic:
//   - output: 'export' enables static HTML export
//   - distDir: Specifies the output directory as 'out'
// Role in Application: Controls how Next.js builds the application for production deployment.

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enables static HTML export
  distDir: 'out',    // Sets the output directory to 'out'
  images: {
    unoptimized: true, // Required for static export
  },
  // Disable server-based features for static export
  typescript: {
    ignoreBuildErrors: false, // Set to true only if you want to ignore TypeScript errors during build
  },
};

module.exports = nextConfig; 
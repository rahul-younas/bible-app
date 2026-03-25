import withPWAInit from 'next-pwa';

const isDev = process.env.NODE_ENV === 'development';

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: isDev, // disables PWA in development
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
};

export default withPWA(nextConfig);

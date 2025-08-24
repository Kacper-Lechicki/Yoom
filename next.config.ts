import type { NextConfig } from 'next';

import path from 'path';

import './env';

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, '..'),
  },
};

export default nextConfig;

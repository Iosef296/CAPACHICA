/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        night: {
          DEFAULT: '#0B1426',
          mid: '#132042',
          light: '#1B2D5A',
        },
        day: {
          DEFAULT: '#87CEEB',
          mid: '#4A90D9',
          deep: '#2E6DB4',
        },
        accent: {
          DEFAULT: '#FF6B35',
          hover: '#E85D2C',
          light: '#FF8C5A',
        },
        sand: '#F4E4BA',
        sun: '#FFD700',
        moon: '#F5F0D0',
        star: '#FFE566',
      },
      animation: {
        twinkle: 'twinkle 3s ease-in-out infinite',
        'sun-rise': 'sunrise 1.5s ease-out both',
        'sun-pulse': 'sunPulse 4s ease-in-out infinite',
        'moon-glow': 'moonGlow 4s ease-in-out infinite',
        'cloud-drift': 'cloudDrift 35s linear infinite',
        'seagull-fly': 'seagullFly 14s linear infinite',
        'rotate-rays': 'rotateRays 20s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease both',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.7)' },
          '50%': { opacity: '1', transform: 'scale(1.3)' },
        },
        sunrise: {
          '0%': { transform: 'translateY(80px) scale(0.6)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        sunPulse: {
          '0%, 100%': { boxShadow: '0 0 60px rgba(255,215,0,0.5), 0 0 120px rgba(255,140,0,0.25)' },
          '50%': { boxShadow: '0 0 80px rgba(255,215,0,0.7), 0 0 160px rgba(255,140,0,0.35)' },
        },
        moonGlow: {
          '0%, 100%': { boxShadow: '0 0 30px rgba(245,240,208,0.3), 0 0 60px rgba(245,240,208,0.15)' },
          '50%': { boxShadow: '0 0 50px rgba(245,240,208,0.5), 0 0 100px rgba(245,240,208,0.25)' },
        },
        cloudDrift: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(120vw)' },
        },
        seagullFly: {
          '0%': { transform: 'translateX(-100vw) translateY(0)' },
          '25%': { transform: 'translateX(-25vw) translateY(-15px)' },
          '50%': { transform: 'translateX(0) translateY(5px)' },
          '75%': { transform: 'translateX(25vw) translateY(-10px)' },
          '100%': { transform: 'translateX(100vw) translateY(0)' },
        },
        rotateRays: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
};
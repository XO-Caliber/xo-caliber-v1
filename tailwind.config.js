/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        muted_gray:"#64748B",
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)'
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground:
            'var(--secondary-foreground)'
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground:
            'var(--destructive-foreground)'
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)'
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)'
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)'
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: {
            height:
              'var(--radix-accordion-content-height'
          }
        },
        'accordion-up': {
          from: {
            height:
              'var(--radix-accordion-content-height'
          },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down':
          'accordion-down 0.2s ease-out',
        'accordion-up':
          'accordion-up 0.2s ease-out'
      },
      backgroundImage: {
        'gradient-radial':
          'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      boxShadow: {
        'custom-shadow':
          '8px 0px 30px -1px rgba(0, 0, 0, 0.2);'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};

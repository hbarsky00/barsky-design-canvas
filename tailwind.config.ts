import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				script: ['Dancing Script', 'cursive'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Modern Design System Colors
				navy: {
					primary: 'hsl(var(--navy-primary))',
					secondary: 'hsl(var(--navy-secondary))'
				},
				blue: {
					accent: 'hsl(var(--blue-accent))',
					vibrant: 'hsl(var(--blue-vibrant))'
				},
				orange: {
					vibrant: 'hsl(var(--orange-vibrant))'
				},
				purple: {
					vibrant: 'hsl(var(--purple-vibrant))'
				},
				success: {
					green: 'hsl(var(--success-green))'
				},
				neutral: {
					50: 'hsl(var(--neutral-50))',
					100: 'hsl(var(--neutral-100))',
					200: 'hsl(var(--neutral-200))',
					500: 'hsl(var(--neutral-500))',
					900: 'hsl(var(--neutral-900))'
				},
				barsky: {
					'bg-light': '#F6F6F8',
					'bg-white': '#FFFFFF',
					'blue': '#5D5DFF',
					'blue-dark': '#4B4ACF',
					'dark': '#333644',
					'text': '#4F5D75',
					'text-light': '#8A94A7',
				},
				// Glass morphism colors
				glass: {
					light: 'rgba(255, 255, 255, 0.1)',
					medium: 'rgba(255, 255, 255, 0.2)',
					dark: 'rgba(0, 0, 0, 0.1)',
					blue: 'rgba(96, 165, 250, 0.1)',
					accent: 'rgba(139, 92, 246, 0.1)'
				}
			},
			backdropBlur: {
				xs: '2px',
			},
			boxShadow: {
				'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
				'glass-inset': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
				'elevated': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
				'elevated-lg': '0 35px 60px -12px rgba(0, 0, 0, 0.3)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'text-reveal': {
					'0%': {
						transform: 'translateY(100%)',
						opacity: '0'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'wiggle': {
					'0%, 100%': {
						transform: 'rotate(-3deg)'
					},
					'50%': {
						transform: 'rotate(3deg)'
					}
				},
				'pulse-grow': {
					'0%, 100%': {
						transform: 'scale(1)'
					},
					'50%': {
						transform: 'scale(1.05)'
					}
				},
				'bounce-horizontal': {
					'0%, 100%': {
						transform: 'translateX(0)'
					},
					'50%': {
						transform: 'translateX(-5px)'
					}
				},
				'tada': {
					'0%': { transform: 'scale(1) rotate(0deg)' },
					'10%, 20%': { transform: 'scale(0.9) rotate(-3deg)' },
					'30%, 50%, 70%, 90%': { transform: 'scale(1.1) rotate(3deg)' },
					'40%, 60%, 80%': { transform: 'scale(1.1) rotate(-3deg)' },
					'100%': { transform: 'scale(1) rotate(0deg)' }
				},
				'character-bounce': {
					'0%': {
						transform: 'translateY(0)',
					},
					'50%': {
						transform: 'translateY(-15px) scale(1.1)',
					},
					'100%': {
						transform: 'translateY(0)',
					},
				},
				'slide-in': {
					'0%': { 
						opacity: '0', 
						transform: 'translateX(-20px)' 
					},
					'100%': { 
						opacity: '1', 
						transform: 'translateX(0)' 
					}
				},
				'scale-in': {
					'0%': { 
						opacity: '0', 
						transform: 'scale(0.95)' 
					},
					'100%': { 
						opacity: '1', 
						transform: 'scale(1)' 
					}
				},
				'glass-shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'text-reveal': 'text-reveal 0.5s ease-out forwards',
				'float': 'float 3s ease-in-out infinite',
				'wiggle': 'wiggle 1s ease-in-out infinite',
				'pulse-grow': 'pulse-grow 2s ease-in-out infinite',
				'bounce-horizontal': 'bounce-horizontal 1s ease-in-out infinite',
				'tada': 'tada 1s ease-in-out',
				'character-bounce': 'character-bounce 0.5s ease-in-out',
				'slide-in': 'slide-in 0.6s ease-out forwards',
				'scale-in': 'scale-in 0.6s ease-out forwards',
				'glass-shimmer': 'glass-shimmer 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

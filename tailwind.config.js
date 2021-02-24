const { opacity } = require('tailwindcss/defaultTheme')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	purge: [
		'./src/**/*.html',
		'./src/**/*.njk',
		'./src/**/*.md',
		'./src/_data/colors.js',
		'./src/_data/structure.js',
	],
	experimental: {
		applyComplexClasses: true,
	},
	future: {
		removeDeprecatedGapUtilities: true,
	},
	theme: {
		fontFamily: {
			sans: [
				'Brandon',
				'ui-sans-serif',
				'system-ui',
				'-apple-system',
				'BlinkMacSystemFont',
				'"Segoe UI"',
				'Roboto',
				'"Helvetica Neue"',
				'Arial',
				'"Noto Sans"',
				'sans-serif',
			],
		},

		extend: {
			fontSize: {
				'2-half-xl': '1.65rem',
			},
			textShadow: {
				"lg-dark": "3px 3px 6px rgb(0 0 0 / 46%), 0 0 5px rgb(15 3 86 / 42%)"
			},
			boxShadow: {
				"lg-dark":
					"0 1.3px 1.9px rgba(0, 0, 0, 0.1),  0 3.3px 4.9px rgba(0, 0, 0, 0.133),  0 6.7px 9.9px rgba(0, 0, 0, 0.167),  0 13.9px 20.4px rgba(0, 0, 0, 0.207),  0 38px 56px rgba(0, 0, 0, 0.2);"
			},
			colors: {
				'dark': "#093249",
				'accent': "#a72116"
			},
			typography: {
				'xl': {
					css: {
						'ul > li:before':
						{
							top: '.8em !important'
						}
					}
				},
				'lg': {
					css: {
						'ul > li:before':
						{
							top: '.8em !important'
						}
					}
				},
				DEFAULT: {
					css: {
						blockquote: {
							fontWeight: 'normal',
						},
						code: {
							fontSize: '.8em',
							border: 'none',
							padding: '.3rem',
							fontWeight: 'normal',
							'&:before': { content: "none !important" },
							'&:after': { content: "none !important" },
							borderRadius: '3px',
							opacity: 'rgba(229, 231, 235, var(--tw-bg-opacity))',
							"--tw-bg-opacity": '0.5 !important'


						}
						,
						h1: {
							color: 'inherit'
						}
					},
				},
			},
			opacity: (theme) => ({
				5: '.05',
				10: '.1',
				15: '.15',
				20: '.2',
			}),
			// created my own heights so can specify for Heros
			height: (theme) => ({
				'1/2': '50vh',
				'3/4': '75vh',
				'9/10': '90vh',
				'1/1': '100vh',
				'1/3': 'calc(100vh / 3)',
				'1/4': 'calc(100vh / 4)',
				'1/5': 'calc(100vh / 5)',
				96: '24rem',
				128: '32rem',
			}),
		},
	},
	variants: {},
	plugins: [
		require('@tailwindcss/custom-forms'),
		require('@tailwindcss/typography'),
		require('tailwindcss-textshadow')
	]
	,
}

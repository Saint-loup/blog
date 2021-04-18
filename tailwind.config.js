const { opacity, fontFamily } = require('tailwindcss/defaultTheme')
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
	purge: [
		'./src/**/*.html',
		'./src/**/*.njk',
		'./src/**/*.md',
		'./src/_data/colors.js',
		'./src/_data/structure.js',
	],
	theme: {
<<<<<<< Updated upstream
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
			spacing: {
				'per-lg': '4%',
				'per': '2%',


			},
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
							backgroundColor: 'rgba(229, 231, 235, .5)',
							fontFamily: 'unset'
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
=======
		textIndent: { // defaults to {}
			'1': '0.25rem',
			'2': '0.5rem',
		},
		textShadow: { // defaults to {}
			'default': '0 2px 5px rgba(0, 0, 0, 0.5)',
			'lg': '0 2px 10px rgba(0, 0, 0, 0.5)',
		},
		textDecorationStyle: { // defaults to these values
			'solid': 'solid',
			'double': 'double',
			'dotted': 'dotted',
			'dashed': 'dashed',
			'wavy': 'wavy',
		},
		textDecorationColor: { // defaults to theme => theme('colors')
			'red': '#f00',
			'green': '#0f0',
			'blue': '#00f',
>>>>>>> Stashed changes
		},
		fontVariantCaps: { // defaults to these values
			'normal': 'normal',
			'small': 'small-caps',
			'all-small': 'all-small-caps',
			'petite': 'petite-caps',
			'unicase': 'unicase',
			'titling': 'titling-caps',
		},
		fontVariantNumeric: { // defaults to these values
			'normal': 'normal',
			'ordinal': 'ordinal',
			'slashed-zero': 'slashed-zero',
			'lining': 'lining-nums',
			'oldstyle': 'oldstyle-nums',
			'proportional': 'proportional-nums',
			'tabular': 'tabular-nums',
			'diagonal-fractions': 'diagonal-fractions',
			'stacked-fractions': 'stacked-fractions',
		},
		fontVariantLigatures: { // defaults to these values
			'normal': 'normal',
			'none': 'none',
			'common': 'common-ligatures',
			'no-common': 'no-common-ligatures',
			'discretionary': 'discretionary-ligatures',
			'no-discretionary': 'no-discretionary-ligatures',
			'historical': 'historical-ligatures',
			'no-historical': 'no-historical-ligatures',
			'contextual': 'contextual',
			'no-contextual': 'no-contextual',
		},
		textRendering: { // defaults to these values
			'rendering-auto': 'auto',
			'optimize-legibility': 'optimizeLegibility',
			'optimize-speed': 'optimizeSpeed',
			'geometric-precision': 'geometricPrecision'
		},
		textStyles: theme => ({ // defaults to {}
			heading: {
				output: false, // this means there won't be a "heading" component in the CSS, but it can be extended
				fontWeight: theme('fontWeight.bold'),
				lineHeight: theme('lineHeight.tight'),
			},
			h1: {
				extends: 'heading', // this means all the styles in "heading" will be copied here; "extends" can also be an array to extend multiple text styles
				fontSize: theme('fontSize.5xl'),
				'@screen sm': {
					fontSize: theme('fontSize.6xl'),
				},
			},
			h2: {
				extends: 'heading',
				fontSize: theme('fontSize.4xl'),
				'@screen sm': {
					fontSize: theme('fontSize.5xl'),
				},
			},
			h3: {
				extends: 'heading',
				fontSize: theme('fontSize.4xl'),
			},
			h4: {
				extends: 'heading',
				fontSize: theme('fontSize.3xl'),
			},
			h5: {
				extends: 'heading',
				fontSize: theme('fontSize.2xl'),
			},
			h6: {
				extends: 'heading',
				fontSize: theme('fontSize.xl'),
			},
			link: {
				fontWeight: theme('fontWeight.bold'),
				color: theme('colors.blue.400'),
				'&:hover': {
					color: theme('colors.blue.600'),
					textDecoration: 'underline',
				},
			},
			richText: {
				fontWeight: theme('fontWeight.normal'),
				fontSize: theme('fontSize.base'),
				lineHeight: theme('lineHeight.relaxed'),


				'> * + *': {
					marginTop: '1em',
				},
				'h1': {
					extends: 'h1',
					marginTop: '1.5em'

				},
				'h2': {
					extends: 'h2',
					marginTop: '1.5em'
				},
				'h3': {
					extends: 'h3',
					marginTop: '1.5em'

				},
				'h4': {
					extends: 'h4',
					marginTop: '1.5em'

				},
				'h5': {
					extends: 'h5',
					marginTop: '1.5em'

				},
				'h6': {
					extends: 'h6',
					marginTop: '1.5em'

				},
				'ul': {
					listStyleType: 'disc',
				},
				'ol': {
					listStyleType: 'decimal',
				},
				'a': {
					extends: 'link',
				},
				'b, strong': {
					fontWeight: theme('fontWeight.bold'),
				},
				'i, em': {
					fontStyle: 'italic',
				},
			},
		}),
	},
<<<<<<< Updated upstream
	variants: {},
	plugins: [
		require('@tailwindcss/typography'),
		require('tailwindcss-textshadow'),
		require('@tailwindcss/forms'),
	]
	,
}
=======
	variants: { // all the following default to ['responsive']
		textIndent: ['responsive'],
		textShadow: ['responsive'],
		textDecorationStyle: ['responsive'],
		textDecorationColor: ['responsive'],
		ellipsis: ['responsive'],
		hyphens: ['responsive'],
		kerning: ['responsive'],
		textUnset: ['responsive'],
		fontVariantCaps: ['responsive'],
		fontVariantNumeric: ['responsive'],
		fontVariantLigatures: ['responsive'],
		textRendering: ['responsive'],
	},
	plugins: [
		require('tailwindcss-typography')({
			// all these options default to the values specified here
			ellipsis: true,         // whether to generate ellipsis utilities
			hyphens: true,          // whether to generate hyphenation utilities
			kerning: true,          // whether to generate kerning utilities
			textUnset: true,        // whether to generate utilities to unset text properties
			componentPrefix: 'c-',  // the prefix to use for text style classes
		}),
	],
};


//module.exports = {
//	purge: [
//		'./src/**/*.html',
//		'./src/**/*.njk',
//		'./src/**/*.md',
//		'./src/_data/colors.js',
//		'./src/_data/structure.js',
//	],
//	experimental: {
//		applyComplexClasses: true,
//	},
//	future: {
//		removeDeprecatedGapUtilities: true,
//	},
//	theme: {

//		extend: {
//			opacity: (theme) => ({
//				5: '.05',
//				10: '.1',
//				15: '.15',
//				20: '.2',
//			}),
//			// created my own heights so can specify for Heros
//			height: (theme) => ({
//				'1/2': '50vh',
//				'3/4': '75vh',
//				'9/10': '90vh',
//				'1/1': '100vh',
//				'1/3': 'calc(100vh / 3)',
//				'1/4': 'calc(100vh / 4)',
//				'1/5': 'calc(100vh / 5)',
//				96: '24rem',
//				128: '32rem',
//			}),
//		},
//	},
//	variants: {},
//	plugins: [require('@tailwindcss/custom-forms')],
//}
>>>>>>> Stashed changes

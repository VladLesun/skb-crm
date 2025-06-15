const plugin = require('tailwindcss/plugin');

module.exports = {
	content: ['./src/**/*.{html,js}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: '#1E3A8A',
				secondary: '#E0F2FE',
				accent: '#F59E0B',
				danger: '#EF4444',
				neutral: '#F3F4F6',
			},
			fontFamily: {
				sans: ['"Open Sans"', 'sans-serif', 'system-ui'],
			},
			spacing: {
				128: '32rem',
				144: '36rem',
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		plugin(({ addUtilities }) => {
			addUtilities({
				'.scroll-y': {
					overflowY: 'auto',
				},
				'.no-scrollbar': {
					scrollbarWidth: 'none',
					'&::-webkit-scrollbar': {
						display: 'none',
					},
				},
			});
		}),
	],
};

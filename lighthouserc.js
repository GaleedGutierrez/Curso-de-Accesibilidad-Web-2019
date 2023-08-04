module.exports = {
	ci: {
		assert: {
			preset: 'lighthouse:no-pwa',
			assertions: {
				// Performance related
				'unused-javascript': 'warn',
				'uses-responsive-images': 'warn',
				// "lcp-lazy-loaded": "warn",
				// Not performance related
				// "tap-targets": "off",
				// "non-composited-animations": "off",
				// "button-name": "off",
				// "color-contrast": "off",
				'csp-xss': 'warn',
				'unsized-images': 'warn',
				// "errors-in-console": "off",
				// "external-anchors-use-rel-noopener": "off",
				// "heading-order": "off",
				// "link-name": "off",
				// "meta-description": "off",
				// "uses-text-compression": "off",
			},
		},
	},
};

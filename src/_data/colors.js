module.exports = {
	/**
	 * ************************ IMPORTANT *********************************
	 *  A few colors for links, blockquotes, code, etc. are set in the
	 *  /src/assets/css/tailwind.css file.
	 *  So if you can't find what you're looking for below,
	 *  check out that tailwind.css file.
	 * ********************************************************************
	 *
	 *
	 * ===== Global Site Text Color =====
	 */
	siteTextDefault: 'text-gray-900',



	/**
	 *  NOTE: You MUST keep all Custom variable keys, even if their values are empty and you don't intend to use them.
	 *  If you delete any variable keys, 11ty won't work.
	 */
	navCustom: {
		barBg: 'bg-dark',
		text: 'text-gray-100',
		textActive: 'text-gray-200',
		textHover: 'text-accent',
		textActiveBg: 'nav-selected',
		textFocus: 'text-accent',
		mobileBgActive: 'border-b-2',
		mobileBgHover: 'bg-gray-100',
		mobileBgFocus: 'text-gray-100',
		mobileText: 'text-gray-200',
		mobileTextHover: 'text-accent',
		mobileTextFocus: 'text-accent,
		mobileButton: 'text-gray-200',

	},


	/**
	 * ===== Pagination Settings =====
	 *
	 * === Post Listing Pills ===
	 */
	paginate: {
		blockBg: '',
		blockBorder: 'border-gray-200',
		linkText: 'text-gray-600',
		linkTextActive: 'text-gray-900 font-bold',
		linkTextHover: 'text-gray-700	',
		linkBg: 'bg-white',
		linkBgActive: 'bg-gray-100',
		linkBgHover: 'bg-gray-200',
		linkBorder: 'border-gray-300',
		linkFocusBorder: 'border-accent-300 ',
	},



}
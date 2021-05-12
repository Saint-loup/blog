require('dotenv').config()


module.exports = {
	env: process.env.NODE_ENV || 'development ',
	siteURL: process.env.URL || 'https://toutcequibouge.net/',
	siteName: "Tout ce qui bouge",
	siteDescription:
		'Veille et réflexion sur la technologie, ses usages et mésusages.',
	siteImage: '',
	lang: 'fr',
	locale: 'fr_FR',
	authorName: 'Baptiste',
	authorEmail: '',

	zoteroProfileID: "5883126",



}

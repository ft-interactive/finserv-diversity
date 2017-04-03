export default () => ({ // eslint-disable-line

  // link file UUID
  id: '41d3ef6c-1469-11e7-80f4-13e067d5072c',

  // canonical URL of the published page
  // https://ig.ft.com/finserv-diversity get filled in by the ./configure script
  url: 'https://ig.ft.com/managements-missing-women-data',

  // To set an exact publish date do this:
  //       new Date('2016-05-17T17:11:22Z')
  publishedDate: new Date('2017-04-02T18:00:00Z'),

  headline: 'Women vastly outnumbered by men as they climb the corporate ranks',

  // summary === standfirst (Summary is what the content API calls it)
  summary: 'Huge efforts made by the financial sector fail to close the gender gap',

  topic: {
    name: 'Financial Services',
    url: 'https://www.ft.com/companies/financial-services',
  },

  relatedArticle: {
    text: '',
    url: '',
  },

  mainImage: {
    title: '',
    description: '',
    url: 'https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3Ab9ba1b1a-1634-11e7-b0c1-37e417ee6c76?source=ig&width=2048&height=1152',
    width: 2048, // ensure correct width
    height: 1152, // ensure correct height
  },

  // Byline can by a plain string, markdown, or array of authors
  // if array of authors, url is optional
  byline: [
    { name: 'Laura Noonan', url: 'https://www.ft.com/stream/authorsId/Q0ItTE41Njc4OQ==-QXV0aG9ycw==' },
    { name: 'Alan Smith', url: 'https://www.ft.com/alan-smith' },
    { name: 'David Blood', url: 'https://www.ft.com/david-blood' },
    { name: 'Martin Stabe', url: 'https://www.ft.com/martin-stabe' },
  ],

  // Appears in the HTML <title>
  title: '',

  // meta data
  description: 'Huge efforts made by the financial sector fail to close the gender gap',

  /*
  TODO: Select Twitter card type -
        summary or summary_large_image

        Twitter card docs:
        https://dev.twitter.com/cards/markup
  */
  twitterCard: 'summary',

  /*
  TODO: Do you want to tweak any of the
        optional social meta data?
  */
  // General social
  socialImage: 'https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3Ad5ab34a4-1886-11e7-a53d-df09f373be87?source=ig&width=1400',
  socialHeadline: '',
  socialSummary: 'Huge efforts made by the financial sector fail to close the gender gap',

  // TWITTER
  twitterImage: 'https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3Ad5ab34a4-1886-11e7-a53d-df09f373be87?source=ig&width=1400',
  twitterCreator: '@FT',
  tweetText: 'How successful are efforts to narrow the financial services industry\'s gender gap? We gathered the data to find out.',
  twitterHeadline: 'Finance\'s missing women',

  // FACEBOOK
  facebookImage: 'https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3Ad5ab34a4-1886-11e7-a53d-df09f373be87?source=ig&width=1400',
  facebookHeadline: 'How are financial services firms doing on gender equality?',

  tracking: {

    /*

    Microsite Name

    e.g. guffipedia, business-books, baseline.
    Used to query groups of pages, not intended for use with
    one off interactive pages. If you're building a microsite
    consider more custom tracking to allow better analysis.
    Also used for pages that do not have a UUID for whatever reason
    */
    // micrositeName: '',

    /*
    Product name

    This will usually default to IG
    however another value may be needed
    */
    // product: '',
  },
});

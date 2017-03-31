export default () => ({ // eslint-disable-line

  // link file UUID
  id: '41d3ef6c-1469-11e7-80f4-13e067d5072c',

  // canonical URL of the published page
  // https://ig.ft.com/finserv-diversity get filled in by the ./configure script
  url: 'https://ig.ft.com/managements-missing-women-data',

  // To set an exact publish date do this:
  //       new Date('2016-05-17T17:11:22Z')
  publishedDate: new Date('2017-04-02T18:00:00Z'),

  headline: 'Management’s missing women',

  // summary === standfirst (Summary is what the content API calls it)
  summary: 'TK STANDFIRST TK',

  topic: {
    name: 'Financial Services',
    url: 'https://www.ft.com/companies/financial-services',
  },

  relatedArticle: {
    text: 'Related article »',
    url: 'https://en.wikipedia.org/wiki/Politics_and_the_English_Language',
  },

  mainImage: {
    title: '',
    description: '',
    url: 'https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3Ac4bf0be4-7c15-11e4-a7b8-00144feabdc0?source=ig&width=2048&height=1152',
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
  description: 'description',

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
  // socialImage: '',
  // socialHeadline: '',
  // socialSummary:  '',

  // TWITTER
  // twitterImage: '',
  // twitterCreator: '@individual's_account',
  // tweetText:  '',
  // twitterHeadline:  '',

  // FACEBOOK
  // facebookImage: '',
  // facebookHeadline: '',

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

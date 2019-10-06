
const apiKeys = {
  gamespot: 'ba3aee9b70430a0283e29894a579ad0a4c01c04f',
};

const apiBaseUrls = {
  gamespotGames: `https://www.gamespot.com/api/games/?api_key=${apiKeys.gamespot}`,
};

const queries = {
  // format=[type]
  jsonFormat: '&format=json',
  // limit=[number]
  limit: '&limit=10',
  // filter=[]
  // sort=[field]%3A[asc or desc]
  sort: (field, direction = undefined) => `&sort=${field}${direction ? `%3A${direction}` : ''}`,
  filter: (field, date) => `&filter=${field}:${date}`,
};

const urls = {
  gamespotGames: 
    apiBaseUrls.gamespotGames + 
    queries.jsonFormat + 
    queries.limit + 
    queries.sort('release_date', 'desc') +
    queries.filter('release_date', '2019-02-00%7C2019-12-31'),
};

module.exports = {
  urls,
};

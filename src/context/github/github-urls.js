const baseUrl = `https://api.github.com`;
const clientId = `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`;
const clientSecret = `client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
const usersSearchBaseUrl = `${baseUrl}/search/users`;
const usersBaseUrl = `${baseUrl}/users`;
const queryOptions = `pre_page=5&sort=created:asc`;

const urls = {
  baseUrl,
  clientId,
  clientSecret,
  usersSearchBaseUrl,
  usersBaseUrl,
  queryOptions,
};

export default urls;

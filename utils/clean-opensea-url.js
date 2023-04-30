export function cleanUrl(url) {
  if (url) {
    const regex = /https:\/\/opensea.io\/([a-z]{2}\/)?assets\//g;
    const tokenString = url.trim().replace(regex, '').split('?')[0];
    return tokenString;
  }
  return null;
}

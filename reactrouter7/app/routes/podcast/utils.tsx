export function getPodcastKey(matches) {
  return matches[matches.length - 1].id.split('.')[0];
}

export function getIsResources(matches) {
  return matches[matches.length - 1].id === 'mlg.resources';
}
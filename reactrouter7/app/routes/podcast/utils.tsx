export function getPodcastKey(matches) {
  const parts = matches[matches.length - 1].pathname.split('/')
  return parts.filter(Boolean)[0]
}

export function getIsResources(matches) {
  return
}
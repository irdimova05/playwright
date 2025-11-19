export function uniqueEmail(prefix = 'test', domain = 'test.test') {
  // timestamp + random suffix to reduce collision risk in parallel runs
  const suffix = Math.floor(Math.random() * 1000000);
  return `${prefix}${Date.now()}${suffix}@${domain}`;
}

import { isInteger, isNonEmptyString, isUrl, toUrl } from '@yesstudio/yes-utils'

export function validateEnv({
  API_URL,
  ASSET_BUCKET_URL,
  ASSET_SERVICE_URL,
  BASE_URL,
  CMS_URL,
  HOMEPAGE_NODE_ID,
  NODE_ENV,
  PROJECT_SLUG,
  SESSION_COOKIE,
}) {
  const throwError = (message) => {
    throw new Error(`[nuxt.config.js]: ${message}`)
  }

  Object.entries({ API_URL, ASSET_BUCKET_URL, ASSET_SERVICE_URL, BASE_URL, CMS_URL }).forEach(([key, value]) => {
    if (!isUrl(value)) {
      throwError(`Invalid ${key}: expected URL, received "${value}".`)
    }
  })

  Object.entries({ HOMEPAGE_NODE_ID }).forEach(([key, value]) => {
    if (!isInteger(parseInt(value))) {
      throwError(`Invalid ${key}: expected integer, received "${value}".`)
    }
  })

  if (!['development', 'staging', 'production'].includes(NODE_ENV)) {
    throwError(`Invalid NODE_ENV: expected "development", "staging" or "production", received "${NODE_ENV}".`)
  }

  Object.entries({ PROJECT_SLUG, SESSION_COOKIE }).forEach(([key, value]) => {
    if (!isNonEmptyString(value)) {
      throwError(`Invalid ${key}: expected non-empty string, received "${value}".`)
    }
  })

  return {
    apiURL: toUrl(API_URL).toString().replace(/\/$/, ''),
    assetBucketURL: toUrl(ASSET_BUCKET_URL).toString().replace(/\/$/, ''),
    assetServiceURL: toUrl(ASSET_SERVICE_URL).toString().replace(/\/$/, ''),
    baseURL: toUrl(BASE_URL).toString().replace(/\/$/, ''),
    cmsURL: toUrl(CMS_URL).toString().replace(/\/$/, ''),
    homepageNodeID: parseInt(HOMEPAGE_NODE_ID),
    isDevelopment: NODE_ENV === 'development',
    isLocalhost: toUrl(BASE_URL).hostname === 'localhost',
    isProduction: NODE_ENV === 'production',
    projectSlug: PROJECT_SLUG,
    sessionCookie: SESSION_COOKIE,
  }
}

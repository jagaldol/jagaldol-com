"use client"

import Head from "next/head"

type SEOProps = {
  title?: string
  description?: string
  image?: string
  pathname?: string
  children?: React.ReactNode
}

const siteUrl = "https://jagaldol.com"

export default function SEO({ title, description, image, pathname, children }: SEOProps) {
  const fullUrl = pathname ? `${siteUrl}${pathname}` : undefined
  const fullImage = image ? `${siteUrl}${image}` : undefined

  return (
    <Head>
      {title && <title>{title} | Hyejun An</title>}
      {description && <meta name="description" content={description} />}
      {fullImage && <meta name="image" content={fullImage} />}

      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {fullImage && <meta property="og:image" content={fullImage} />}
      {fullUrl && <meta property="og:url" content={fullUrl} />}

      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      {fullImage && <meta name="twitter:image" content={fullImage} />}

      {children}
    </Head>
  )
}

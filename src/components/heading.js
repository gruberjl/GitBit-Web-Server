import React from "react"
import { Helmet } from "react-helmet"
import 'bootstrap/dist/css/bootstrap.min.css'
import { withRouter } from "react-router"
import GitBitImg from "../images/gitbit-icon-500x500.png"
import consts from './consts'

const getDescription = (propsDescription) => {
  if (propsDescription) {
    let description = propsDescription
    if (description.length > 147)
      description = description.substring(0, 156) + '...'
    return description
  }

  return 'Learn, prepare and training for the Microsoft Microsoft Office 365 Exam MS-500: Microsoft 365 Security Administration MS-500 exam'
}

const getTitle = (propsTitle) => {
  if (propsTitle) {
    let title = propsTitle
    if (title.length > 58)
      title = title.substring(0, 58) + '...'
    return title
  }

  return 'Training for MS-500: Microsoft Office 365 Security Admin'
}

const getJsonLd = (jsonLdType, id, title, description, image, jsonLd={}) => {
  if (!jsonLdType)
    return null

    const jsonLD = [
      Object.assign({},
        {
          "audience": {
            "@type": "Audience",
            "audienceType": [
              "Anyone who wants to learn about Microsoft 365."
            ]
          },
          "image": image || GitBitImg,
          "provider": {
            "@type": "Organization",
            "sameAs": "www.gitbit.org",
            "name": "GitBit"
          },
          "about": {
            "name": "Microsoft 365"
          },
          "name": title,
          "creator": [
            {
              "@type": "Person",
              "name": "John Gruber"
            }
          ],
          "@id": id,
          "inLanguage": "en",
          "publisher": {
            "@type": "Organization",
            "sameAs": "www.gitbit.org",
            "name": "GitBit"
          },
          "@type": jsonLdType,
          "isAccessibleForFree": true,
          "description": description,
          "@context": "http://schema.org"
        },
        jsonLd
      )
    ]

  return jsonLD
}

export default withRouter((props) => {
  const canonicalUrl = props.canonical ? props.canonical : consts.siteUrl + props.location.pathname
  const description = getDescription(props.description)
  const title = getTitle(props.title)
  const pageTitle = title + ' - GitBit'

  const jsonLD = getJsonLd(props.jsonLdType, consts.siteUrl + props.location.pathname, title, description, props.image, props.jsonLd)
  return (
    <div>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <title>{pageTitle}</title>
        <link rel="canonical" href={canonicalUrl} />
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="GitBit" />
        <meta property="og:image" itemprop="image primaryImageOfPage" content={props.image || GitBitImg} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:domain" content="gitbit.org" />
        <meta name="twitter:title" property="og:title" itemprop="name" content={title} />
        <meta name="twitter:description" property="og:description" itemprop="description" content={description} />
        <meta name="twitter:app:country" content="US" />
        <meta name="twitter:site" content="@gruberjl" />
        <link rel="alternate" type="application/rss+xml" href={`${consts.siteUrl}/feed/rss.xml`} />
        <link rel="alternate" type="application/atom+xml" href={`${consts.siteUrl}/feed/atom.xml`} />
        <link rel="alternate" title={'Training for MS-500: Microsoft Office 365 Security Admin'} type="application/json" href={`${consts.siteUrl}/feed/feed.json`} />
        {
          jsonLD ?
            <script type="application/ld+json">
              {JSON.stringify(jsonLD)}
            </script> :
            ''
        }
      </Helmet>
    </div>
  )
})

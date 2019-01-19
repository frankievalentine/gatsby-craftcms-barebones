import React from 'react'

import Layout from '../components/layout'
import Image from '../components/image'
import Image2 from '../components/image2'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Hi people</h1>
    <p>Enjoy this barebones starter for Craft CMS and Gatsby.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
      <Image2 />
    </div>
  </Layout>
)

export default IndexPage

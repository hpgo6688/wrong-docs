import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';
function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        {/* <Heading as="h1" className="hero__title">
          这不是一个基础性的技术栈
        </Heading> */}
        {/* <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div> */}
        {/* <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="https://roadmap.sh/">
            roadmap.sh
          </Link>
        </div>
        <div className={styles.buttons}>

          <Link className="button button--secondary button--lg" to="https://aandds.com/categories.html">
            aandds
          </Link>
        </div>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="https://www.ethereum-ecosystem.com/apps">
            https://www.ethereum-ecosystem.com/apps
          </Link>
        </div> */}
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`Hello from ${siteConfig.title}`} description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>{/* <HomepageFeatures /> */}</main>
    </Layout>
  );
}
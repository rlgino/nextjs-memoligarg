import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Table from './components/table';
import Script from 'next/script';

export default function Home() {
  const tagID = process.env.TAG_ID
  return (
    <div>
      <Head>
        <title>Memoligarg</title>
        <link rel="icon" href="/afaicon.svg" />

        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${tagID}`}></Script>
        <Script>
          {
            `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', '${tagID}');
            `
          }
        </Script>
      </Head>

      <div className={styles.app}>
        <header>
          <div className={styles.title}>Memo Argentinian Football League</div>
        </header>
        <main>
          <Table />
        </main>
      </div>
    </div>
  );
}

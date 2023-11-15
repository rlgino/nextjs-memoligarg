import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Table from './components/table';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Memoligarg</title>
        <link rel="icon" href="/afaicon.svg" />
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

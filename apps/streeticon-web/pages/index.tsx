import Home from "components/home/Home";
import type { NextPage } from "next";
import Head from "next/head";

const HomePage: NextPage = () => {
  return (
    <div className="bg-zinc-50 h-full">
      <Head>
        <title>골목티콘</title>
        <meta name="description" content="골목티콘" />
      </Head>
      <Home />
    </div>
  );
};

export default HomePage;

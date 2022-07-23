import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Streeticon Admin</title>
      </Head>
      <div className="h-full">
        <div className="2xl:container mx-auto px-4 py-8 gap-4 md:gap-8 flex flex-col h-full">
          <div className="flex-1 ">골목티콘 관리자 공지사항</div>
        </div>
      </div>
    </>
  );
};

export default Home;

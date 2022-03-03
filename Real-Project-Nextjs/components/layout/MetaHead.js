import Head from "next/head";

function MetaHead({ title, content }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Head>
    </>
  );
}

export default MetaHead;

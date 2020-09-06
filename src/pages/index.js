import React, { memo } from 'react';
import Head from 'next/head';

const Home = () => {
    return (
        <>
            <Head>Home</Head>
            <div style={{ marginTop: 100, textAlign: 'center' }}>
                <span>home</span>
            </div>
        </>
    );
};

export async function getServerSideProps({}) {
    return {
        props: {},
    };
}

Home.propTypes = {};

export default memo(Home);

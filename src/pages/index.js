import React, { memo } from 'react';

const Home = () => {
    return (
        <>
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

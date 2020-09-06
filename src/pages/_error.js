import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

const ErrorPageStyled = styled.div`
    height: 100vh;
    padding: 0;
    flex-direction: column;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    -webkit-box-align: center;
    -webkit-flex-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
`;

export default function ErrorPage() {
    return (
        <ErrorPageStyled>
            <Head>Đã có lỗi xảy ra</Head>
            <div className="wrapper__page-error">Đã có lỗi xảy ra</div>
        </ErrorPageStyled>
    );
}

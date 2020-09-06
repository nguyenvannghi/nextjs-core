import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

const NotFoundStyled = styled.div`
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
    color: red;
`;

export default function NotFound() {
    return (
        <NotFoundStyled>
            <Head>Trang không tồn tại</Head>
            <div className="wrapper__page-404">Trang không tồn tại</div>
        </NotFoundStyled>
    );
}

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import { DefaultSeo } from 'next-seo';
import SEO from 'configs/next-seo.config';
import { wrapperStore } from 'redux/store';
import * as authService from 'services/authService';
import { ROUTER, ROUTER_SIGN_IN, ROUTER_SIGN_UP } from 'consts/router';
import DefaultLayout from 'components/layout/default';
import LoadingApp from 'components/_base/loadingApp';
import { loadingOpen, loadingClose } from 'components/_base/loadingApp/action';
import { ToastContainer } from 'components/_base/toastBox';
import { appWithTranslation } from 'configs/i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'assets/index.scss';

const theme = {};

function App({ Component, pageProps }) {
    const [isLoading, setLoading] = useState(null);

    const dispatch = useDispatch();

    const getLayout = Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>);

    Router.events.on('routeChangeStart', () => {
        setLoading(true);
    });
    Router.events.on(['routeChangeComplete'], () => {
        setLoading(false);
    });
    Router.events.on('routeChangeError', () => {
        setLoading(false);
    });

    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    useEffect(() => {
        isLoading ? dispatch(loadingOpen()) : dispatch(loadingClose());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    useEffect(() => {
        if (authService.loggedIn() && (Router.router.asPath === ROUTER_SIGN_IN || Router.router.asPath === ROUTER_SIGN_UP)) {
            Router.replace(ROUTER);
        }
    }, []);

    return (
        <>
            <DefaultSeo {...SEO} />
            <ThemeProvider theme={theme}>
                {getLayout(<Component {...pageProps} />)}
                <LoadingApp />
                <ToastContainer />
            </ThemeProvider>
        </>
    );
}

App.propTypes = {
    Component: PropTypes.any,
    pageProps: PropTypes.object,
};

export default wrapperStore.withRedux(appWithTranslation(App));

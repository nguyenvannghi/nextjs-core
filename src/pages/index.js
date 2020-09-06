import React from 'react';
import Head from 'next/head';
import { i18n, useTranslation, withTranslation } from 'utils/i18n';

const Home = () => {
    const { t } = useTranslation();
    return (
        <>
            <Head>Home</Head>
            <div style={{ marginTop: 100, textAlign: 'center' }}>
                <span>{t('home')}</span>
                <button type="button" onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'vi' : 'en')}>
                    {t('change-locale')}
                </button>
            </div>
        </>
    );
};

export async function getServerSideProps() {
    return {
        props: { namespacesRequired: ['common'] },
    };
}

Home.propTypes = {};

export default withTranslation('common')(Home);

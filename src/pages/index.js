import React from 'react';
import { NextSeo } from 'next-seo';
import { i18n, useTranslation, withTranslation } from 'configs/i18n';
import { getLayout } from 'components/layout/default';

const Home = () => {
    const { t } = useTranslation();
    return (
        <>
            <NextSeo title="Title" description="Description" />
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
Home.getLayout = getLayout;

export default withTranslation('common')(Home);

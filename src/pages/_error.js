import React from 'react';
import router from 'next/router';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { useTranslation } from '../../i18n';

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
    .logo {
        margin-top: 2.5rem;
    }
    .wrapper__page-error {
        width: 100%;
        flex-direction: column;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        -webkit-box-align: center;
        -webkit-flex-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
    }
    .inner__page-404 {
        width: 100%;
        max-width: 20.5rem;
        margin: 0 auto;
        flex: 1;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        -webkit-box-align: center;
        -webkit-flex-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        .inner-flex__page-error {
            flex: 1;
            text-align: center;
            > img {
                max-width: 100%;
                margin-bottom: 2.813rem;
            }
            > h3,
            > p {
                font-size: 1rem;
                line-height: var(--px20);
            }
            > h3 {
                font-weight: 500;
                color: var(--ink500);
                margin-top: 0;
            }
            > p {
                color: var(--ink400);
                margin-top: 0.5rem;
            }
            button {
                max-width: 15.5rem;
            }
        }
    }
    @media (max-width: 767px) {
        .logo {
            margin-top: 0.75rem;
        }
    }
`;

export default function ErrorPage() {
    const { t } = useTranslation();
    const onRedirect = () => router.back();
    return (
        <ErrorPageStyled>
            <div className="wrapper__page-error">
                <div className="logo" role="button" onClick={onRedirect}>
                    <span>
                        <img src="/images/logo_VinID.svg" alt="VinTicket" />
                    </span>
                </div>
                <div className="inner__page-404 caption-box">
                    <div className="inner-flex__page-error">
                        <img src="/images/im_192empty_unknown_error.svg" alt="" />
                        <h3 className="text-center">{t('common.unknown_error.title')}</h3>
                        <p className="text-center">{t('common.unknown_error.des')}</p>
                        <Button type="button" variant="default" className="btn-primary-light full-width" onClick={onRedirect}>
                            {t('common.return_home')}
                        </Button>
                    </div>
                </div>
            </div>
        </ErrorPageStyled>
    );
}

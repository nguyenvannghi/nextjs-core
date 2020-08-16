import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import makeSelectLoading from './selector';

const ProgressStyled = styled.div`
    .progress {
        left: 0;
        top: 0;
        background-color: rgba(47, 107, 255, 0.5);
        border-radius: 2px;
        background-clip: padding-box;
        position: fixed;
        overflow: hidden;
        width: 100%;
        height: 4px;
        z-index: 999999;
        .determinate {
            position: absolute;
            background-color: inherit;
            top: 0;
            bottom: 0;
            background-color: var(--blue500);
            transition: width 0.3s linear;
        }
        .indeterminate {
            background-color: var(--blue500);
            &:before {
                content: '';
                position: absolute;
                background-color: inherit;
                top: 0;
                left: 0;
                bottom: 0;
                will-change: left, right;
                -webkit-animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
                animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
            }
            &:after {
                content: '';
                position: absolute;
                background-color: inherit;
                top: 0;
                left: 0;
                bottom: 0;
                will-change: left, right;
                -webkit-animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
                animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
                -webkit-animation-delay: 1.15s;
                animation-delay: 1.15s;
            }
        }
        + .overlay {
            background-color: rgba(0, 0, 0, 0.2);
            background-clip: padding-box;
            position: fixed;
            overflow: hidden;
            z-index: 999999;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    @-webkit-keyframes indeterminate {
        0% {
            left: -35%;
            right: 100%;
        }
        60% {
            left: 100%;
            right: -90%;
        }
        100% {
            left: 100%;
            right: -90%;
        }
    }
    @keyframes indeterminate {
        0% {
            left: -35%;
            right: 100%;
        }
        60% {
            left: 100%;
            right: -90%;
        }
        100% {
            left: 100%;
            right: -90%;
        }
    }

    @keyframes shk1 {
        0% {
            transform: rotate(-360deg);
        }

        100% {
        }
    }

    @keyframes shk2 {
        0% {
            transform: rotate(360deg);
        }
        100% {
        }
    }

    .wrap-progress {
        position: fixed;
        overflow: hidden;
        z-index: 999999;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-clip: padding-box;
    }
`;

const LoadingApp = () => {
    const isLoading = useSelector(makeSelectLoading());

    return (
        isLoading && (
            <ProgressStyled>
                <div className="wrap-progress">
                    <div className="progress">
                        <div className="indeterminate" />
                    </div>
                </div>
            </ProgressStyled>
        )
    );
};

export default memo(LoadingApp);

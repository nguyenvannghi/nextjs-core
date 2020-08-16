import React, { memo, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { render, unmountComponentAtNode } from 'react-dom';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

const ToastBoxStyled = styled.div`
    position: fixed;
    z-index: 9999;
    right: 1.25rem;
    bottom: 1.25rem;
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
    animation: SlideInOutBottom ${(props) => props.trasitionPercentage}s ease-in;
    .alert-box__wrapper {
        padding: 0.875rem 1rem;
        background: var(--ink500);
        box-shadow: 0 0.25rem 0.5rem rgba(1, 18, 34, 0.1);
        border-radius: 0.5rem;
        color: var(--white);
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
        > .content {
            margin-right: 0.875rem;
            p {
                margin-bottom: 0;
                font-size: 0.875rem;
            }
        }
        .action {
            padding-left: 1rem;
            border-left: 0.063rem solid rgba(255, 255, 255, 0.4);
            line-height: var(--px20);
            white-space: nowrap;
            button {
                font-size: 0.875rem;
                color: var(--white);
                font-weight: 500;
                padding: 0;
                background-color: transparent;
                box-shadow: none;
                border: none;
                outline: 0;
            }
        }
    }
    @media (max-width: 991px) {
        .alert-error-box {
            left: 0;
            right: 0;
            bottom: 6.5rem;
        }
    }
    @media (max-width: 767px) {
        .alert-error-box {
            left: 0;
            right: 0;
            bottom: 4rem;
        }
    }
    @keyframes SlideInOutBottom {
        0% {
            transform: translateY(40px);
            opacity: 0;
        }
        ${(props) => props.trasitionPercentage}% {
            transform: translateY(0px);
            opacity: 1;
        }
        ${(props) => 100 - props.trasitionPercentage}% {
            transform: translateY(0px);
            opacity: 1;
        }
        100% {
            transform: translateY(40px);
            opacity: 0;
        }
    }
`;

const ToastBox = memo(({ children, duration, className, onRemove, targetId, transitionPercentage }) => {
    const timeoutRef = useRef(null);

    const remove = useCallback(
        (id) => {
            unmountComponentAtNode(document.getElementById(id));
            if (onRemove) {
                onRemove();
            }
        },
        [onRemove],
    );

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            remove(targetId);
        }, duration * 1000);
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, [duration, targetId, remove]);

    const classes = classNames('alert-error-box', className);
    return (
        <ToastBoxStyled trasitionPercentage={transitionPercentage}>
            <div className={classes}>
                <div className="alert-box__wrapper">{children}</div>
            </div>
        </ToastBoxStyled>
    );
});

ToastBox.propTypes = {
    className: PropTypes.string,
    targetId: PropTypes.string,
    children: PropTypes.node,
    duration: PropTypes.number,
    transitionPercentage: PropTypes.number,
    onRemove: PropTypes.func,
};

const toast = {
    remove: (id) => {
        const comId = id || 'toast-container';
        const doc = document.getElementById(comId);
        if (doc) unmountComponentAtNode(doc);
    },
    // options = {duration, className, targetId}
    notify: (children, options = null, onRemove) => {
        const targetId = options?.targetId || 'toast-container';
        let duration = 5;
        if (!isEmpty(options?.duration)) {
            duration = options?.duration;
        }
        const trasitionPercentage = 0.3 * (100 / duration);
        return render(
            <ToastBox
                className={options?.className || ''}
                targetId={targetId}
                duration={duration}
                onRemove={onRemove}
                transitionPercentage={trasitionPercentage}>
                {children}
            </ToastBox>,
            document.getElementById(targetId),
        );
    },
};

export const ToastContainer = ({ id }) => <div id={id || 'toast-container'} className="toast-container" />;

ToastContainer.propTypes = {
    id: PropTypes.string,
};

export default toast;

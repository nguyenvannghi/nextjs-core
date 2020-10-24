import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as authService from 'services/authService';

const AdminSiteLayout = ({ children }) => {
    useEffect(() => {
        if (authService.getProfile()) {
            //    check logged In
        }
    }, []);

    return (
        <>
            <div className="admin">{children}</div>
        </>
    );
};

export const getLayout = (page) => <AdminSiteLayout>{page}</AdminSiteLayout>;

AdminSiteLayout.propTypes = {
    children: PropTypes.node,
};

export default AdminSiteLayout;

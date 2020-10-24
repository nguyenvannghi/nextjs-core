import PropTypes from 'prop-types';

const SiteLayout = ({ children }) => <div className="default">{children}</div>;

export const getLayout = (page) => <SiteLayout>{page}</SiteLayout>;

SiteLayout.propTypes = {
    children: PropTypes.node,
};

export default SiteLayout;

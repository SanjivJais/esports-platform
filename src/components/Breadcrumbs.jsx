import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiHome2Line } from 'react-icons/ri';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const breadcrumbsList = pathnames.map((pathname, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return {
            name: pathname,
            url: routeTo,
            active: isLast,
        };
    });

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbsList.map((breadcrumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: breadcrumb.name,
            item: breadcrumb.url,
        })),
    };

    return (
        <nav className="breadcrumbs" aria-label="Breadcrumb" role="navigation">
            <ol>
                <li>
                    <Link to="/">
                        <RiHome2Line />
                    </Link>
                </li>
                {breadcrumbsList.map((breadcrumb, index) => (
                    <li key={breadcrumb.url} className={breadcrumb.active ? 'text-primary' : 'text-gray'}>
                        {breadcrumb.active ? (
                            <span>{breadcrumb.name}</span>
                        ) : (
                            <Link to={breadcrumb.url}>{breadcrumb.name}</Link>
                        )}
                    </li>
                ))}
            </ol>
            <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        </nav>
    );
};

export default Breadcrumbs;

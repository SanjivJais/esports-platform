import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdHome } from 'react-icons/md';
import { FaAngleRight } from 'react-icons/fa6';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const breadcrumbsList = pathnames.map((pathname, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return {
            name: `${pathname === 'tournaments' ? 'Tournaments' : pathname === 'freefire' ? 'Free Fire' : pathname === 'pubgmobile' ? 'PUBG Mobile' : pathname === 'announcement' ? 'Announcements' : pathname === 'games' ? 'Games' : pathname === 'feedback' ? 'Feedback' : pathname === 'notifications' ? 'Notifications' : pathname === 'privacy-policy' ? "Privacy Policy" : pathname}`,
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
            <ol className='flex items-center gap-[2px]'>
                <li className='text-inactive hover:text-primary transition-colors duration-200'>
                    <Link to="/">
                        <MdHome />
                    </Link>
                </li>
                {breadcrumbsList.map((breadcrumb, index) => (
                    <li key={breadcrumb.url} className={`${breadcrumb.active ? 'text-offBlue' : 'text-inactive'} flex gap-[2px] items-center`}>
                        <span className='text-inactive text-sm'><FaAngleRight className='text-[12px]' /></span>

                        {breadcrumb.active ? (
                            <span>{breadcrumb.name}</span>
                        ) : (
                            <Link to={breadcrumb.url} className='hover:text-primary transition-colors duration-200'>{breadcrumb.name}</Link>
                        )}
                    </li>
                ))}
            </ol>
            <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        </nav>
    );
};

export default Breadcrumbs;

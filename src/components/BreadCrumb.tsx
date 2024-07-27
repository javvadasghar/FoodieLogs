import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbProps {
  items: { label: string; to?: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-m">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.to ? (
            <Link
              to={item.to}
              className={`text-primary ${index < items.length - 1 ? 'hover:underline' : ''}`}
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-500">{item.label}</span>
          )}
          {index < items.length - 1 && <span className="text-gray-500">/</span>}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;

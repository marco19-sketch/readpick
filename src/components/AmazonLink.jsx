import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { useState, useEffect } from 'react';

const AmazonLink = ({ title, author}) => {
  const { t } = useTranslation();
  const [showLink, setShowLink]  = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLink(true), 4000);
    return () => clearTimeout(timer);
  }, [])

    if (!title || !showLink) return null;

    const generateAmazonLink = (title, author) => {
        const baseUrl = 'https://www.amazon.it/s';
        const query = encodeURIComponent(`${title} ${author || ''}`);
        const tag = "bookfinderita-21 ";
        return `${baseUrl}?k=${query}&tag=${tag}`;
    };

    const link = generateAmazonLink(title, author);
    
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="amazon-buy-link"
        onClick={() => {
          console.log("Clicked the Amazon link for:", title, '\nlink url', link);
        }}>
        🔗 {t('buyOnAmazon')}
      </a>
    );
};

AmazonLink.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string
};

export default AmazonLink;
// Footer.tsx
import React from 'react';
import {
    competitionLegalStuff,
    websiteTermsOfUse,
    websitePrivacyPolicy,
} from '@/lib/constants';

const Footer = () => {
    return (
        <footer className="w-full bg-gray-100 py-4 flex justify-center items-center">
            <a
                href={competitionLegalStuff}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-800 mx-2 text-xs"
            >
                Competition Legal Terms
            </a>
            |
            <a
                href={websiteTermsOfUse}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-800 mx-2 text-xs"
            >
                Website Terms of Use
            </a>
            |
            <a
                href={websitePrivacyPolicy}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-800 mx-2 text-xs"
            >
                Website Privacy Policy
            </a>
        </footer>
    );
};

export default Footer;

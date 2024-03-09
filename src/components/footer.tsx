// Footer.tsx
import React from 'react';
import {
    competitionLegalStuff,
    websiteTermsOfUse,
    websitePrivacyPolicy,
} from '@/lib/constants';

const Footer = () => {
    return (
        <footer className="w-full border-t-2 border-black py-4 flex justify-center items-center">

            <a
                href={competitionLegalStuff}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-800 mx-2 text-xs"
            >
                Legal Terms
            </a>
            |
            <a
                href={websiteTermsOfUse}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-800 mx-2 text-xs"
            >
                Terms of Use
            </a>
            |
            <a
                href={websitePrivacyPolicy}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-800 mx-2 text-xs"
            >
                Privacy Policy
            </a>
            |
            <a
                href="mailto:contact@campusflavor.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-800 mx-2 text-xs"
            >
                Contact Us
            </a>
        </footer>
    );
};

export default Footer;

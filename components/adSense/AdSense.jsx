"use client";
import Script from "next/script";

const pId = process.env.ADSENSE_PUBLISHER_ID

const AdSense = () => {
    return (
        <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    );
}
export default AdSense
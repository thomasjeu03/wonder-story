"use client";
import Script from "next/script";

const AdSense = () => {
    return (
        <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9229130087883846`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    );
}
export default AdSense
"use client";
import {useEffect} from "react";

const pId = process.env.ADSENSE_PUBLISHER_ID

const AdBanner = ({
  dataAdSlot,
  dataAdFormat,
  dataFullWidthResponsive,
}) => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({})
        } catch (error) {
            console.log(error.message)
        }
    }, [])

    return (
        <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client={pId}
            data-ad-slot={dataAdSlot}
            data-ad-format={dataAdFormat}
            data-full-width-responsive={dataFullWidthResponsive.toString()}
        ></ins>
    );
};

export default AdBanner
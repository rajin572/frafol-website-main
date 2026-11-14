import PaymentSuccess from "@/components/shared/PaymentSuccess";
import React from "react";
import { NOINDEX_METADATA } from "@/lib/seo/site";

export const metadata = NOINDEX_METADATA;

const page = () => {
    return (
        <div>
            <PaymentSuccess />
        </div>
    );
};

export default page;
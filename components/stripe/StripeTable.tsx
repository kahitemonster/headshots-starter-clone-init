'use client'
import { User } from '@supabase/supabase-js';
import React, { useEffect } from 'react';
import Link from "next/link";

interface StripePricingTableProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  'pricing-table-id': string;
  'publishable-key': string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': StripePricingTableProps;
    }
  }
}

type Props = {
  user: User;
}

const StripePricingTable = ({ user }: Props) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <div className='flex flex-col flex-1 w-full mt-[80px] pt-[20px] pb-[20px] bg-[#010e10]'>
      {/* <stripe-pricing-table 
        pricing-table-id="prctbl_1OMYOvJpDi0MVrf4GwPAZ1nr"
        publishable-key="pk_test_WgiMULhkhplj8FDcxuplnXYp00tQzUNfwf"
        client-reference-id={user.id}
        customer-email={user.email}
        >
      </stripe-pricing-table> */}
      <stripe-pricing-table pricing-table-id="prctbl_1P2FhMJpDi0MVrf4sOUh58qQ"
        publishable-key="pk_live_PRxgVoIwpr0c7rNHIwKj9Gas00mh4nSlCf"
        client-reference-id={user.id}
      >
      </stripe-pricing-table>
    </div>
  );
}

export default StripePricingTable;

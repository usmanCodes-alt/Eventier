import React from "react";

import Header from "../admin-header/Header";
import AdminServiceProvidersList from "../admin-block-account/AdminServiceProviders";

export default function Home() {
  return (
    <div>
      <Header />
      <AdminServiceProvidersList />
    </div>
  );
}

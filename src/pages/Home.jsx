import React, { useState, useEffect } from "react";

function Home() {
  return (
    <div className="m-6 flex flex-col space-y-6">
      <h className="text-3xl font-bold">E-Tax</h>
      <p className="w-1/2 text-justify">
        Aplikasi kami mengotomatisasi proses pembuatan dan pengiriman lembar
        pajak melalui email, memudahkan pengelolaan pajak bagi individu dan
        perusahaan. Dengan mengumpulkan data, menghitung pajak sesuai peraturan,
        dan menghasilkan lembar pajak yang akurat, aplikasi ini menghemat waktu
        dan mengurangi risiko kesalahan.
      </p>
      <p className="w-1/2 text-justify">
        Keamanan data terjamin, serta dokumen pajak dikelola secara digital
        untuk akses mudah dan transparansi. Aplikasi ini memastikan kepatuhan
        pajak yang terus-menerus dengan fitur pembaruan regulasi otomatis,
        memberikan solusi efisien dan handal untuk semua kebutuhan pengelolaan
        pajak Anda.
      </p>
    </div>
  );
}

export default Home;

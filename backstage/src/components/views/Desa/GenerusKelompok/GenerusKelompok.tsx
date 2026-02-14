"use client";

import React from "react";
import { Tab, Tabs } from "@heroui/react";
import Mumi from "./Mumi/Mumi";
import Caberawit from "./Caberawit/Caberawit";
import Mahasiswa from "./Mahasiswa/Mahasiswa";

const GenerusKelompok = () => {
  return (
    <Tabs aria-label="Options" variant="underlined">
      <Tab key="mumi" title="Muda - Mudi">
        <Mumi />
      </Tab>
      <Tab key="caberawit" title="Caberawit">
        <Caberawit />
      </Tab>
      <Tab key="mahasiswa" title="Mahasiswa">
        <Mahasiswa />
      </Tab>
    </Tabs>
  );
};

export default GenerusKelompok;

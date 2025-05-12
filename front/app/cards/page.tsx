"use client";
import React, { Component, useEffect, useState } from "react";
import { useCards } from "@/context/CardsContext";
import Image from "next/image";
import Filter from "@/components/Filters";
import Loading from "@/components/Loading";
import Link from "next/link";
import FilterModal from "@/components/FilterModal";
import CardsGrid from "@/components/CardsGrid";

const getShadowClass = (elementName: string) => {
  switch (elementName) {
    case "Végétal":
      return "group-hover:shadow-[0px_0px_8px_3px_#61c02c]";
    case "Eau":
      return "group-hover:shadow-[0px_0px_8px_3px_#388ecc]";
    case "Feu":
      return "group-hover:shadow-[0px_0px_8px_3px_#cc2f24]";
    case "Minéral":
      return "group-hover:shadow-[0px_0px_8px_3px_#9c8f78]";
    case "Air":
      return "group-hover:shadow-[0px_0px_8px_3px_#c4d6f0]";
    case "Arcane":
      return "group-hover:shadow-[0px_0px_8px_3px_#9a459f]";
    default:
      return "group-hover:shadow-[0px_0px_8px_3px_#bbbbbb]";
  }
};

const CardsPage: React.FC = () => {
  const {
    cards,
    loading,
    activeFilters,
    manaCostSliders,
    hpSlider,
    sortBy,
    sortOrders,
    activeComponentNameFilters,
  } = useCards();

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col h-full">
      <CardsGrid
        cards={cards}
        showInspectButton={false}
        gridClassName="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      />
      <FilterModal id="filter_modal"></FilterModal>
    </div>
  );
};

export default CardsPage;

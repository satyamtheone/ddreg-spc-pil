"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";

// Mock data for select options
const mockData = {
  countries: [
    { value: "all", label: "All Countries" },
    { value: "usa", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "germany", label: "Germany" },
    { value: "france", label: "France" },
    { value: "japan", label: "Japan" },
  ],
  regulatoryAuthorities: [
    { value: "all", label: "All Authorities" },
    { value: "ema", label: "EMA" },
    { value: "who", label: "WHO" },
    { value: "sfda", label: "SFDA" },
  ],
  documentTypes: [
    { value: "all", label: "All Types" },
    { value: "spc", label: "SPC" },
    { value: "pil", label: "PIL" },
  ],
};

export const SearchDocument: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedAuthority, setSelectedAuthority] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [countrySearch, setCountrySearch] = useState("");
  const [authoritySearch, setAuthoritySearch] = useState("");
  const [typeSearch, setTypeSearch] = useState("");

  const handleSearch = () => {
    console.log("Search parameters:", {
      query: searchQuery,
      country: selectedCountry,
      authority: selectedAuthority,
      type: selectedType,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Filter select options based on search query
  const filteredCountries = mockData.countries.filter((country) =>
    country.label.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const filteredAuthorities = mockData.regulatoryAuthorities.filter((authority) =>
    authority.label.toLowerCase().includes(authoritySearch.toLowerCase())
  );

  const filteredTypes = mockData.documentTypes.filter((type) =>
    type.label.toLowerCase().includes(typeSearch.toLowerCase())
  );

  return (
    <div className="w-full bg-gradient flex flex-col py-7 px-5.5 text-white rounded-lg">
      <h1 className="text-2xl font-semibold mb-2">Search Document</h1>
      <p className="mb-6">Find the SPC or PIL document for your product</p>
      <div className="flex flex-wrap gap-3 items-end">
        {/* Search Input */}
        <div className="flex-1 min-w-62.5 relative">
          <Input
            type="text"
            placeholder="Search by product name, active ingredient, or document number..."
            className="w-full px-2 py-5.5 rounded-lg dark:text-gray-800 placeholder:text-white text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 rounded-md transition-colors hover:bg-transparent cursor-pointer"
            aria-label="Search"
          >
            <Image
              src="/search-document/Icon-01.svg"
              alt="Search"
              width={20}
              height={20}
              className="hover:opacity-80 transition-opacity"
            />
          </Button>
        </div>

        {/* Country Select */}
        <div className="min-w-37.5">
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-full [&_svg]:text-white py-5.5">
              <SelectValue placeholder="All Countries" />
            </SelectTrigger>
            <SelectContent position="popper" side="bottom" className="w-(--radix-select-trigger-width)">
              <Input
                type="text"
                placeholder="Search countries..."
                className="mb-2"
                value={countrySearch}
                onChange={(e) => setCountrySearch(e.target.value)}
              />
              {filteredCountries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Regulatory Authority Select */}
        <div className="min-w-37.5">
          <Select
            value={selectedAuthority}
            onValueChange={setSelectedAuthority}
          >
            <SelectTrigger className="w-full [&_svg]:text-white py-5.5">
              <SelectValue placeholder="All Authorities" />
            </SelectTrigger>
            <SelectContent position="popper" side="bottom" className="w-(--radix-select-trigger-width)">
              <Input
                type="text"
                placeholder="Search authorities..."
                className="mb-2"
                value={authoritySearch}
                onChange={(e) => setAuthoritySearch(e.target.value)}
              />
              {filteredAuthorities.map((authority) => (
                <SelectItem key={authority.value} value={authority.value}>
                  {authority.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Document Type Select */}
        <div className="min-w-37.5">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full [&_svg]:text-white py-5.5">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent position="popper" side="bottom" className="w-(--radix-select-trigger-width)">
              <Input
                type="text"
                placeholder="Search types..."
                className="mb-2"
                value={typeSearch}
                onChange={(e) => setTypeSearch(e.target.value)}
              />
              {filteredTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

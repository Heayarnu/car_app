'use client';

import React, { useState } from 'react';
import SearchManufacturer from './SearchManufacturer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`z-10 ${otherClasses}`}>
    <Image
      src="/magnifying-glass.svg"
      alt="magnifying glass"
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
);

const SearcBar = () => {
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (manufacturer === '' && model === '') {
      return alert('Please enter a manufacturer and model');
    }

    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
  };

  const updateSearchParams = (model: string, manufacturer: string) => {
    let searchParams = new URLSearchParams();

    if (manufacturer) {
      searchParams.set('manufacturer', manufacturer);
      setModel('');
    }

    if (searchParams.has('manufacturer') && model) {
      searchParams.set('model', model);
    }

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathname, { scroll: false });
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item flex items-center">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>

      <div className="searchbar__item flex items-center relative">
        <Image
          src="/model-icon.png"
          alt="car model"
          width={25}
          height={25}
          className="absolute left-4 h-[20px]"
        />

        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Model"
          className="searchbar__input pl-8" // Added padding-left to avoid overlap with the image
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>

      <div>
        <SearchButton otherClasses="max-sm:hidden" />
      </div>
    </form>
  );
};

export default SearcBar;

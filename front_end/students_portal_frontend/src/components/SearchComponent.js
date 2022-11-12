import React from "react";

const SearchComponent = () => {
  return (
    <>
      <form>
        <label
          for='default-search'
          class='mb-2 text-sm font-medium text-white sr-only '>
          Search
        </label>
        <div class='relative w-4/4 pr-3'>
          <div class='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
            <svg
              aria-hidden='true'
              class='w-5 h-5 text-gray'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
            </svg>
          </div>
          <input
            type='search'
            id='default-search'
            class='block p-4 pl-10 w-full text-sm text-secondary font-bold bg-lightgray rounded-lg border outline outline-lightgray outline-1 h-[35px] border-gray border-opacity-20'
            placeholder='Search'
            required=''
          />
          {/* <button
            type='submit'
            class='text-blue absolute right-2.5 bottom-2.5 bg-blue- hover:bg-blue focus:ring-4 focus:outline-none focus:ring-blue font-medium rounded-lg text-sm px-4 py-2'>
            Search
          </button> */}
        </div>
      </form>
    </>
  );
};

export default SearchComponent;

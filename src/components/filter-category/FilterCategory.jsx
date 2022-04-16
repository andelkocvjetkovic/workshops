import FilterCategoryMobile from '@app/components/filter-category/mobile/FilterCategoryMobile';
import FilterCategoryDesktop from '@app/components/filter-category/desktop/FilterCategoryDesktop';
import { FILTERS } from '@app/components/filter-category/utils/Filter';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

function FilterCategory() {
  const [activeFilter, setActiveFilter] = useState(FILTERS.ALL);
  let [, setSearchParams] = useSearchParams();

  const handleClick = newActiveFilter => {
    setActiveFilter(newActiveFilter);
    setSearchParams({
      category: activeFilter,
    });
  };

  //using display:none for show/hide proper component, for xs and sm Mob but for md and bigger show Desktop
  return (
    <>
      <FilterCategoryMobile activeFilter={activeFilter} onClick={handleClick} />
      <FilterCategoryDesktop activeFilter={activeFilter} onClick={handleClick} />
    </>
  );
}

export default FilterCategory;

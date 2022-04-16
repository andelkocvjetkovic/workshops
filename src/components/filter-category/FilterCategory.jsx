import FilterCategoryMobile from '@app/components/filter-category/mobile/FilterCategoryMobile';
import FilterCategoryDesktop from '@app/components/filter-category/desktop/FilterCategoryDesktop';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWorkshopActiveFilter } from '@app/store/reducers/workshopSlice';

function FilterCategory() {
  const initialActiveFilter = useSelector(selectWorkshopActiveFilter);
  const [activeFilter, setActiveFilter] = useState(() => initialActiveFilter);
  let [, setSearchParams] = useSearchParams();

  const handleClick = newActiveFilter => {
    setActiveFilter(newActiveFilter);
    setSearchParams({
      category: newActiveFilter,
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

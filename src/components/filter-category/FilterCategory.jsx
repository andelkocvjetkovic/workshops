import FilterCategoryMobile from '@app/components/filter-category/mobile/FilterCategoryMobile';
import FilterCategoryDesktop from '@app/components/filter-category/desktop/FilterCategoryDesktop';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { FILTERS } from '@app/utils/types';
import Maybe from 'folktale/maybe';
const { Just, Nothing } = Maybe;

function FilterCategory() {
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  // activeFilter :: String -> Maybe Category
  const activeFilter = useMemo(() => (Object.values(FILTERS).includes(category) ? Just(category) : Nothing()), [category]);
  const handleClick = newActiveFilter => {
    setSearchParams({
      category: newActiveFilter,
    });
  };

  //using display:none for show/hide proper component, for xs and sm Mob but for md and bigger show Desktop
  return (
    <>
      <FilterCategoryMobile activeFilter={activeFilter.getOrElse(FILTERS.ALL)} onClick={handleClick} />
      <FilterCategoryDesktop activeFilter={activeFilter.getOrElse(FILTERS.ALL)} onClick={handleClick} />
    </>
  );
}

export default FilterCategory;

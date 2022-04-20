import FilterCategoryMobile from '@app/components/filter-category/mobile/FilterCategoryMobile';
import FilterCategoryDesktop from '@app/components/filter-category/desktop/FilterCategoryDesktop';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectWorkshopActiveFilter } from '@app/store/reducers/workshopListSlice';
import { ACTION_WORKSHOP_SET_ACTIVE_FILTER } from '@app/store/storeActions';
import { SAGA_WORKSHOPS_SET } from '@app/store/sagaActions';

function FilterCategory() {
  const activeFilter = useSelector(selectWorkshopActiveFilter);
  const dispatch = useDispatch();
  let [, setSearchParams] = useSearchParams();

  const handleClick = newActiveFilter => {
    dispatch({ type: ACTION_WORKSHOP_SET_ACTIVE_FILTER, payload: newActiveFilter });
    setSearchParams({
      category: newActiveFilter,
    });
    dispatch({ type: SAGA_WORKSHOPS_SET });
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

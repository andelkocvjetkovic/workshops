import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ACTION_WORKSHOP_SET_ACTIVE_FILTER } from '@app/store/storeActions';
import { SAGA_WORKSHOPS_SET } from '@app/store/sagaActions';

export default function useWorkshopFilterCategoryChange() {
  const dispatch = useDispatch();
  let [searchParams] = useSearchParams();
  const activeFilterCategory = searchParams.get('category');

  useEffect(() => {
    if (activeFilterCategory != null) {
      dispatch({ type: ACTION_WORKSHOP_SET_ACTIVE_FILTER, payload: activeFilterCategory });
    }
    dispatch({ type: SAGA_WORKSHOPS_SET });
  }, [activeFilterCategory, dispatch]);
}

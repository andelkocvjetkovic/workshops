import Result from 'folktale/result';

// tryAsync ::  (a -> b) -> Promise Result (Error, Ok b)
export const tryAsync = async f => {
  try {
    const asyncRes = await f();
    return Result.Ok(asyncRes);
  } catch (e) {
    return Result.Error(e);
  }
};

import Result from 'folktale/result';

// tryAsync ::  (_ -> a) -> Promise Result (Error e, Ok a)
export const tryAsync = async f => {
  try {
    const asyncRes = await f();
    return Result.Ok(asyncRes);
  } catch (e) {
    return Result.Error(e);
  }
};

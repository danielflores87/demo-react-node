
export function getErrorMessage(errors, idInput): string | null {
  const keysError = idInput.split(".");
  let errs = errors;

  if (keysError.length > 1) {
    const errorKey = `${keysError[0]}[${keysError[1]}].${keysError[2]}`;
    return errors[errorKey]?.message;
  } else {
    for (let key of keysError) {
      errs = errs?.[key];
      if (!errs) {
        break;
      }
    }
    return errs?.message ?? null;
  }
}

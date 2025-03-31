export function addToLocalStorage(key, value, limit = 200) {
  let storedTermsArray = JSON.parse(localStorage.getItem(key) || "[]");

  const isAlreadyStored = storedTermsArray.includes(value);
  if (isAlreadyStored) {
    storedTermsArray = storedTermsArray.filter(
      (itemSearchString) => itemSearchString !== value,
    );
    storedTermsArray.push(value);
  } else {
    storedTermsArray.push(value);
    if (storedTermsArray.length > limit) {
      storedTermsArray = storedTermsArray.slice(
        storedTermsArray.length - limit,
      );
    }
  }

  localStorage.setItem(key, JSON.stringify(storedTermsArray));

  const event = new Event("localStorageChanged");
  event.key = key;
  event.value = JSON.stringify(storedTermsArray);
  window.dispatchEvent(event);
}

export function removeFromLocalStorage(key, value) {
  let storedTermsArray = JSON.parse(localStorage.getItem(key) || "[]");

  storedTermsArray = storedTermsArray.filter(
    (itemSearchString) => itemSearchString !== value,
  );
  localStorage.setItem(key, JSON.stringify(storedTermsArray));

  const event = new Event("localStorageChanged");
  event.key = key;
  event.value = JSON.stringify(storedTermsArray);
  window.dispatchEvent(event);
}

export function getFromLocalStorage(key) {
  let storedTermsArray = JSON.parse(
    localStorage.getItem(key) || "[]",
  ).reverse();
  return storedTermsArray;
}

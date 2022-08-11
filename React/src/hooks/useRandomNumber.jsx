import { useState, useEffect } from "react";

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const useRandomNumber = (fromNumber, toNumber) => {
  const [randNumber, setRandNumber] = useState(fromNumber);
  useEffect(() => {
    setRandNumber(getRandomIntInclusive(fromNumber, toNumber));
  }, [fromNumber, toNumber]);
  return randNumber;
};

export default useRandomNumber;

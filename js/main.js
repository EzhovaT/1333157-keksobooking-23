const randomNumber = (firstNumber, lastNumber) => {
  if (firstNumber < 0 || lastNumber < 0 || lastNumber <= firstNumber) {
    return 'Ошибка';
  } else {
    return (
      Math.floor(Math.random() * (lastNumber - firstNumber + 1)) + firstNumber
    );
  }
};

randomNumber(1, 8);

const getRandomCoordinates = (firstNumber, lastNumber, decimalPlaces) => {
  if (firstNumber < 0 || lastNumber < 0 || lastNumber <= firstNumber) {
    return 'Ошибка';
  } else {
    const count = Math.random() * (lastNumber - firstNumber + 1) + firstNumber;
    return count.toFixed(decimalPlaces);
  }
};

getRandomCoordinates(2, 8, 2);

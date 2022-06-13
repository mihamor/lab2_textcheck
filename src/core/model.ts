
type Dict = {
  [symbol: string]: number,
};

export class TextModel {
  trainDict: Dict;

  constructor (trainText: string) {
    this.trainDict = TextModel.createDict(trainText);
  }

  static createDict(text: string) {
    const aplhaString = text
      .replaceAll(/\W/g, '')
      .toLowerCase();


    const wordList = aplhaString.split(' ');
    const trainDict: Dict = {};
    wordList.forEach((word) => (
      TextModel.fillDict(trainDict, word)
    ));
    console.log(trainDict);
    return trainDict;
  }

  static fillDict(dict: Dict, word: string) {
    word.split('').forEach((curr, index) => {
      if (!index) return;
      const prev = word[index - 1];
        const combination = `${prev}${curr}`;
        TextModel.addValueToDict(dict, combination);
    });
  }

  static addValueToDict(dict: Dict, combination: string) {
    dict[combination] = (dict[combination] || 0) + 1;
  }

  static evaluateNumOfSymbols(sentence: string) {
    const aplhaString = sentence
      .replaceAll(/\W/g, '')
      .toLowerCase();
    console.log(aplhaString);
    const wordList = aplhaString.split(' ');
    return wordList
      .reduce((acc, word) => word.length > 1 ? acc + word.length : acc, 0);
    // const dict = TextModel.createDict(sentence);
    // return Object.keys(dict).length;
  }

  
  public evaluateSentence(sentence: string) {
    const numOfSymbols = TextModel.evaluateNumOfSymbols(sentence);
    if (numOfSymbols < 2) return 0;
    const tempDict = TextModel.createDict(sentence);
    console.log(tempDict);
    const result = Object.keys(tempDict).reduce((acc, combination) => {
      const tempValue = this.trainDict[combination] || 1;
      const res = acc * Math.pow(tempValue, tempDict[combination]);
      return res;
    }, 1);
    const normalResult = Math.pow(result, 1 / (numOfSymbols - 1));
    return normalResult;
  }

}
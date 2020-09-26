// stentence reverser
//take in an string and return out an object with the reversed sentence and the original sentence

const mySentence = 'Welcome to this Javascript Guide!'

const sentenceWalker = (
  sentenceToReverse: string
): { originalString: string; reversedString: string; temp?: any } => {
  console.log('hello from sentenceWalker')

  // - Step 1. convert sentence to list
  const convertSentenceToList = (initialString: string): string[] => {
    const listedString = initialString.split(' ')
    return listedString
  }

  const myList = convertSentenceToList(sentenceToReverse)
  //   console.log(JSON.stringify(myList, null, 2))

  // ✅ Step 1 completed!

  // - create wordcatcher
  const wordCatcher = (currentWord: string): string => {
    // console.log(currentWord)
    // list the word up!
    const listedWord = currentWord.split('')
    const reverseList = listedWord.reverse()
    const reversedWord = reverseList.join('')
    // console.log(reversedWord)
    return reversedWord
  }

  const tempSolution: string[] = []
  // - iterate over the list and send the currend word to a a function
  for (let i = 0; i < myList.length; i++) {
    tempSolution.push(wordCatcher(myList[i]))
  }

  return {
    originalString: sentenceToReverse,
    reversedString: sentenceToReverse,
    temp: tempSolution.join(' '),
  }
}

const solution = sentenceWalker(mySentence)

console.log(JSON.stringify(solution.temp, null, 2))

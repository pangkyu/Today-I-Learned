/**
 *  23.01.08
 *  0.11ms~0.54ms / 33.4MB ~ 33.7MB
 */

function solution(survey, choices) {
  let result = "";
  const choicesGrade = {
    1: 3,
    2: 2,
    3: 1,
    4: 0,
    5: 1,
    6: 2,
    7: 3,
  };
  const personalityType = {
    R: 0,
    T: 0,
    C: 0,
    F: 0,
    J: 0,
    M: 0,
    A: 0,
    N: 0,
  };
  let convertChoices = [];

  choices.map((item) => {
    convertChoices.push(choicesGrade[item]);
  });

  for (let i = 0; i < survey.length; i++) {
    let splitSurvey = survey[i].split("");

    if (choices[i] >= 5) {
      personalityType[splitSurvey[1]] += choicesGrade[choices[i]];
    }

    if (3 >= choices[i]) {
      personalityType[splitSurvey[0]] += choicesGrade[choices[i]];
    }
  }

  personalityType["T"] > personalityType["R"]
    ? (result += "T")
    : (result += "R");
  personalityType["F"] > personalityType["C"]
    ? (result += "F")
    : (result += "C");
  personalityType["M"] > personalityType["J"]
    ? (result += "M")
    : (result += "J");
  personalityType["N"] > personalityType["A"]
    ? (result += "N")
    : (result += "A");

  return result;
}

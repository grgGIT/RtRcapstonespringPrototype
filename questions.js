
// Question model
const Questions = {
    era: { // Era of the question
        radioEra: { // Radio era
            easy: {
                q1: {
                    question: "What is the name of the radio game show?",
                    options: [choiceA = "Professor Quiz", choiceB = "The Quiz Show", choiceC = "The Game Show", choiceD = "The Radio Show"],
                    correctAnswer: choiceA,
                    points: 10,
                    aiHint, // AI hint, reach out to the AI to create a clue for the question
                    image: "", // Image for the question (if any)
                },

                q2: {
                    question: "When did the first radio quiz show air?",
                    options: [choiceA = "1920", choiceB = "1930", choiceC = "1940", choiceD = "1950"],
                    correctAnswer: choiceA,
                    points: 10,
                    aiHint,
                    image: ""
                },
                q3: {
                    question: "What was the first commercial product aired on the radio?",
                    options: [choiceA = "Automobile", choiceB = "Housing", choiceC = "Clothing", choiceD = "Biscuits"],
                    correctAnswer: choiceB,
                    points: 10,
                    aiHint,
                    image: ""
                },
                q4: {
                    question: "What is the name of the NBC theme sound that first showed up on the radio in 1929 and is still used today?",
                    options: [choiceA = "Three Chords", choiceB = "Four Chords", choiceC = "Four Chimes", choiceD = "Three Chimes"],
                    correctAnswer: choiceD,
                    points: 10,
                    aiHint,
                    image: ""
                },
                q5: {
                    question: "When did the first radio quiz show air?",
                    options: [choiceA = "1920", choiceB = "1930", choiceC = "1940", choiceD = "1950"],
                    correctAnswer: choiceA,
                    points: 10,
                    aiHint,
                    image: ""
                },
                q6: {
                    question: "When did the first AM radio broadcast air?",
                    options: [choiceA = "1909", choiceB = "1913", choiceC = "1886", choiceD = "1900"],
                    correctAnswer: choiceA,
                    points: 10,
                    aiHint,
                    image: ""
                },
                q7: {
                    question: "What was the first commercial radio station called?",
                    options: [choiceA = "RNBC", choiceB = "WQHZ", choiceC = "HGCB", choiceD = "KDKA"],
                    correctAnswer: choiceD,
                    points: 10,
                    aiHint,
                    image: ""
                },
                q8: {
                    question: "Which company developed the first radio network",
                    options: [choiceA = "AT&T", choiceB = "Verizon", choiceC = "Motorola", choiceD = "Bell&Howell"],
                    correctAnswer: choiceA,
                    points: 10,
                    aiHint,
                    image: ""
                },
                q9: {
                    question: "Which innovator created signals and transmissions through radio?",
                    options: [choiceA = "Nikola Tesla", choiceB = "Berghartt Radiola", choiceC = "Heinrich Hertz", choiceD = "James Watt"],
                    correctAnswer: choiceC,
                    points: 10,
                    aiHint,
                    image: ""
                },
                q10: {
                    question: "Where does the term 'Broadcasting' come from?",
                    options: [choiceA = "Theatre", choiceB = "Factories", choiceC = "Agriculture", choiceD = "Policing"],
                    correctAnswer: choiceC,
                    points: 10,
                    aiHint,
                    image: ""
                },
            }, // EASY END

            medium: {
                q1: {
                    points: 15, // points increase to 15
                },
                q2: {},
                q3: {},
                q4: {},
                q5: {},
                q6: {},
                q7: {},
                q8: {},
                q9: {},
                q10: {},
            }, // MEDIUM END
            hard: {
                q1: {
                    points: 25, // points increase to 25
                },
                q2: {},
                q3: {},
                q4: {},
                q5: {},
                q6: {},
                q7: {},
                q8: {},
                q9: {},
                q10: {},
            }, // HARD END

        }, // RADIO ERA END

        seventiesEra: {
            easy: {
                q1: {},
                q2: {},
                q3: {},
                q4: {},
                q5: {},
                q6: {},
                q7: {},
                q8: {},
                q9: {},
                q10: {},
            }, // EASY END
            medium: {
                q1: {},
                q2: {},
                q3: {},
                q4: {},
                q5: {},
                q6: {},
                q7: {},
                q8: {},
                q9: {},
                q10: {},
            }, // MEDIUM END
            hard: {
                q1: {},
                q2: {},
                q3: {},
                q4: {},
                q5: {},
                q6: {},
                q7: {},
                q8: {},
                q9: {},
                q10: {},
            }, // HARD END
        }, // SEVENTIES ERA END

        eightiesEra: {
            easy: {
                q1: {},
                q2: {},
                q3: {},
                q4: {},
                q5: {},
                q6: {},
                q7: {},
                q8: {},
                q9: {},
                q10: {},
            }, // EASY END
            medium: {
                q1: {},
                q2: {},
                q3: {},
                q4: {},
                q5: {},
                q6: {},
                q7: {},
                q8: {},
                q9: {},
                q10: {},
            },
            hard: {
                q1: {},
                q2: {},
                q3: {},
                q4: {},
                q5: {},
                q6: {},
                q7: {},
                q8: {},
                q9: {},
                q10: {},
            },
        }, // EIGHTIES ERA END

        ninetiesEra: {
            easy: {
                q1: {},
                q2: {},
                q3: {},
                q4: {},
                q5: {},
                q6: {},
                q7: {},
                q8: {},
                q9: {},
                q10: {},
            },
            medium: {
                q1: {},
                q2: {},
                q3: {},
                q4: {},
                q5: {},
                q6: {},
                q7: {},
                q8: {},
                q9: {},
                q10: {},
            },
            hard: {
                q1: {},
                q2: {},
                q3: {},
                q4: {},
                q5: {},
                q6: {},
                q7: {},
                q8: {},
                q9: {},
                q10: {},
            },
        }, // NINETIES ERA END

        modernEra: {
            easy: {
                q1: {},
                q2: {},
                q3: {},
                q4: {},
                q5: {},
                q6: {},
                q7: {},
                q8: {},
                q9: {},
                q10: {},
            },
            medium: {
                q1: {},
                q2: {},
                q3: {},
                q4: {},
                q5: {},
                q6: {},
                q7: {},
                q8: {},
                q9: {},
                q10: {},
            },
            hard: {
                q1: {},
                q2: {},
                q3: {},
                q4: {},
                q5: {},
                q6: {},
                q7: {},
                q8: {},
                q9: {},
                q10: {},
            },
        }, // MODERN ERA END
    }, // ERA END
}; // QUESTIONS END

export default Questions; // Export the Questions model

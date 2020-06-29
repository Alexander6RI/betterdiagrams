const TEXT_FLOAT = 4; // text off of line
const BUFFER_V = 24; // vertical
const BUFFER_H = 12; // horizontal
const BUFFER_D = 32; // diagonal
const TEXT_HEIGHT = 22; // text height

const NORMAL_COLOR = "#000000";
const HIGHLIGHT_COLOR = "#17cbe9";
const BOUNDING_COLOR = "#FF0000";
const NORMAL_BACKGROUND = "#FFFFFF";
const HIGHLIGHT_BACKGROUND = "#F0FFFF";
const FONT = "18px Arial";

const NOUN_WORDS = [
	"serendipity",
	"gobbledygook",
	"halfpace",
	"quire",
	"yarborough",
	"winklepicker",
	"kakorrhaphiophobia",
	"genipap",
	"futhorc",
	"witenagemot",
	"chaulmoogra",
	"chersonese",
	"cacomistle",
	"yogh",
	"yataghan",
	"dasyure",
	"simoom",
	"stibnite",
	"didapper"
]


const EXAMPLE_1 = {
  "items": [
    {
      "content": "guide",
      "type": "object",
      "variant": "noun",
      "connected": [
        [
          {
            "content": "The",
            "type": "modifier",
            "variant": "adjective",
            "connected": [
              [],
              []
            ]
          }
        ]
      ]
    },
    {
      "content": "pointed",
      "type": "object",
      "variant": "verb",
      "connected": [
        [
          {
            "content": "to",
            "type": "modifier",
            "variant": "adjective",
            "connected": [
              [
                {
                  "content": "picture",
                  "type": "object",
                  "variant": "noun",
                  "connected": [
                    [
                      {
                        "content": "the",
                        "type": "modifier",
                        "variant": "adjective",
                        "connected": [
                          [],
                          []
                        ]
                      }
                    ]
                  ]
                }
              ],
              []
            ]
          }
        ]
      ]
    }
  ],
  "versionString": "1.0.1"
}

const EXAMPLE_2 = {
  "items": [
    {
      "content": "",
      "type": "object_clause",
      "variant": "noun_clause",
      "connected": [
        [
          {
            "content": "Whoever",
            "type": "object",
            "variant": "noun",
            "connected": [
              []
            ]
          },
          {
            "content": "wins",
            "type": "object",
            "variant": "verb",
            "connected": [
              []
            ]
          },
          {
            "content": "contest",
            "type": "object",
            "variant": "direct_object",
            "connected": [
              [
                {
                  "content": "the",
                  "type": "modifier",
                  "variant": "adjective",
                  "connected": [
                    [],
                    []
                  ]
                }
              ]
            ]
          }
        ]
      ]
    },
    {
      "content": "is",
      "type": "object",
      "variant": "verb",
      "connected": [
        []
      ]
    },
    {
      "content": "friend",
      "type": "object",
      "variant": "predicate",
      "connected": [
        [
          {
            "content": "my",
            "type": "modifier",
            "variant": "adjective",
            "connected": [
              [],
              []
            ]
          }
        ]
      ]
    }
  ],
  "versionString": "1.0.1"
}

const EXAMPLE_3 = {
  "items": [
    {
      "content": "One",
      "type": "object",
      "variant": "noun",
      "connected": [
        [
          {
            "content": "of",
            "type": "modifier",
            "variant": "adjective",
            "connected": [
              [
                {
                  "content": "points",
                  "type": "object",
                  "variant": "noun",
                  "connected": [
                    [
                      {
                        "content": "the",
                        "type": "modifier",
                        "variant": "adjective",
                        "connected": [
                          [],
                          []
                        ]
                      },
                      {
                        "content": "major",
                        "type": "modifier",
                        "variant": "adjective",
                        "connected": [
                          [],
                          []
                        ]
                      },
                      {
                        "content": "selling",
                        "type": "modifier",
                        "variant": "adjective",
                        "connected": [
                          [],
                          []
                        ]
                      },
                      {
                        "content": "of",
                        "type": "modifier",
                        "variant": "adjective",
                        "connected": [
                          [
                            {
                              "content": "book (The Hitchhiker's Guide to the Galaxy)",
                              "type": "object",
                              "variant": "noun",
                              "connected": [
                                [
                                  {
                                    "content": "that",
                                    "type": "modifier",
                                    "variant": "adjective",
                                    "connected": [
                                      [],
                                      []
                                    ]
                                  },
                                  {
                                    "content": "travel",
                                    "type": "modifier",
                                    "variant": "adjective",
                                    "connected": [
                                      [],
                                      []
                                    ]
                                  },
                                  {
                                    "content": "remarkable",
                                    "type": "modifier",
                                    "variant": "adjective",
                                    "connected": [
                                      [],
                                      [
                                        {
                                          "content": "wholly",
                                          "type": "meta",
                                          "variant": "adverb",
                                          "connected": []
                                        }
                                      ]
                                    ]
                                  }
                                ]
                              ]
                            }
                          ],
                          []
                        ]
                      }
                    ]
                  ]
                }
              ],
              []
            ]
          },
          {
            "content": "apart from",
            "type": "modifier",
            "variant": "adjective",
            "connected": [
              [
                {
                  "content": "and",
                  "type": "conjunction",
                  "variant": "conjunction_left",
                  "connected": [
                    [
                      {
                        "content": "cheapness",
                        "type": "object",
                        "variant": "noun",
                        "connected": [
                          [
                            {
                              "content": "its",
                              "type": "modifier",
                              "variant": "adjective",
                              "connected": [
                                [],
                                []
                              ]
                            },
                            {
                              "content": "relative",
                              "type": "modifier",
                              "variant": "adjective",
                              "connected": [
                                [],
                                []
                              ]
                            }
                          ]
                        ]
                      }
                    ],
                    [
                      {
                        "content": "fact",
                        "type": "object",
                        "variant": "noun",
                        "connected": [
                          [
                            {
                              "content": "the",
                              "type": "modifier",
                              "variant": "adjective",
                              "connected": [
                                [],
                                []
                              ]
                            },
                            {
                              "content": "that",
                              "type": "modifier",
                              "variant": "adjective",
                              "connected": [
                                [
                                  {
                                    "content": "",
                                    "type": "object_clause",
                                    "variant": "noun_clause",
                                    "connected": [
                                      [
                                        {
                                          "content": "it",
                                          "type": "object",
                                          "variant": "noun",
                                          "connected": [
                                            []
                                          ]
                                        },
                                        {
                                          "content": "has",
                                          "type": "object",
                                          "variant": "verb",
                                          "connected": [
                                            []
                                          ]
                                        },
                                        {
                                          "content": "",
                                          "type": "object_clause",
                                          "variant": "direct_object_clause",
                                          "connected": [
                                            [
                                              {
                                                "content": "words (\"Don't Panic\")",
                                                "type": "object",
                                                "variant": "noun",
                                                "connected": [
                                                  [
                                                    {
                                                      "content": "the",
                                                      "type": "modifier",
                                                      "variant": "adjective",
                                                      "connected": [
                                                        [],
                                                        []
                                                      ]
                                                    }
                                                  ]
                                                ]
                                              },
                                              {
                                                "content": "written",
                                                "type": "object",
                                                "variant": "verb",
                                                "connected": [
                                                  [
                                                    {
                                                      "content": "in",
                                                      "type": "modifier",
                                                      "variant": "adjective",
                                                      "connected": [
                                                        [
                                                          {
                                                            "content": "letters",
                                                            "type": "object",
                                                            "variant": "noun",
                                                            "connected": [
                                                              [
                                                                {
                                                                  "content": "large",
                                                                  "type": "modifier",
                                                                  "variant": "adjective",
                                                                  "connected": [
                                                                    [],
                                                                    []
                                                                  ]
                                                                },
                                                                {
                                                                  "content": "friendly",
                                                                  "type": "modifier",
                                                                  "variant": "adjective",
                                                                  "connected": [
                                                                    [],
                                                                    []
                                                                  ]
                                                                }
                                                              ]
                                                            ]
                                                          }
                                                        ],
                                                        []
                                                      ]
                                                    },
                                                    {
                                                      "content": "on",
                                                      "type": "modifier",
                                                      "variant": "adjective",
                                                      "connected": [
                                                        [
                                                          {
                                                            "content": "cover",
                                                            "type": "object",
                                                            "variant": "noun",
                                                            "connected": [
                                                              [
                                                                {
                                                                  "content": "its",
                                                                  "type": "modifier",
                                                                  "variant": "adjective",
                                                                  "connected": [
                                                                    [],
                                                                    []
                                                                  ]
                                                                }
                                                              ]
                                                            ]
                                                          }
                                                        ],
                                                        []
                                                      ]
                                                    }
                                                  ]
                                                ]
                                              }
                                            ]
                                          ]
                                        }
                                      ]
                                    ]
                                  }
                                ],
                                []
                              ]
                            }
                          ]
                        ]
                      }
                    ]
                  ]
                }
              ],
              []
            ]
          }
        ]
      ]
    },
    {
      "content": "is",
      "type": "object",
      "variant": "verb",
      "connected": [
        []
      ]
    },
    {
      "content": "glossary",
      "type": "object",
      "variant": "predicate",
      "connected": [
        [
          {
            "content": "its",
            "type": "modifier",
            "variant": "adjective",
            "connected": [
              [],
              []
            ]
          },
          {
            "content": "and",
            "type": "compound_mod",
            "variant": "compound_adj",
            "connected": [
              [
                {
                  "content": "compendious",
                  "type": "modifier",
                  "variant": "adjective",
                  "connected": [
                    [],
                    []
                  ]
                }
              ],
              [
                {
                  "content": "accurate",
                  "type": "modifier",
                  "variant": "adjective",
                  "connected": [
                    [],
                    [
                      {
                        "content": "occasionally",
                        "type": "meta",
                        "variant": "adverb",
                        "connected": []
                      }
                    ]
                  ]
                }
              ]
            ]
          }
        ]
      ]
    }
  ],
  "versionString": "1.0.1"
}

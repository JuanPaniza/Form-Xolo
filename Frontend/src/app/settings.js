 const settings ={
    steps: [
      {
        "name": "Page 1",
        "questions": [
          {
            "id": 1,
            "label":
              "Do you have any known allergies to food, medication or plants? If so, please mention all of them below:",
            "name": "hasAllergies",
            "options": [
              { "value": "yes", "label": "Yes", "id": 1,  "idRadio": 7},
              { "value": "no", "label": "No", "id": 2,  "idRadio": 8}
            ],
            "inputText": { "value": "allergies", "label": "Mention what they are?"}
          },
          {
            "id": 2,
            "label": "Are you pregnant or breastfeeding?",
            "name": "isInMaternity",
            "options": [
              { "value": "yes", "label": "Yes", "id": 3,  "idRadio": 9},
              { "value": "no", "label": "No", "id": 4,  "idRadio": 10}
            ]      
          },
          {
            "id": 3,
            "label":
              "Do you suffer from any circulatory or skin disease, cancer, diabetes, epilepsy, stye or tinnitus? If so, which one?",
            "name": "hasADisease",
            "options": [
              { "value": "yes", "label": "Yes", "id": 5,  "idRadio": 11},
              { "value": "no", "label": "No", "id": 6,  "idRadio": 12}
            ],
            "inputText": { "value": "disease", "label": "Mention what they are?" }
          }
        ]
      },
      {
        "name": "Page 2",
        "questions": [
          {
            "id": 4,
            "label":"Are you currently taking (or stopped taking less than 6 months ago) any medication to treat acne, like accutane, Renova, etc?",
            "name": "hasAMedication",
            "options": [
              { "value": "yes", "label": "Yes", "id": 1, "idRadio": 7},
              { "value": "no", "label": "No", "id": 2, "idRadio": 8}
            ],
            "inputText": { "value": "medication", "label": "Mention what they are?" }
          },
          {
            "id": 5,
            "label": "Are you currently taking or applying any medication (or in the last 5 days), including but not limited to antibiotics and allergy medication? If so, please mention all of them below:",
            "name": "hasAcneMedication",
            "options": [
              { "value": "yes", "label": "Yes", "id": 3, "idRadio": 9 },
              { "value": "no", "label": "No", "id": 4, "idRadio": 10}
            ],
            "inputText": { "value": "acneMedication", "label": "Mention what they are?" }
          },
          {
            "id": 6,
            "label":"Do you have any medical implants or pacemaker?",
            "name": "hasAMedicalDevice",
            "options": [
              { "value": "yes", "label": "Yes", "id": 5, "idRadio": 11 },
              { "value": "no", "label": "No", "id": 6,  "idRadio": 12 }
            ]
          }
        ]
      },
      {
        "name": "Page 3",
        "questions": [
          {
            "id": 7,
            "label":
                  "Did you recently do a chemical peel, laser treatment or tanning? If so, when, what area of the body?",
            "name": "hasASkinTreatment",
            "options": [
              { "value": "yes", "label": "Yes", "id": 1,  "idRadio": 7},
              { "value": "no", "label": "No", "id": 2,  "idRadio": 8 }
            ],
            "inputText": { "value": "skinTreatment ", "label": "Mention what they are?"}
          },
          {
            "id": 8,
            "label": "Do you currently use niacinamide, retinol, salicylic acid, skin thinning, alphahydroxiacids (lactic acid, glycolic acid, etc) or products containing these ingredients? If so, which one and where do you apply them and when was the last time? They are usually found in products to lighten or exfoliate the skin.",
            "name": "isUsingSkinProducts",
            "options": [
              { "value": "yes", "label": "Yes", "id": 3,  "idRadio": 9 },
              { "value": "no", "label": "No", "id": 4,  "idRadio": 10 }
            ],
            "inputText": { "value": "skinProducts", "label": "Mention what they are?" }
          }
        ]
      }    
    ]
  }
  export  const steps = settings.steps;
  export default settings;
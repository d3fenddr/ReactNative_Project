export type Topic = {
  id: string
  label: string
  bgColor: string
  textColor?: string
}

const topics: Topic[] = [
  {
    id: "reduce-stress",
    label: "Reduce Stress",
    bgColor: "#7A92F4",
    textColor: "#fff",
  },
  {
    id: "improve-performance",
    label: "Improve Performance",
    bgColor: "#FF8A65",
    textColor: "#fff",
  },
  {
    id: "increase-happiness",
    label: "Increase Happiness",
    bgColor: "#F7A440",
    textColor: "#fff",
  },
  {
    id: "reduce-anxiety",
    label: "Reduce Anxiety",
    bgColor: "#FCD76A",
    textColor: "#333",
  },
  {
    id: "personal-growth",
    label: "Personal Growth",
    bgColor: "#82C8A1",
    textColor: "#fff",
  },
  {
    id: "better-sleep",
    label: "Better Sleep",
    bgColor: "#4C5860",
    textColor: "#fff",
  },
  {
    id: "mindfulness",
    label: "Mindfulness",
    bgColor: "#D4A5FA",
    textColor: "#333",
  },
  {
    id: "self-love",
    label: "Self-Love",
    bgColor: "#FFB6B9",
    textColor: "#333",
  },
  {
    id: "motivation",
    label: "Motivation",
    bgColor: "#FFCC80",
    textColor: "#333",
  },
  {
    id: "inner-peace",
    label: "Inner Peace",
    bgColor: "#9BB1DB",
    textColor: "#fff",
  },
]

export default topics
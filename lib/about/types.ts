export interface AboutContent {
  title: string
  heroImage: string
  intro: string
  companyDescription: string
  ourStory: {
    title: string
    paragraphs: string[]
    image: string
  }
  stats: Array<{
    value: string
    label: string
  }>
  activities: Array<{
    id: string
    icon: string
    label: string
    description: string
    imageUrl: string
    active: boolean
  }>
  whyChoose: {
    title: string
    description: string
    bubbleSender: string
    bubbleReceiver: string
    employeeImage: string
  }
  highlights: Array<{
    title: string
    description: string
  }>
  cta: {
    title: string
    subtitle: string
    buttonLabel: string
  }
}

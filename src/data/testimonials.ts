/**
 * Word of mouth.
 *
 * Carried over from barsky.design, where these have been published for a while.
 * Every one is a named person at a named company — these came out of LinkedIn
 * recommendations, not out of a copywriting pass. Nothing goes in this file that
 * a real person did not actually write about working with Hiram.
 */
export type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "His ability to translate complex user requirements into intuitive, visually appealing designs sets him apart. His work consistently garnered positive feedback from colleagues and stakeholders alike.",
    name: "Alex Pantaler",
    title: "SVP of UX/UI, Citi",
  },
  {
    quote: "One of the most talented designers I have had the pleasure to work with.",
    name: "Attila Bodi",
    title: "Lead Product Designer, Cloudera",
  },
  {
    quote:
      "Unmatched in his ability to translate the often vague ideas from clients into beautiful, simple-to-use products.",
    name: "Daanish",
    title: "Business Delivery Partner, Tata Consultancy Services",
  },
  {
    quote:
      "Highly talented, creative, and perceptive. He asks smart questions to make sure he understands what clients need — and delivers clean, well-thought-out designs.",
    name: "Jon Hoberman",
    title: "Senior Product Manager, FinTech",
  },
  {
    quote:
      "He takes charge of any situation and sees any task through to the end. I recommend Hiram for any project as the Lead UX Designer.",
    name: "Robert Stein",
    title: "Release Manager, KPMG",
  },
  {
    quote:
      "Always innovating and looking to improve. I would suggest him for senior and leadership roles.",
    name: "Isrrael Gutierrez",
    title: "Design Systems Developer, KPMG",
  },
];

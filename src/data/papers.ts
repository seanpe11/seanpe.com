/**
 * Papers. Every field here was checked against the PDF itself
 * (vault: 03-Library/Publications/). Both are group work, so the site never
 * claims what Sean's individual part was; `contribution` is his to write.
 *
 * Label honestly: a course paper is not a peer-reviewed publication, and no
 * venue or "published" goes in `context` unless the PDF states where it appeared.
 *
 * PDFs: hosting them is Sean's call. They print every co-author's university
 * email, and nothing under public/ is private (an unlinked file is still
 * downloadable). So the files are NOT in public/ and SHOW_PAPER_PDFS is false.
 * To turn them on: copy the approved PDF to public/papers/<slug>.pdf, set `pdf`,
 * and flip the flag. Never put co-author emails in this file.
 */
export const SHOW_PAPER_PDFS = false;

export type Paper = {
  slug: string;
  title: string;
  /** In the paper's order, spelled as printed. `self` marks Sean. */
  authors: { name: string; self?: boolean }[];
  year: string;
  /** What kind of paper and where it came from. No venue unless the PDF says so. */
  context: string;
  /** Two sentences, plain language. */
  summary: string;
  tools: string[];
  /** SEAN: one line on your part of the group work. Shown only when filled in. */
  contribution: string;
  /** e.g. "/papers/speech-emotion-vgg16.pdf", once the file is approved and copied. */
  pdf?: string;
};

export const PAPERS: Paper[] = [
  {
    slug: "speech-emotion-vgg16",
    title: "Comparison of MFCCs and Mel-Spectrograms as Training Input for VGG-16 for Classifying Emotions in Speech",
    authors: [
      { name: "Gwyneth Ang" },
      { name: "Dianne Chong" },
      { name: "Johann Gonzales" },
      { name: "Sean Pe", self: true },
    ],
    // The PDF prints no date; 2021 is from Sean's Notion timeline (AFFECTV dataset, Apr–Aug 2021).
    year: "2021",
    context: "Course paper, Affective Computing (AFFECTV), De La Salle University. Not peer-reviewed.",
    summary:
      "We turned 2,800 short recordings of spoken words from the Toronto Emotional Speech Set into two kinds of images, MFCCs and Mel-spectrograms, and used transfer learning on the VGG-16 image classifier to recognise seven emotions from each. Both inputs reached about 95% accuracy, but Mel-spectrograms looked more distinct between emotions and scored higher on top-1 accuracy, so the paper recommends them as the input.",
    tools: ["python", "tensorflow / keras", "vgg-16", "transfer learning", "librosa"],
    contribution: "", // SEAN: e.g. "I did X." Leave empty to hide the line.
  },
  {
    slug: "luna-doctor-recommender",
    title: "LUNA: Designing a Doctor Recommendation System",
    authors: [
      { name: "Jose Lorenzo Cansana" },
      { name: "Gabriel Rasheed Jamalul" },
      { name: "Sean Michael Pe", self: true },
      { name: "Ryan Austin Fernandez" },
    ],
    year: "2022",
    context: "Undergraduate thesis paper, De La Salle University.",
    summary:
      "A web app for people who know their symptoms but not which kind of doctor to see: it asks for symptoms and preferences in a doctor and consultation, then recommends a doctor who fits. Built through a needfinding study and usability tests with 22 participants, it was reviewed by six doctors, who flagged its reliance on the ApiMedic diagnosis API and its fit to the Philippines, and the 27 users in acceptance testing rated it useful and easy to use.",
    tools: ["react", "node.js", "express", "firebase", "figma", "apimedic api"],
    contribution: "", // SEAN: e.g. "I did X." Leave empty to hide the line.
  },
];

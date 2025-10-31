export type SkillCategoryKey = 'Software' | 'Expertise' | 'Language';

export interface SkillItem {
  label: string;
}

export type SkillsMap = Record<SkillCategoryKey, SkillItem[]>;

// Edit this list to add/remove skills. The UI is fully data-driven.
export const skillsData: SkillsMap = {
  Software: [
    { label: 'Notion' },
    { label: 'Figma' },
    { label: 'Webflow' },
    { label: 'Google Sheets' },
    { label: 'Final Cut Pro' },
    { label: 'Python' },
  ],
  Expertise: [
    { label: 'Front-end' },
    { label: 'UI Engineering' },
    { label: 'Design Systems' },
    { label: 'Animations' },
    { label: 'Performance' },
  ],
  Language: [
    { label: 'JavaScript' },
    { label: 'TypeScript' },
    { label: 'HTML/CSS' },
    { label: 'Git' },
  ],
};



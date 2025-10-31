'use client';

import { useState } from 'react';
import { skillsData, type SkillCategoryKey } from '@/lib/skills';

const categories: SkillCategoryKey[] = ['Software', 'Expertise', 'Language'];

export default function Skills() {
  const [active, setActive] = useState<SkillCategoryKey>('Software');

  return (
    <section className="section-padding bg-background">
      <div className="container">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold">Skills</h2>
          <p className="text-muted-foreground mt-2">Languages & Tools</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={
                active === cat
                  ? 'px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm'
                  : 'px-4 py-2 rounded-full border border-border text-sm hover:bg-accent'
              }
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {skillsData[active].map((skill) => (
            <span
              key={skill.label}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm"
            >
              {skill.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}



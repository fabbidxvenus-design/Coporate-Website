import { describe, test, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const ROOT = process.cwd();
const GLOBALS_CSS = resolve(ROOT, 'app/globals.css');
const LOCALE_LAYOUT = resolve(ROOT, 'app/[locale]/layout.tsx');
const APP_MODAL = resolve(ROOT, 'components/public/ApplicationModal.tsx');
const CONTACT_MODAL = resolve(ROOT, 'components/public/ContactModal.tsx');

describe('TIP-032 Red Gate: Animation Presence', () => {

  test('AC-01: Locale layout should contain a transition wrapper or class', () => {
    const content = readFileSync(LOCALE_LAYOUT, 'utf8');
    expect(content).toMatch(/PageTransition/);
  });

  test('AC-02: Modals should contain transition classes for smoother entry', () => {
    const appModalContent = readFileSync(APP_MODAL, 'utf8');
    const contactModalContent = readFileSync(CONTACT_MODAL, 'utf8');

    expect(appModalContent).toMatch(/modal-overlay-enter|modal-content-enter/);
    expect(contactModalContent).toMatch(/modal-overlay-enter|modal-content-enter/);
  });

  test('AC-03: globals.css must preserve reduced motion rules', () => {
    const content = readFileSync(GLOBALS_CSS, 'utf8');
    expect(content).toContain('@media (prefers-reduced-motion: reduce)');
    expect(content).toContain('transition-duration: 0.01ms !important');
  });

  test('AC-04: Item components must NOT have their core layout classes modified', () => {
    const jobCard = resolve(ROOT, 'components/public/JobCard.tsx');
    const newsCard = resolve(ROOT, 'components/public/NewsCard.tsx');

    const jobContent = readFileSync(jobCard, 'utf8');
    const newsContent = readFileSync(newsCard, 'utf8');

    // Verify pre-implementation state of cards - they have their shadow/border classes
    expect(jobContent).toContain('bg-white border border-gray-100 rounded-xl p-6');
    expect(newsContent).toContain('bg-surface rounded-xl overflow-hidden');
  });
});

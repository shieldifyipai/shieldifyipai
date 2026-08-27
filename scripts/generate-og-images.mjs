import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = resolve(projectRoot, 'public/images/og');
const logoPath = resolve(projectRoot, 'public/images/logo.svg');

const cards = [
  {
    file: 'shieldify-ip.jpg',
    eyebrow: 'INTELLECTUAL PROPERTY PROTECTION',
    title: 'Protect Your Brand Across the Digital World',
    description: 'Monitoring, evidence collection and enforcement support for digital IP.',
  },
  {
    file: 'online-trademark-monitoring-checklist.jpg',
    eyebrow: 'TRADEMARK PROTECTION',
    title: 'Online Trademark Monitoring: A Practical Checklist for Brand Teams',
    description: 'Practical guidance from the Shieldify IP knowledge center.',
  },
  {
    file: 'copyright-infringement-evidence-ready-case.jpg',
    eyebrow: 'COPYRIGHT PROTECTION',
    title: 'Copyright Infringement Online: How to Build an Evidence-Ready Case',
    description: 'Practical guidance from the Shieldify IP knowledge center.',
  },
  {
    file: 'counterfeit-listing-detection-evidence-escalation.jpg',
    eyebrow: 'COUNTERFEIT DETECTION',
    title: 'Counterfeit Listing Detection: Signals, Evidence, and Escalation',
    description: 'Practical guidance from the Shieldify IP knowledge center.',
  },
  {
    file: 'case-studies.jpg',
    eyebrow: 'ILLUSTRATIVE CASE STUDIES',
    title: 'IP Protection Workflows From Finding to Case Record',
    description: 'Practical scenarios for monitoring, evidence, review and reporting.',
  },
  {
    file: 'marketplace-trademark-misuse.jpg',
    eyebrow: 'TRADEMARK PROTECTION',
    title: 'Marketplace Trademark Misuse: Building a Case Queue',
    description: 'Illustrative Shieldify IP workflow — not a client performance claim.',
  },
  {
    file: 'copyright-content-copying.jpg',
    eyebrow: 'COPYRIGHT PROTECTION',
    title: 'Copyright Content Copying: Building an Evidence Workflow',
    description: 'Illustrative Shieldify IP workflow — not a client performance claim.',
  },
  {
    file: 'brand-impersonation-triage.jpg',
    eyebrow: 'BRAND MONITORING',
    title: 'Brand Impersonation: Triage Across Profiles and Domains',
    description: 'Illustrative Shieldify IP workflow — not a client performance claim.',
  },
  {
    file: 'service-trademark-protection.jpg',
    eyebrow: 'SHIELDIFY IP SERVICES',
    title: 'Online Trademark Protection Services',
    description: 'Monitoring, evidence and structured enforcement support.',
  },
  {
    file: 'service-copyright-protection.jpg',
    eyebrow: 'SHIELDIFY IP SERVICES',
    title: 'Online Copyright Protection Services',
    description: 'Asset review, source evidence and response tracking.',
  },
  {
    file: 'service-brand-monitoring.jpg',
    eyebrow: 'SHIELDIFY IP SERVICES',
    title: 'Digital Brand Monitoring Services',
    description: 'Cross-channel monitoring for impersonation and brand risk.',
  },
  {
    file: 'service-counterfeit-detection.jpg',
    eyebrow: 'SHIELDIFY IP SERVICES',
    title: 'Online Counterfeit Detection Services',
    description: 'Listing review, seller intelligence and evidence workflows.',
  },
  {
    file: 'service-evidence-collection.jpg',
    eyebrow: 'SHIELDIFY IP SERVICES',
    title: 'Digital IP Evidence Collection',
    description: 'Source preservation, ownership records and case history.',
  },
  {
    file: 'service-enforcement-support.jpg',
    eyebrow: 'SHIELDIFY IP SERVICES',
    title: 'IP Enforcement Support Services',
    description: 'Case readiness, submissions, responses and reporting.',
  },
];

const escapeXml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

function wrapTitle(title, maximumCharacters = 35) {
  const words = title.split(/\s+/);
  const lines = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maximumCharacters && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }

  if (current) lines.push(current);
  return lines.slice(0, 3);
}

function createCardSvg(card) {
  const titleLines = wrapTitle(card.title);
  const title = titleLines.map((line, index) => (
    `<tspan x="76" dy="${index === 0 ? 0 : 69}">${escapeXml(line)}</tspan>`
  )).join('');
  const descriptionY = 354 + ((titleLines.length - 1) * 69) + 68;

  return Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#090d16" />
          <stop offset="1" stop-color="#101a2e" />
        </linearGradient>
        <radialGradient id="limeGlow" cx="0" cy="0" r="1" gradientTransform="translate(1030 105) rotate(125) scale(430)">
          <stop stop-color="#b9fb6a" stop-opacity=".22" />
          <stop offset="1" stop-color="#b9fb6a" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="blueGlow" cx="0" cy="0" r="1" gradientTransform="translate(1030 560) rotate(-145) scale(470)">
          <stop stop-color="#3a6ef2" stop-opacity=".27" />
          <stop offset="1" stop-color="#3a6ef2" stop-opacity="0" />
        </radialGradient>
        <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0V48" fill="none" stroke="#ffffff" stroke-opacity=".035" />
        </pattern>
      </defs>
      <rect width="1200" height="630" fill="url(#background)" />
      <rect width="1200" height="630" fill="url(#grid)" />
      <rect width="1200" height="630" fill="url(#limeGlow)" />
      <rect width="1200" height="630" fill="url(#blueGlow)" />
      <circle cx="1085" cy="140" r="116" fill="none" stroke="#b9fb6a" stroke-opacity=".2" />
      <circle cx="1085" cy="140" r="78" fill="none" stroke="#ffffff" stroke-opacity=".08" />
      <path d="M930 485C1015 420 1095 430 1200 350" fill="none" stroke="#3a6ef2" stroke-width="2" stroke-opacity=".45" />
      <rect x="76" y="185" width="8" height="32" rx="4" fill="#b9fb6a" />
      <text x="101" y="208" fill="#b9fb6a" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="2">${escapeXml(card.eyebrow)}</text>
      <text x="76" y="286" fill="#ffffff" font-family="Arial, sans-serif" font-size="58" font-weight="700" letter-spacing="-1.5">${title}</text>
      <text x="76" y="${descriptionY}" fill="#ffffff" fill-opacity=".67" font-family="Arial, sans-serif" font-size="21">${escapeXml(card.description)}</text>
      <text x="1124" y="580" fill="#ffffff" fill-opacity=".52" text-anchor="end" font-family="Arial, sans-serif" font-size="17">shieldifyip.ai</text>
    </svg>
  `);
}

await mkdir(outputDirectory, { recursive: true });
const logo = await sharp(logoPath).resize({ width: 260 }).png().toBuffer();

for (const card of cards) {
  await sharp(createCardSvg(card))
    .composite([{ input: logo, left: 76, top: 70 }])
    .jpeg({ quality: 88, chromaSubsampling: '4:4:4', progressive: true })
    .toFile(resolve(outputDirectory, card.file));
  console.log(`Generated ${card.file}`);
}

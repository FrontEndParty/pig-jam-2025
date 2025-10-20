/**
 * Converts beat_labels_1.txt to TypeScript array
 *
 * Usage: node scripts/convert-beats.js
 */

const fs = require('fs');
const path = require('path');

// Input file path (adjust if needed)
const INPUT_FILE = path.join(__dirname, '../public/assets/beat_labels_2.txt');
// Output file path
const OUTPUT_FILE = path.join(__dirname, '../src/data/song01-beats.ts');

try {
  console.log('Reading beat data from:', INPUT_FILE);

  // Read the TSV file
  const content = fs.readFileSync(INPUT_FILE, 'utf8');

  // Parse lines and extract first column (timestamp)
  const lines = content.trim().split('\n');
  const beats = lines.map(line => {
    const columns = line.split('\t');
    return parseFloat(columns[0]);
  });

  console.log(`Parsed ${beats.length} beats`);
  console.log(`First beat: ${beats[0]}s, Last beat: ${beats[beats.length - 1]}s`);
  console.log(`Song duration: ~${Math.ceil(beats[beats.length - 1])}s`);

  // Generate TypeScript file content
  const tsContent = `/**
 * Beat timestamps for Song 01
 *
 * Generated from beat_labels_2.txt
 * Total beats: ${beats.length}
 * Duration: ~${Math.ceil(beats[beats.length - 1])} seconds
 *
 * Each value represents the time in seconds when a beat occurs.
 * These are used by SongScene to generate notes at precise timings.
 */

export const song01Beats: readonly number[] = [
  ${beats.join(',\n  ')}
];

export const song01Duration = ${beats[beats.length - 1]};
`;

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write TypeScript file
  fs.writeFileSync(OUTPUT_FILE, tsContent, 'utf8');

  console.log('\n✅ Success!');
  console.log('Generated:', OUTPUT_FILE);
  console.log(`\nYou can now import with:\nimport { song01Beats } from '../data/song01-beats';`);

} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

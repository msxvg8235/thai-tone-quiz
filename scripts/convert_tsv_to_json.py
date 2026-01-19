#!/usr/bin/env python3
"""
Thai Vocabulary TSV to JSON Converter
======================================

This script converts Thai vocabulary TSV files to JSON format for the Thai Tone Quiz app.

Usage:
    python scripts/convert_tsv_to_json.py input.tsv

The script will:
1. Parse the TSV file
2. Extract Thai words, meanings, and romanization with tones
3. Generate a JSON file in the correct format
4. Save it as data/vocabulary.json

Input Format:
    Tab-separated file with 3 columns:
    - Thai word
    - English meaning
    - Romanization with tones in <sup> tags (e.g., word<sup>M</sup>)

Output Format:
    JSON file with structure:
    {
      "vocab": [
        {
          "thai": "...",
          "meaning": "...",
          "syllables": [
            {"romanization": "...", "tone": "L|M|R|F|H"}
          ]
        }
      ],
      "metadata": {...}
    }
"""

import json
import re
import sys
from pathlib import Path
from datetime import datetime


def parse_tsv_to_json(input_file):
    """Parse TSV file and convert to vocabulary JSON format."""
    
    vocab_list = []
    skipped = []
    
    print(f"Reading file: {input_file}")
    
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    for i, line in enumerate(lines, start=1):
        line = line.strip()
        if not line:
            continue
        
        # Split by tab
        parts = line.split('\t')
        
        if len(parts) < 3:
            skipped.append(f"Line {i}: Not enough parts - {parts[0] if parts else 'empty'}")
            continue
        
        thai_word = parts[0].strip()
        meaning = parts[1].strip()
        romanization_raw = parts[2].strip() if len(parts) > 2 else ""
        
        # Handle cases where romanization might be in parts[3] due to line breaks
        if len(parts) > 3:
            romanization_raw = parts[2].strip() + " " + parts[3].strip()
        
        # Parse romanization with <sup> tags
        # Pattern: word<sup>TONE</sup>
        syllable_pattern = r'([a-zA-Z:]+)<sup>([LMRFH])</sup>'
        syllable_matches = re.findall(syllable_pattern, romanization_raw)
        
        if not syllable_matches:
            skipped.append(f"Line {i}: Could not parse syllables - {thai_word}: {romanization_raw}")
            continue
        
        syllables = []
        for syl, tone in syllable_matches:
            syllables.append({
                "romanization": syl.strip(),
                "tone": tone
            })
        
        vocab_entry = {
            "thai": thai_word,
            "meaning": meaning,
            "syllables": syllables
        }
        
        vocab_list.append(vocab_entry)
    
    # Create output structure
    output = {
        "vocab": vocab_list,
        "metadata": {
            "total_entries": len(vocab_list),
            "skipped_entries": len(skipped),
            "source_file": Path(input_file).name,
            "generated_at": datetime.now().isoformat(),
            "format_version": "1.0"
        }
    }
    
    # Print statistics
    print(f"\n✓ Successfully processed {len(vocab_list)} vocabulary entries")
    print(f"✓ Skipped {len(skipped)} entries")
    
    if skipped:
        print(f"\nSkipped entries:")
        for skip in skipped[:10]:  # Show first 10
            print(f"  - {skip}")
        if len(skipped) > 10:
            print(f"  ... and {len(skipped) - 10} more")
    
    # Syllable statistics
    syllable_counts = {}
    for entry in vocab_list:
        count = len(entry['syllables'])
        syllable_counts[count] = syllable_counts.get(count, 0) + 1
    
    print(f"\nSyllable distribution:")
    for count in sorted(syllable_counts.keys())[:10]:
        print(f"  {count} syllable(s): {syllable_counts[count]} words")
    
    # Tone statistics
    tone_counts = {}
    for entry in vocab_list:
        for syl in entry['syllables']:
            tone = syl['tone']
            tone_counts[tone] = tone_counts.get(tone, 0) + 1
    
    print(f"\nTone distribution:")
    tone_names = {'L': 'Low', 'M': 'Mid', 'R': 'Rising', 'F': 'Falling', 'H': 'High'}
    for tone in ['L', 'M', 'R', 'F', 'H']:
        if tone in tone_counts:
            print(f"  {tone} ({tone_names[tone]}): {tone_counts[tone]}")
    
    return output


def main():
    if len(sys.argv) < 2:
        print("Usage: python scripts/convert_tsv_to_json.py <input.tsv>")
        print("\nExample:")
        print("  python scripts/convert_tsv_to_json.py NewVocab.tsv")
        sys.exit(1)
    
    input_file = sys.argv[1]
    
    if not Path(input_file).exists():
        print(f"Error: File '{input_file}' not found")
        sys.exit(1)
    
    # Parse the file
    output_data = parse_tsv_to_json(input_file)
    
    # Save to data/vocabulary.json
    output_path = Path(__file__).parent.parent / 'data' / 'vocabulary.json'
    output_path.parent.mkdir(exist_ok=True)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)
    
    print(f"\n✓ Vocabulary saved to: {output_path}")
    print(f"\nYou can now deploy the updated app!")


if __name__ == '__main__':
    main()

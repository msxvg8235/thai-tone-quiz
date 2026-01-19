# Vocabulary Update Script

This document explains how to update the vocabulary in your Thai Tone Quiz app.

## 📝 Input Format

Your TSV (Tab-Separated Values) file should have **3 columns**:

1. **Thai word** - The Thai script
2. **English meaning** - Translation/definition
3. **Romanization with tones** - Using `<sup>` tags for tones

### Example Format

```
ใครต่อใคร	anyone; anybody; everybody; everyone	khrai<sup>M</sup> dtaaw<sup>L</sup> khrai<sup>M</sup>
สร้าง	to build; construct; create	saang<sup>F</sup>
ชั่วคราว	[is] temporary	chuaa<sup>F</sup> khraao<sup>M</sup>
```

### Tone Markers

Use these exact markers in `<sup>` tags:

- **L** = Low tone
- **M** = Mid tone  
- **R** = Rising tone
- **F** = Falling tone
- **H** = High tone

### Important Rules

✅ **DO:**
- Separate columns with TAB (not spaces)
- Use `<sup>TONE</sup>` immediately after each syllable
- Include all syllables for multi-syllable words
- Use consistent romanization system

❌ **DON'T:**
- Use spaces instead of tabs
- Forget tone markers
- Mix different romanization systems
- Include empty lines at the beginning

## 🔄 How to Update Vocabulary

### Step 1: Prepare Your TSV File

Create or edit your vocabulary file:

```bash
# Example filename
new-vocabulary.tsv
```

### Step 2: Run the Conversion Script

```bash
# From the project root directory
python scripts/convert_tsv_to_json.py new-vocabulary.tsv
```

### Step 3: Review the Output

The script will show:
- Number of entries processed
- Number of entries skipped (with reasons)
- Syllable distribution
- Tone distribution

Example output:
```
✓ Successfully processed 850 vocabulary entries
✓ Skipped 3 entries

Skipped entries:
  - Line 42: Could not parse syllables - ...

Syllable distribution:
  1 syllable(s): 295 words
  2 syllable(s): 360 words
  ...

Tone distribution:
  L (Low): 145
  M (Mid): 152
  ...

✓ Vocabulary saved to: data/vocabulary.json
```

### Step 4: Deploy the Update

```bash
git add data/vocabulary.json
git commit -m "Update vocabulary with [NUMBER] new words"
git push
```

GitHub Actions will automatically deploy the update!

## 🛠️ Common Issues and Solutions

### Issue: "Not enough parts"

**Problem:** Line doesn't have 3 tab-separated columns

**Solution:** Make sure you're using TAB (not spaces) between columns

```
# Wrong (spaces):
ใคร    anyone    khrai<sup>M</sup>

# Correct (tabs):
ใคร	anyone	khrai<sup>M</sup>
```

### Issue: "Could not parse syllables"

**Problem:** Tone markers are missing or incorrectly formatted

**Solution:** Check that every syllable has `<sup>TONE</sup>`

```
# Wrong:
khrai dtaaw khrai

# Correct:
khrai<sup>M</sup> dtaaw<sup>L</sup> khrai<sup>M</sup>
```

### Issue: High number of skipped entries

**Possible causes:**
1. Wrong file encoding (should be UTF-8)
2. Mixed separators (tabs vs spaces)
3. Missing romanization column
4. Incorrect tone marker format

**Solution:**
1. Save file as UTF-8 encoding
2. Use a proper text editor (VS Code, Sublime Text)
3. Verify format matches the example above

## 📊 Example TSV File

Here's a complete example you can use as a template:

```tsv
สวัสดี	hello; good morning	sa<sup>L</sup> wat<sup>L</sup> dee<sup>M</sup>
ขอบคุณ	thank you	khaawp<sup>L</sup> khoon<sup>M</sup>
ใช่	yes	chai<sup>F</sup>
ไม่ใช่	no; not	mai<sup>F</sup> chai<sup>F</sup>
```

Save this as `example.tsv` and test with:
```bash
python scripts/convert_tsv_to_json.py example.tsv
```

## 🔍 Validating Your TSV File

Before converting, you can check your file:

### Manual Check
1. Open in a text editor (not Excel - it may change formatting)
2. Verify tabs separate columns
3. Check every syllable has `<sup>` tags
4. Ensure UTF-8 encoding

### Using Python
```python
# Quick validation script
with open('your-file.tsv', 'r', encoding='utf-8') as f:
    for i, line in enumerate(f, 1):
        parts = line.split('\t')
        if len(parts) != 3:
            print(f"Line {i}: Expected 3 columns, got {len(parts)}")
        if '<sup>' not in parts[2]:
            print(f"Line {i}: Missing tone markers")
```

## 📚 Best Practices

1. **Keep a backup** of your original TSV file
2. **Test with a small file first** (10-20 words)
3. **Review the output** before deploying
4. **Use consistent romanization** throughout
5. **Add vocabulary gradually** rather than all at once
6. **Document your romanization system** if using a custom one

## 🎯 Advanced: Batch Updates

To update from multiple TSV files:

```bash
# Convert each file
python scripts/convert_tsv_to_json.py vocab-part1.tsv
# This overwrites data/vocabulary.json

# To merge multiple files, combine them first:
cat vocab-part1.tsv vocab-part2.tsv > combined.tsv
python scripts/convert_tsv_to_json.py combined.tsv
```

## 🐍 Script Customization

The conversion script is at `scripts/convert_tsv_to_json.py`. You can modify it to:

- Change the output location
- Add custom validation rules
- Include additional metadata
- Support different input formats

Example: To save to a different location:
```python
# In the script, change:
output_path = Path('custom/path/vocabulary.json')
```

## ✅ Pre-Deployment Checklist

Before pushing your vocabulary update:

- [ ] Run the conversion script successfully
- [ ] Check that `data/vocabulary.json` was updated
- [ ] Review skipped entries (if any)
- [ ] Verify tone distribution looks correct
- [ ] Test locally (open `index.html` in browser)
- [ ] Commit and push to GitHub

## 🎓 Learning Resources

- [Thai Romanization Guide](https://en.wikipedia.org/wiki/Royal_Thai_General_System_of_Transcription)
- [Thai Tones Explained](https://www.thaipod101.com/thai-alphabet)
- [Creating TSV Files](https://en.wikipedia.org/wiki/Tab-separated_values)

---

**Happy updating! 🚀**

Questions? Check the main README.md or create an issue on GitHub.

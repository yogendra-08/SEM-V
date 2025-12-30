# Comprehensive Dataset Collection from AICTE

This project automates the collection of comprehensive datasets from the AICTE (All India Council for Technical Education) website. It uses Selenium WebDriver to scrape data for various programs, states, and years, and saves the results into CSV files for further analysis.

## Features
- Scrapes data for Pharmacy, Engineering and Technology, and Applied Arts and Crafts programs
- Collects data for all Indian states and union territories
- Supports multiple academic years and education levels (UG, PG, Diploma)
- Saves results in structured CSV files

## Requirements
- Python 3.7+
- Google Chrome browser
- [ChromeDriver](https://chromedriver.chromium.org/downloads) (matching your Chrome version)
- Required Python packages:
  - selenium
  - csv (standard library)
  - time (standard library)
  - os (standard library)

## Setup
1. **Install Python dependencies:**
   ```sh
   pip install selenium
   ```
2. **Download ChromeDriver:**
   - Download the version matching your Chrome browser from [here](https://chromedriver.chromium.org/downloads).
   - Extract and place the `chromedriver.exe` in a known directory (e.g., `C:\chromedriver-win64\chromedriver-win64\chromedriver.exe`).
   - Update the path in `final.py` if your location is different.

3. **Project Structure:**
   - `final.py`: Main scraping script
   - `csv_files/`: Raw CSVs
   - `cleaned_data/`: Cleaned CSVs
   - `xlsx_files/`: Excel exports
   - `data_cleaner.py`, `Convert-to-excel.py`: Data processing scripts

## Usage
1. **Run the scraper:**
   ```sh
   python final.py
   ```
   The script will open Chrome, navigate to the AICTE dashboard, and begin scraping data for all combinations of year, state, program, and level. Output will be saved in CSV files (e.g., `pharmacy_full_data.csv`).

2. **Interrupt/Resume:**
   - The script tracks already-scraped combinations and will skip them if re-run.

3. **Post-processing:**
   - Use the provided scripts to clean and convert data as needed.

## Notes
- Make sure Chrome and ChromeDriver versions match.
- Scraping large datasets may take significant time.
- For any issues, ensure all dependencies are installed and paths are correct.

 
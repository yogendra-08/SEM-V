import time
import csv 
import os
from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException, ElementClickInterceptedException

# --- Setup
chrome_options = Options()
chrome_options.add_argument("--start-maximized")
service = Service('C:\chromedriver-win64\chromedriver-win64\chromedriver.exe')
driver = webdriver.Chrome(service=service, options=chrome_options)

# --- Constants
URL = "https://facilities.aicte-india.org/dashboard/pages/angulardashboard.php#!/approved"

YEARS = [f"{y}-{y+1}" for y in range(2014, 2026)]  # 2014–2025

STATES = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh",
    "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Orissa", "Puducherry",
    "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
    "West Bengal"
]

# --- Programs to Run
PROGRAMS = {
    "Pharmacy": "pharmacy_data.csv"
    # "Engineering and Technology": "engineering_data.csv",  # ❌ Commented out
    # "Applied Arts and Crafts": "arts_data.csv"             # ❌ Commented out
}

LEVELS = ["UG", "PG", "Diploma"]

# --- Resume Tracker
def already_scraped_set(filename):
    done = set()
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            reader = csv.reader(f)
            next(reader, None)
            for row in reader:
                if len(row) >= 4:
                    done.add(tuple(row[:4]))
    return done

# --- Scraper
def scrape(year, state, program, level, writer):
    print(f"📍 {year} | {state} | {program} | {level}")
    try:
        driver.get(URL)
        time.sleep(2)

        Select(driver.find_element(By.ID, "year")).select_by_visible_text(year)
        Select(driver.find_element(By.ID, "state")).select_by_visible_text(state)
        Select(driver.find_element(By.ID, "program")).select_by_visible_text(program)
        Select(driver.find_element(By.ID, "level")).select_by_visible_text(level)

        try:
            driver.find_element(By.XPATH, '//button[text()="Submit"]').click()
        except ElementClickInterceptedException:
            driver.execute_script('document.querySelector("button[type=\'submit\']").click()')

        time.sleep(2)

        page = 1
        while True:
            print(f"   📄 Page {page}...")
            rows = driver.find_elements(By.XPATH, '//table//tbody/tr')
            for row in rows:
                data = [td.text.strip() for td in row.find_elements(By.TAG_NAME, 'td')]
                if data:
                    writer.writerow([year, state, program, level] + data)

            try:
                next_btn = driver.find_element(By.XPATH, '//a[text()="Next"]')
                if "disabled" in next_btn.get_attribute("class"):
                    break
                next_btn.click()
                time.sleep(1.5)
                page += 1
            except NoSuchElementException:
                break

    except Exception as e:
        print(f"❌ Skipped {year} | {state} | {program} | {level}: {e}")

# --- Loop Through Program (Only Pharmacy)
for program, filename in PROGRAMS.items():
    print(f"\n🗃️ Writing to: {filename}")
    done = already_scraped_set(filename)

    with open(filename, 'a', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)

        if os.stat(filename).st_size == 0:
            writer.writerow([
                "Year", "State", "Program", "Level",
                "College/University Name", "Type", "Affiliated University",
                "State", "City", "Courses Offered", "Intake Capacity",
                "Accreditation", "Approval Year"
            ])

        for year in YEARS:
            for state in STATES:
                for level in LEVELS:
                    key = (year, state, program, level)
                    if key in done:
                        print(f"⏩ Already done: {key}")
                        continue
                    scrape(year, state, program, level, writer)

# --- Finish
driver.quit()
print("\n✅ DONE: Only Pharmacy data saved.")

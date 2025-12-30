import pandas as pd
import os

# --- Create output folder
output_dir = "cleaned_data"
os.makedirs(output_dir, exist_ok=True)

# --- Files to clean
files = {
    "pharmacy_data.csv": "pharmacy_cleaned.csv",
    "engineering_data.csv": "engineering_cleaned.csv",
    "arts_data.csv": "arts_cleaned.csv"
}

# --- Clean each file
for file, output in files.items():
    try:
        print(f"🔍 Cleaning: {file}")
        df = pd.read_csv(file, encoding='utf-8')

        # Remove columns where all values are "Click Here" or NA
        df = df.loc[:, ~(df.apply(lambda col: col.astype(str).str.strip().eq("Click Here")).all())]

        # Remove completely empty columns
        df.dropna(axis=1, how='all', inplace=True)

        # Save cleaned file
        clean_path = os.path.join(output_dir, output)
        df.to_csv(clean_path, index=False, encoding='utf-8')
        print(f"✅ Saved: {clean_path}\n")

    except Exception as e:
        print(f"❌ Failed to clean {file}: {e}")

print("🎉 All files cleaned successfully.")

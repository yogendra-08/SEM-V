import pandas as pd
import os

# --- Input and output folders
input_dir = "cleaned_data"
output_dir = "xlsx_files"

# --- Create output folder if it doesn't exist
os.makedirs(output_dir, exist_ok=True)

# --- Loop through CSVs in cleaned_data/
for file in os.listdir(input_dir):
    if file.endswith(".csv"):
        csv_path = os.path.join(input_dir, file)
        xlsx_filename = file.replace(".csv", ".xlsx")
        xlsx_path = os.path.join(output_dir, xlsx_filename)

        try:
            print(f"📄 Converting: {file} → {xlsx_filename}")
            df = pd.read_csv(csv_path)
            df.to_excel(xlsx_path, index=False)
            print(f"✅ Saved: {xlsx_path}\n")
        except Exception as e:
            print(f"❌ Error with {file}: {e}")

print("🎉 All CSVs converted to Excel successfully.")

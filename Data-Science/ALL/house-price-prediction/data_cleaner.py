import pandas as pd
import os

# Define input and output file paths
input_path = 'Raw_Data/CSV_files/house_raw.csv'
output_path = 'Clean_Data/CSV_files/house_clean.csv'

# Create output directory if it doesn't exist
os.makedirs(os.path.dirname(output_path), exist_ok=True)

# Load raw dataset
df = pd.read_csv(input_path)

# Columns to drop
columns_to_drop = [
    'id',
    'Date',
    'Postal Code',
    'Lattitude',
    'Longitude',
    'living_area_renov',
    'lot_area_renov'
]

# Drop unwanted columns
df_clean = df.drop(columns=columns_to_drop)

# Save cleaned data
df_clean.to_csv(output_path, index=False)

print("✅ Data cleaned and saved to:", output_path)

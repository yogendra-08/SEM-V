# import pandas as pd
# import os

# # CSV file path
# csv_path = 'Clean_Data/CSV_files/house_clean.csv'

# # Excel output path
# excel_path = 'Clean_Data/xlsx_Files/house_clean.xlsx'

# # Create output directory if it doesn't exist
# os.makedirs(os.path.dirname(excel_path), exist_ok=True)

# # Load CSV
# df = pd.read_csv(csv_path)

# # Save as Excel
# df.to_excel(excel_path, index=False)

# print("✅ Converted to Excel:", excel_path)


import pandas as pd
import os

# CSV file path (Raw Data)
csv_path = 'Raw_Data/CSV_files/house_raw.csv'

# Excel output path
excel_path = 'Raw_Data/xlsx_Files/house_raw.xlsx'

# Create output directory if it doesn't exist
os.makedirs(os.path.dirname(excel_path), exist_ok=True)

# Load CSV
df = pd.read_csv(csv_path)

# Save as Excel
df.to_excel(excel_path, index=False)

print("✅ Raw CSV converted to Excel:", excel_path)


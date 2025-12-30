# House Price Prediction Project

## Overview
This project focuses on predicting house prices using machine learning techniques. It includes data cleaning, exploratory data analysis (EDA), and model building to predict housing prices based on various features like square footage, number of bedrooms, location, and more.

## Project Structure
```
house-price-prediction/
├── Clean_Data/               # Processed and cleaned data
│   ├── CSV_files/
│   └── xlsx_Files/
├── Notebook/                 # Jupyter notebooks for analysis
│   ├── eda_house_price.ipynb
│  
├── Raw_Data/                 # Original raw data
│   ├── CSV_files/
│   └── xlsx_Files/
├── docs/                     # Project documentation
├── imgs/                     # Visualization images
├── csv_to_excel_converter.py # Utility script for file conversion
└── data_cleaner.py           # Data cleaning script
```

## Dataset
### Features
- Number of bedrooms
- Number of bathrooms
- Living area (sq ft)
- Lot area (sq ft)
- Number of floors
- Waterfront present (binary)
- Number of views
- Condition of the house (1-5 scale)
- Grade of the house (4-13 scale)
- Area of the house (excluding basement)
- Area of the basement
- Built year
- Renovation year
- Number of schools nearby
- Distance from the airport
- **Target Variable**: Price

## Getting Started

### Prerequisites
- Python 3.7+
- Required Python packages (install via `pip install -r requirements.txt`):
  - pandas
  - numpy
  - matplotlib
  - seaborn
  - scikit-learn
  - jupyter

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd house-price-prediction
   ```

2. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

### Data Cleaning
Run the data cleaning script to process the raw data:
```bash
python data_cleaner.py
```

### Exploratory Data Analysis
Open and run the Jupyter notebook for EDA:
```bash
jupyter notebook Notebook/eda_house_price.ipynb
```

### Model Building
Access the model building notebook:
```bash
jupyter notebook Notebook/house_price_model.ipynb
```

## Key Findings
- Correlation between house features and price
- Impact of location and house characteristics on pricing
- Model performance metrics and evaluation

## Results
- Visualization of price distribution
- Feature importance analysis
- Model accuracy and predictions

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Dataset source: [Insert source if applicable]
- Inspired by [Insert any references or inspirations]

import pandas as pd

def load_csv(file_path):
    try:
        return pd.read_csv(file_path)
    except FileNotFoundError:
        raise Exception("CSV file not found")

services_df = load_csv('services.csv')


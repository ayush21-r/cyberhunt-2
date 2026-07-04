import pandas as pd
import json
import os

def update_users():
    excel_path = 'Cyber_Hunt.xlsx'
    output_path = os.path.join('backend', 'users.json')
    
    if not os.path.exists(excel_path):
        print(f"Error: {excel_path} not found.")
        return

    # Load spreadsheet
    print(f"Reading {excel_path}...")
    df = pd.read_excel(excel_path)
    
    # We saw these column names: 'Email Address  ' and 'Team-Code'
    email_col = 'Email Address  '
    code_col = 'Team-Code'
    
    if email_col not in df.columns or code_col not in df.columns:
        print(f"Error: Required columns not found. Columns are: {df.columns.tolist()}")
        return
        
    # Extract, drop nulls, and clean
    df_clean = df[[email_col, code_col]].dropna()
    
    users = []
    
    # Process each row
    for _, row in df_clean.iterrows():
        email = str(row[email_col]).strip().lower()
        code = str(row[code_col]).strip()
        
        # Skip if either is empty
        if not email or not code:
            continue
            
        users.append({
            "id": email,
            "password": code
        })
        
    # Add the testing account: test@example.com / password123
    test_user = {
        "id": "test@example.com",
        "password": "password123"
    }
    
    # Ensure test user is not duplicated, then append it
    if not any(u['id'] == test_user['id'] for u in users):
        users.append(test_user)
        
    # Write to backend/users.json
    print(f"Writing {len(users)} users to {output_path}...")
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(users, f, indent=2, ensure_ascii=False)
        
    print("Update complete successfully.")

if __name__ == '__main__':
    update_users()

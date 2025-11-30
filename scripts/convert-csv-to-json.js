const fs = require('fs');
const path = require('path');

// Function to parse CSV line (handles quoted fields with commas)
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++; // Skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

// Function to read and parse CSV file
function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim() !== '');
  
  if (lines.length === 0) {
    return { headers: [], rows: [] };
  }
  
  const headers = parseCSVLine(lines[0]);
  const rows = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === headers.length) {
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || null;
      });
      rows.push(row);
    }
  }
  
  return { headers, rows };
}

// Convert agencies CSV to JSON
function convertAgencies() {
  const csvPath = path.join(__dirname, '../data/agencies_agency_rows.csv');
  const jsonPath = path.join(__dirname, '../data/agencies.json');
  
  console.log('Reading agencies CSV...');
  const { rows } = parseCSV(csvPath);
  
  console.log(`Found ${rows.length} agencies`);
  
  const agencies = rows.map((row, index) => {
    // Extract city name from agency name (remove "City of", "County", etc.)
    let city = row.name || 'Unknown';
    city = city.replace(/^City of /i, '').replace(/ County$/i, '').trim();
    
    // Format date to ISO 8601
    let createdAt = row.created_at || new Date().toISOString();
    if (createdAt && !createdAt.includes('T')) {
      // Convert PostgreSQL timestamp to ISO format
      createdAt = createdAt.replace(' ', 'T');
      if (!createdAt.endsWith('Z') && !createdAt.includes('+')) {
        createdAt += 'Z';
      }
    }
    
    return {
      id: row.id || `AGY${String(index + 1).padStart(3, '0')}`,
      city: city || row.name || 'Unknown',
      address: row.physical_address || row.mailing_address || null,
      createdAt: createdAt
    };
  });
  
  fs.writeFileSync(jsonPath, JSON.stringify(agencies, null, 2), 'utf-8');
  console.log(`✅ Converted ${agencies.length} agencies to ${jsonPath}`);
  
  return agencies;
}

// Convert contacts CSV to JSON
function convertContacts() {
  const csvPath = path.join(__dirname, '../data/contacts_contact_rows.csv');
  const jsonPath = path.join(__dirname, '../data/contacts.json');
  
  console.log('Reading contacts CSV...');
  const { rows } = parseCSV(csvPath);
  
  console.log(`Found ${rows.length} contacts`);
  
  const contacts = rows.map((row, index) => ({
    id: row.id || `CON${String(index + 1).padStart(3, '0')}`,
    name: `${row.first_name || ''} ${row.last_name || ''}`.trim() || 'Unknown',
    phone: row.phone || '',
    email: row.email || '',
    agencyId: row.agency_id || '',
    position: row.title || row.department || 'N/A'
  }));
  
  // Filter out contacts without agencyId
  const validContacts = contacts.filter(contact => contact.agencyId);
  
  fs.writeFileSync(jsonPath, JSON.stringify(validContacts, null, 2), 'utf-8');
  console.log(`✅ Converted ${validContacts.length} contacts to ${jsonPath}`);
  console.log(`   (Filtered out ${contacts.length - validContacts.length} contacts without agencyId)`);
  
  return validContacts;
}

// Main execution
console.log('🚀 Starting CSV to JSON conversion...\n');

try {
  const agencies = convertAgencies();
  console.log('');
  const contacts = convertContacts();
  
  console.log('\n✅ Conversion completed successfully!');
  console.log(`   - Agencies: ${agencies.length}`);
  console.log(`   - Contacts: ${contacts.length}`);
} catch (error) {
  console.error('❌ Error during conversion:', error);
  process.exit(1);
}


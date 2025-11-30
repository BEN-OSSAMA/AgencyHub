const agencies = require('../data/agencies.json');
const contacts = require('../data/contacts.json');

const agencyIds = new Set(agencies.map(a => a.id));
const validContacts = contacts.filter(c => agencyIds.has(c.agencyId));
const invalidContacts = contacts.filter(c => !agencyIds.has(c.agencyId));

console.log('📊 Rapport de correspondance des données:');
console.log('   - Total agencies:', agencies.length);
console.log('   - Total contacts:', contacts.length);
console.log('   - Contacts avec agency valide:', validContacts.length, `(${Math.round(validContacts.length/contacts.length*100)}%)`);
console.log('   - Contacts avec agency invalide:', invalidContacts.length, `(${Math.round(invalidContacts.length/contacts.length*100)}%)`);

if (invalidContacts.length > 0) {
  console.log('\n⚠️  Note: Certains contacts référencent des agencies qui ne sont pas dans le fichier agencies.json.');
  console.log('   L\'application affichera "Unknown" pour ces agencies.');
  console.log('\n   Exemples de contacts avec agency invalide:');
  invalidContacts.slice(0, 3).forEach(c => {
    console.log(`   - ${c.name} (agencyId: ${c.agencyId})`);
  });
}


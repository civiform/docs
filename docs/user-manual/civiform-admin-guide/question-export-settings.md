# Question Export Settings

When a CiviForm Admin creates a question, they must choose an export setting. The export setting controls whether data will be exported in the demography CSV, which is the CiviForm Admin's exported data. The export setting does not affect the Program Admin's exported data. The CiviForm Admin selects one of the following data export options:

**Don't include in demographic export** - the answer won't appear in any way in the exported data.

**Include in demographic export** - the raw answer as provided by the applicant will appear in the exported data.

**Obfuscate and include in demographic export** - the raw answer as provided by the applicant will not appear in the exported data, and instead, an "obfuscated" answer will appear. Obfuscated means that the applicant's answer to the question is cryptographically obscured, exporting text that is unique to the applicant's answer but does not reveal what the original text was. It is impossible to derive the applicant's original input from the resulting exported value. Only other questions with the exact same answer will have the same exported value. 

For example, in a social security number question, the following inputs would result in the corresponding outputs: 

Input: 123-45-6789 Example obfuscated output: d158596dd5a6cae6fcb282832885631553ecc8c8b0bf07f84c4aa691953cd0da 

Input: 123-45-6780 Example obfuscated output: 01ba4719c80b6fe911b091a7c05124b64eeece964e09c058ef8f9805daca546b
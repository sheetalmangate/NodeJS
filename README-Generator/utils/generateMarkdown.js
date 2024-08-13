// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {

  const badge = '';

  switch( license ) {
    case 'MIT' :
      badge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
      break;
    case 'GNU GPL v2' :
      badge = '[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)';
      break;
    case 'GNU GPL v3' :
      badge = '[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)';
      break;
    case 'Apache 2.0 License' :
      badge = '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
      break;      
    case 'none' :
    case 'default' :
      break;
  }
  return badge;

}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  const licenseLink = '';

  switch( license ) {
    case 'MIT' :
      licenseLink = 'https://opensource.org/licenses/MIT';
      break;
    case 'GNU GPL v2' :
      licenseLink = 'https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html';
      break;
    case 'GNU GPL v3' :
      licenseLink = 'https://www.gnu.org/licenses/agpl-3.0';
      break;
    case 'Apache 2.0 License' :
      licenseLink = 'https://opensource.org/licenses/Apache-2.0';
      break;      
    case 'none' :
    case 'default' :
      break;
  }
  return licenseLink;
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  
  return `# ${data.title}  

${
    (data.desc.trim() === "" ) ? "" : `## Description
  ${data.desc}`
}
  ## Table of Contents
  ${(data.installation.trim() === "" ) ? "" : `[Installation](#Installation)\n`}
  ${(data.usage.trim() === "" ) ? "" : `[Usage](#Usage)\n`}
  ${(data.contribution.trim() === "" ) ? "" : `[Contribution](#Contribution)\n`}
  ${(data.test.trim() === "" ) ? "" : `[Test](#Test)\n`}

${
  (data.installation.trim() === "" ) ? "" : "## Installation\n  "+data.installation
}

${
  (data.usage.trim() === "" ) ? "" : "## Usage\n  "+data.usage
}
${
  (data.contribution.trim() === "" ) ? "" : "## Contribution\n  "+data.contribution
}
${
  (data.test.trim() === "" ) ? "" : `## Test\n  ${data.test}`
}
## Questions
  For any question please reach out!\n
${
  (data.email.trim() === "" ) ? "" : `  Email : ${data.email}\n`
}
${
  (data.github.trim() === "" ) ? "" : ` GitHub : ${data.github}\n` 
}

`;

}

export default generateMarkdown;

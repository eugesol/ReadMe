const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");


// array of questions for user
function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Enter the title of your project: ",
        },
        {
            type: "input",
            name: "description",
            message: "Add a description: ",
        },
        {
            type: "input",
            name: "installation",
            message: "Installation instructions: ",
            default: "npm i",

        },
        {
            type: "input",
            name: "usage",
            message: "Usage instructions: ",
        },
        {
            type: "list",
            name: "license",
            message: "Select your license",
            choices: [
                "Artistic license 2.0",
                "Boost Software License 1.0",
                'Eclipse Public License 1.0',
                'MIT',
                'Mozilla Public License 2.0',
            ]
        },
        {
            type: "input",
            name: "contributions",
            message: "Enter contributions: "
        },
        {
            type: "input",
            name: "test",
            message: "Enter test instructions: "
        },
        {
            type: "input",
            name: "github",
            message: "Enter yout GitHub username: "
        },
        {
            type: "input",
            name: "email",
            message: "Enter yout email address: "
        },


    ]);
}

const selectedLicense = (answers) => {
    switch (answers.license) {
        case 'Artistic license 2.0':
            return '[![License: Artistic-2.0](https://img.shields.io/badge/License-Artistic%202.0-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)';
        case 'Boost Software License 1.0':
            return '[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)';
        case 'Eclipse Public License 1.0':
            return '[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)';
        case 'MIT':
            return '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
        case 'Mozilla Public License 2.0':
            return '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)';

    }
}

const readmeText = (answers) => {
    return `
# ${answers.title}     ${selectedLicense(answers)}

${answers.description}
    
## Table of Contents
    
1. [Installation](#installation)
2. [Usage](#usage)
3. [Contributions](#contributions)
4. [Test](#test)
5. [Questions](#questions)
6. [License](#license)
    
# Installation
${answers.installation}
# Usage
${answers.usage}
# Contributing
${answers.contributions}
# Test
${answers.test}
# Questions
Please direct any questions to: ${answers.email}
---
Github: [${answers.github}](https://github.com/${answers.github})
## License

`
}


const writeFileAsync = util.promisify(fs.writeFile);

promptUser()
    .then(function (answers) {
        const readme = readmeText(answers);
        return writeFileAsync(`${answers.title.split(" ").join("-")}-README.md`, readme);
    })
    .catch(function (err) {
        console.log(err);
    });


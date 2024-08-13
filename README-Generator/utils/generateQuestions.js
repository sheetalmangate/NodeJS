
function generateQuestions() {
    
    const questions = [
        {
            type : 'input',
            message : 'Enter Project Title',
            name : 'title',
        },
        {
            type : 'editor',
            message : 'Enter Description',
            name : 'desc',
        },
        {
            type : 'editor',
            message : 'Enter Installation Instructions',
            name : 'installation',
        },
        {
            type : 'input',
            message : 'Enter Usage Information',
            name : 'usage',
        },
        {
            type : 'input',
            message : 'Enter Contribution Guidelines',
            name : 'contribution',
        },
        {
            type : 'input',
            message : 'Enter Test Instruction',
            name : 'test',
        },
        {
            type : 'list',
            message : 'Select License',
            name : 'license',
            choices : ['MIT','GNU GPL v2','GNU GPL v3','Apache 2.0 License'],
        },
        {
            type : 'input',
            message : 'Enter email',
            name : 'email',
        },
        {
            type : 'input',
            message : 'Enter GitHub username',
            name : 'github',
        },
        

        
    ];

    return questions;
}

export default generateQuestions;
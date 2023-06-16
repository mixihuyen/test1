const json2html = require('node-json2html');
const fs = require('fs');

let template_table_header = {
    "<>": "tr", "html": [
        {"<>": "th", "html": "App Name"},
        {"<>": "th", "html": "Accessibility"},
        {"<>": "th", "html": "Best Practices"},
        {"<>": "th", "html": "SEO"},
        {"<>": "th", "html": "Performance"}
    ]
}

let template_table_body = {
    "<>": "tr", "html": [
        {"<>": "td", "html": "${App Name}"},
        {"<>": "td", "html": "${Accessibility}"},
        {"<>": "td", "html": "${Best Practices}"},
        {"<>": "td", "html": "${SEO}"},
        {"<>": "td", "html": "${Performance}"}
    ]
}

let myJSON = [
    {
        "App Name": "Yahoo",
        "Accessibility": 94,
        "Best Practices": 93,
        "SEO": 90,
        "Performance": 54
    },{
        "App Name": "Google",
        "Accessibility": 89,
        "Best Practices": 86,
        "SEO": 80,
        "Performance": 41
    },{
        "App Name": "Guardian UK",
        "Accessibility": 89,
        "Best Practices": 86,
        "SEO": 80,
        "Performance": 41
    }
]

writeHtmlFromScoresJson(myJSON, 'outfile.html')

async function writeHtmlFromScoresJson(jsonFile, htmlTableFile) {
    // let data = fs.readJsonSync(jsonFile);
    let data = jsonFile;

    let table_header = json2html.transform(data[0], template_table_header);
    let table_body = json2html.transform(data, template_table_body);

    let header = '<!DOCTYPE html>' + '<html lang="en">\n' + '<head><title>Lighthouse Report</title></head>'
    let body = '<h1>My Report</h1><br><table id="my_table">\n<thead>' + table_header + '\n</thead>\n<tbody>\n' + table_body + '\n</tbody>\n</table>'
    body = '<body>' + body + '</body>'

    let html = header + body + '</html>';

    fs.writeFile(htmlTableFile,html, (err)=>{
        console.log(err);
    });
}
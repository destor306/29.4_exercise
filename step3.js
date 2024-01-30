const fs = require('fs');
const process = require('process');
const axios = require('axios');


function cat(path){
    fs.readFile(path, 'utf8', function(err,data){
        if (err){
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        console.log(data);
    })
};


async function webCat(url){
    try {
        let resp = await axios.get(url);
        console.log(resp.data);
    }
    catch(err){
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

function catw(new_file, old_file){
    let new_data;
    fs.readFile(old_file,'utf8', function(err,data){
        if (err){
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        new_data = data
    })
    fs.writeFile(new_file, new_data, 'utf8', (err)=>{
        if(err){
            console.err("ERROR", err)
            process.kill(1);
        }
    })
    console.log(`no output, but ${new_file} contains contents of ${old_file}`);

}

async function webCatw(url, new_file){
    try{
        let resp = await axios.get(url);
        //console.log(resp.data);
        await fs.writeFile(new_file, resp.data, 'utf8', function(err){
            if (err){
                console.error(`Couldn't write ${new_file}: ${err}`)
                process.exit(1);
            }
        });
        console.log(`no output, but ${new_file} contains ${url}'s HTML`);
    }
    catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}


if ((process.argv.length) <4){
    let path = process.argv[2];
    if (path.slice(0,4) == 'http'){
        webCat(path);
    }
    else{
        cat(path);
    }
}
else if (process.argv[2] =='--out'){
    let path = process.argv[4];
    let new_file = process.argv[3]

    if (path.slice(0,4) == 'http'){
        webCatw(path, new_file);
    }
    else{

            catw(new_file, path);
        }
        
}    



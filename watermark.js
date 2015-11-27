var gm = require('gm');
var fs = require('fs');
var gravity = process.argv[2];
var folderName = require('path').dirname(require.main.filename);
var photosFolderName = folderName + '/photos/';
var mkdirSync = function (path) {
    try {
        fs.mkdirSync(path);
    } catch(e) {
        if ( e.code != 'EEXIST' ) throw e;
    }
}
//"NorthWest|North|NorthEast|West|Center|East|SouthWest|South|SouthEast"
function isPhoto(filename) {
    return (/\.(gif|jpg|jpeg|tiff|png)$/i).test(filename)
}

mkdirSync(folderName + '/watermarked');

fs.readdir(photosFolderName, function (err, filenames) {
    filenames.forEach(function (filename) {
        if (!isPhoto(filename)) return;
        var writeStream = fs.createWriteStream(folderName + '/watermarked/' + filename)
        gm(photosFolderName + filename)
            .composite(folderName + '/dani_watermark.png')
            .gravity(gravity)
            .stream()
            .pipe(writeStream);
    });
});

// const less = require('less');
// const { join } = require('path');
// const cwd = process.cwd();
// const styleFile = join(cwd, 'src', 'style.less');
// console.log(styleFile)
// less.render(require(styleFile))
//   .then(function (output) {
//     console.log(output);
//   })
//   .catch(function (err) {
//     console.error(err);
//   })

const { exec } = require('child_process');
exec('npm run build-less', (err, stdout, stderr) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`stdout: ${stdout}`)
  console.log(`stderr: ${stderr}`)
})
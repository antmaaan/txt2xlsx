const json2xls = require('json2xls');
const fs = require('fs');
const gui = require('nw.gui');
gui.Window.get().show();
function start(){
  
  var dirArr = fs.readdirSync('C:/dust/text');
  var jsonArr = [];
  for(var filename of dirArr){
    var text = fs.readFileSync('C:/dust/text/'+filename,'utf-8');
    var splitByln = text.split('\n');
    var smallUm = splitByln[1].split(':')[1].trim();
    var bigUm = splitByln[2].split(':')[1].trim();
    var at = splitByln[3].split('RH:')[0].split(':')[1].trim();
    var rh = splitByln[3].split('RH:')[1].trim();
    var dp = splitByln[4].split('WB:')[0].split(':')[1].trim();
    var wb = splitByln[4].split('WB:')[1].trim();
    var json = {
      'time':filename,
      '2dot5um':smallUm,
      '10um':bigUm,
      'AT':at,
      'RH':rh,
      'DP':dp,
      'WB':wb
    }
    jsonArr.push(json);
  }
  var xls = json2xls(jsonArr);
  fs.writeFileSync('C:/dust/result/data.xlsx', xls, 'binary');
}

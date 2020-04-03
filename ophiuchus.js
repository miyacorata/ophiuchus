function getMastodonServerInfo(serverUri, targetId){
    const endpoint = '/api/v1/instance';
    var target = document.getElementById(targetId);
    fetch('https://'+serverUri+endpoint).then(function(res){
        return res.json();
    }).then((data)=>{
        console.dir(data);
        target.innerHTML = ''; // 初期化
        target.appendChild(createKeyValueColumn('Title',data.title));
        target.appendChild(createKeyValueColumn('Version',data.version));
        target.appendChild(createKeyValueColumn('User',data.stats.user_count+' Users'));
        target.appendChild(createKeyValueColumn('Status',data.stats.status_count+' Toots'));
        //target.appendChild(createKeyValueColumn('Domain',data.stats.domain_count+' Domains'));
        document.getElementById(targetId+'_title').classList.add('online');
    }).catch((err)=>{
        target.innerHTML = "<tr><td colspan='3'>Fetch operation failed<br>"+err.message+"</td></tr>";
        document.getElementById(targetId+'_title').classList.add('error');
    });
}

function getMisskeyServerInfo(serverUri, targetId){
    const metaEndpoint = '/api/meta';
    const statsEndpoint = '/api/stats';
    var target = document.getElementById(targetId);
    target.innerHTML = ''; // 初期化
    fetch('https://'+serverUri+metaEndpoint,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    }).then(function(res){
        return res.json();
    }).then((data)=>{
        console.dir(data);
        target.appendChild(createKeyValueColumn('Title',data.name));
        target.appendChild(createKeyValueColumn('Version',data.version));
    }).then(()=>{
        fetch('https://'+serverUri+statsEndpoint,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res){
            return res.json();
        }).then((data)=>{
            console.dir(data);
            target.appendChild(createKeyValueColumn('User',data.originalUsersCount+' Users'));
            target.appendChild(createKeyValueColumn('Notes',data.originalNotesCount+' Notes'));
            //target.appendChild(createKeyValueColumn('Instance',data.instances+' Instances'));
        });
        document.getElementById(targetId+'_title').classList.add('online');
    }).catch((err)=>{
        console.dir(err);
        target.innerHTML = "<tr><td colspan='2' style='border:solid 1.5px red;color:red;'>Fetch operation failed</td><td></td></tr>";
        target.appendChild(createKeyValueColumn('Stack',err.stack));
        target.appendChild(createKeyValueColumn('Message',err.message));
        document.getElementById(targetId+'_title').classList.add('error');
    });
    
}

function createKeyValueColumn(key, value){
    var tr = document.createElement('tr');
    var keyElement = document.createElement('td');
    keyElement.innerHTML = key;
    tr.appendChild(keyElement);
    var valueElement = document.createElement('td');
    valueElement.innerHTML = value;
    tr.appendChild(valueElement);
    var md5Element = document.createElement('td');
    md5Element.innerHTML = md5(value);
    tr.appendChild(md5Element);
    return tr;
}

function resizeWindow(){
    var height = window.innerHeight / 1080;
    var width  = window.innerWidth  / 1920;
    var scale  = (height > width) ? width : height;
    var origin = (height > width) ? 'left top' : 'calc(960px - 50vw) top';
    document.getElementById('app').setAttribute('style','transform: scale('+scale+'); transform-origin: '+origin);
}

document.addEventListener('DOMContentLoaded',()=>{
    console.log('Ophiuchs Initializing...');
    resizeWindow();
    window.onresize = resizeWindow;
    getMastodonServerInfo('mstdn.miyacorata.net','miyano_sta');
    getMastodonServerInfo('imastodon.net','imastodon');
    getMisskeyServerInfo('twista.283.cloud','twista');
    getMisskeyServerInfo('misskey.kurume-nct.com','prolabmisskey');
});
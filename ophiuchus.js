function getMastodonServerInfo(serverUri, targetId){
    const endpoint = '/api/v1/instance';
    fetch('https://'+serverUri+'/api/v1/instance').then(function(res){
        return res.json();
    }).then((data)=>{
        console.dir(data);
        var target = document.getElementById(targetId);
        target.innerHTML = ''; // 初期化
        target.appendChild(createKeyValueColumn('Title',data.title));
        target.appendChild(createKeyValueColumn('Version',data.version));
        target.appendChild(createKeyValueColumn('User',data.stats.user_count+' Users'));
        target.appendChild(createKeyValueColumn('Status',data.stats.status_count+' Toots'));
        target.appendChild(createKeyValueColumn('Domain',data.stats.domain_count+' Domains'));
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

document.addEventListener('DOMContentLoaded',()=>{
    getMastodonServerInfo('mstdn.miyacorata.net','miyano_sta');
});
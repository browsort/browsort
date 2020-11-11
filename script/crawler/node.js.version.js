// TARGET: https://nodejs.org/en/download/releases/

function crawler() {
    let entries = {};

    let path_tr = '//div[@id="main"]//table/tbody/tr[position()>1]';
    let tr = document.evaluate(path_tr, document, null, XPathResult.ANY_TYPE, null);

    let x = tr.iterateNext();

    while (x) {
        let path_td = './/td';
        var td = document.evaluate(path_td, x, null, XPathResult.ANY_TYPE, null);

        let y = td.iterateNext();
        let i = 0;
        let version = '';
        while (y) {
            let content = y.innerText.trim();
            switch (i) {
                case 0:
                    content = content.replace('Node.js', '').replace('io.js', '').trim();
                    version = content.split('.').slice(0,2).join('.');
                    break;
                case 2:
                    entries[version] = content + 'T00:00:00Z';
                    break;
            }
            y = td.iterateNext();
            i++;
        }

        x = tr.iterateNext();
    }

    return JSON.stringify(sortByKey(entries));
}

function sortByKey(obj) {
    let ordered = {};
    Object.keys(obj).sort(function (a, b) {
        if (Number(a) < Number(b)) {
            return -1;
        }

        if (Number(a) > Number(b)) {
            return 1;
        }

        return 0;
    }).forEach(function(key) {
        ordered[key] = obj[key];
    });

    return ordered;
}

console.log(crawler());

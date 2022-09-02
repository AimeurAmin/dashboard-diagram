
var baseurl = 'http://127.0.0.1:8000'
// CommentModel/

const getAllComments = async () => {
    var response = null
    await fetch(baseurl + '/CommentModel/').then(async (data) => {
		response = await data.json();
	}).catch(e => {
		console.error('something went wrong with the request to the classifier! => check the log below: \n' + e);
	})
    return response;
}

const getAllWilayas = async () => {
    var response = null
    await fetch(baseurl + '/CityModel/').then(async (data) => {
		response = await data.json();
	}).catch(e => {
		console.error('something went wrong with the request to the classifier! => check the log below: \n' + e);
	})

    return response
}

getAllComments();

const getClassificationByWilaya = async (wilaya_code) => {
    const allComments = await getAllComments();
    const wilayas = await getAllWilayas();
    const wilayasClassifications = {}
    wilayas.forEach(wilaya => {
        wilayasClassifications[wilaya.city_name] = {
            positif: 0,
            negatif: 0
        }
    });

    allComments.forEach(comment => {
        if(comment.calssification === 'positif') {
            wilayasClassifications[comment.user.city.city_name]['positif'] = (wilayasClassifications[comment.user.city.city_name].positif | 0) + 1
        }
        if(comment.classification === 'else') {
            wilayasClassifications[comment.user.city.city_name].negatif = (wilayasClassifications[comment.user.city.city_name].positif | 0) + 1
        }
    })

    return wilayasClassifications
}



const maxPercentage = 65
const CSATs = [{
    wilaya: 'Adrar',
    CSAT: 25
}, {
    wilaya: 'Chlef',
    CSAT: 45
}, {
    wilaya: 'Alger',
    CSAT: 65
}, {
    wilaya: 'Oran',
    CSAT: 55
}, {
    wilaya: 'Oran',
    CSAT: 55
},{
    wilaya: 'Adrar',
    CSAT: 25
}, {
    wilaya: 'Chlef',
    CSAT: 45
}, {
    wilaya: 'Alger',
    CSAT: 65
}, {
    wilaya: 'Oran',
    CSAT: 55
}, {
    wilaya: 'Oran',
    CSAT: 55
},{
    wilaya: 'Adrar',
    CSAT: 25
}, {
    wilaya: 'Chlef',
    CSAT: 45
}, {
    wilaya: 'Alger',
    CSAT: 65
}, {
    wilaya: 'Oran',
    CSAT: 55
}, {
    wilaya: 'Oran',
    CSAT: 55
},{
    wilaya: 'Adrar',
    CSAT: 25
}, {
    wilaya: 'Chlef',
    CSAT: 45
}, {
    wilaya: 'Alger',
    CSAT: 65
}, {
    wilaya: 'Oran',
    CSAT: 55
}, {
    wilaya: 'Oran',
    CSAT: 55
},{
    wilaya: 'Adrar',
    CSAT: 25
}, {
    wilaya: 'Chlef',
    CSAT: 45
}, {
    wilaya: 'Alger',
    CSAT: 65
}, {
    wilaya: 'Oran',
    CSAT: 55
}, {
    wilaya: 'Oran',
    CSAT: 55
},{
    wilaya: 'Adrar',
    CSAT: 25
}, {
    wilaya: 'Chlef',
    CSAT: 45
}, {
    wilaya: 'Alger',
    CSAT: 65
}, {
    wilaya: 'Oran',
    CSAT: 55
}, {
    wilaya: 'Oran',
    CSAT: 55
},{
    wilaya: 'Adrar',
    CSAT: 25
}, {
    wilaya: 'Chlef',
    CSAT: 45
}, {
    wilaya: 'Alger',
    CSAT: 65
}, {
    wilaya: 'Oran',
    CSAT: 55
}, {
    wilaya: 'Oran',
    CSAT: 55
},{
    wilaya: 'Adrar',
    CSAT: 25
}, {
    wilaya: 'Chlef',
    CSAT: 45
}, {
    wilaya: 'Alger',
    CSAT: 65
}, {
    wilaya: 'Oran',
    CSAT: 55
}, {
    wilaya: 'Oran',
    CSAT: 55
},{
    wilaya: 'Adrar',
    CSAT: 25
}, {
    wilaya: 'Chlef',
    CSAT: 45
}, {
    wilaya: 'Alger',
    CSAT: 65
}, {
    wilaya: 'Oran',
    CSAT: 55
}, {
    wilaya: 'Oran',
    CSAT: 55
},{
    wilaya: 'Adrar',
    CSAT: 25
}, {
    wilaya: 'Chlef',
    CSAT: 45
}, {
    wilaya: 'Alger',
    CSAT: 65
}, {
    wilaya: 'Oran',
    CSAT: 55
}, {
    wilaya: 'Oran',
    CSAT: 55
},{
    wilaya: 'Adrar',
    CSAT: 25
}, {
    wilaya: 'Chlef',
    CSAT: 45
}, {
    wilaya: 'Alger',
    CSAT: 65
}, {
    wilaya: 'Oran',
    CSAT: 55
}, {
    wilaya: 'Oran',
    CSAT: 55
},
]
var numberOfLines = Math.ceil(maxPercentage / 10);
console.log('here');
var container = document.getElementById('parameter')


for (let i = 1; i <= numberOfLines; i++) {
    var line = document.createElement('div')
    line.classList.add('line')
    line.style.bottom = (i*(100 / numberOfLines)) + '%'
    container.appendChild(line)
}

var spacing = 1
CSATs.forEach(element => {
    var barContainer = document.createElement('div');
    var bar = document.createElement('div');
    var csat = document.createElement('div');
    var wilayaName = document.createElement('div');

    barContainer.classList.add('bar-container');
    bar.classList.add('bar');
    csat.classList.add('csat');
    wilayaName.classList.add('wilaya-name')
    
    barContainer.style.left = spacing + '%';
    barContainer.style.height = parseInt(element.CSAT) * 100 / (numberOfLines * 10) + '%';
    if(element.CSAT >= 65) {
        bar.style.backgroundColor = '#39b150';
    } else if(element.CSAT >= 60) {
        bar.style.backgroundColor = '#92d050';
    } else if (element.CSAT >= 55) {
        bar.style.backgroundColor = '#92d050';
    } else if (element.CSAT < 55) {
        bar.style.backgroundColor = '#f51d03';
    }
    spacing += 1.8;
    
    csat.innerHTML = element.CSAT
    wilayaName.innerHTML = element.wilaya

    barContainer.appendChild(bar);
    barContainer.appendChild(csat);
    barContainer.appendChild(wilayaName);
    container.appendChild(barContainer);
});


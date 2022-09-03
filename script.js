
var baseurl = 'http://127.0.0.1:8000'
// CommentModel/

async function getAllComments() {
    var response = null
    await fetch(baseurl + '/CommentModelShow/').then(async (data) => {
		response = await data.json();
	}).catch(e => {
		console.error('something went wrong with the request to the classifier! => check the log below: \n' + e);
	})
    return response;
}

async function getAllWilayas() {
    var response = null
    await fetch(baseurl + '/CityModel/').then(async (data) => {
		response = await data.json();
	}).catch(e => {
		console.error('something went wrong with the request to the classifier! => check the log below: \n' + e);
	})

    return response
}


var allClassifications = [];

const getClassificationByWilaya = async () => {
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
        } else  {
            console.log((wilayasClassifications[comment.user.city.city_name].negatif | 0) + 1);
            wilayasClassifications[comment.user.city.city_name]['negatif'] = (wilayasClassifications[comment.user.city.city_name].negatif | 0) + 1
        }
    })

    return wilayasClassifications
}




var maxPercentage = 0

var numberOfLines = Math.ceil(maxPercentage / 10);
var container = document.getElementById('parameter')

var spacing = 1

async function calculateCSATs() {
    const wilayasClassifications = await getClassificationByWilaya();
    const wilayas = await getAllWilayas();
    console.log(wilayasClassifications);
    console.log(wilayas);
    const CSATs = []
    wilayas.forEach(wilaya => {
        const positif =  wilayasClassifications[wilaya.city_name].positif
        const total = positif + wilayasClassifications[wilaya.city_name].negatif
        const CSAT = Math.floor((total ? positif / total : 0) * 100)
        console.log(positif);
        console.log(positif / (total | 1));
        console.log(CSAT);
        if(CSAT > maxPercentage) {
            maxPercentage = CSAT
        }
        CSATs.push({
            wilaya: wilaya.city_name,
            CSAT
        })
    });
    console.log(CSATs);
    return CSATs
}
async function visualizeCharts() {
    const CSATs = await calculateCSATs();
    var numberOfLines = Math.ceil(maxPercentage / 10);


    for (let i = 1; i <= numberOfLines; i++) {
        var line = document.createElement('div')
        line.classList.add('line')
        line.style.bottom = (i*(100 / numberOfLines)) + '%'
        container.appendChild(line)
    }
    CSATs.forEach(element => {
        var barContainer = document.createElement('div');
        var bar = document.createElement('div');
        var csat = document.createElement('div');
        var wilayaName = document.createElement('span');
    
        barContainer.classList.add('bar-container');
        bar.classList.add('bar');
        csat.classList.add('csat');
        wilayaName.classList.add('wilaya-name')
        
        barContainer.style.left = spacing + '%';
        barContainer.style.height = ((parseInt(element.CSAT) * 100 )/ (numberOfLines * 10)) + '%';
        if(element.CSAT >= 65) {
            bar.style.backgroundColor = '#39b150';
        } else if(element.CSAT >= 60) {
            bar.style.backgroundColor = '#92d050';
        } else if (element.CSAT >= 55) {
            bar.style.backgroundColor = '#92d050';
        } else if (element.CSAT < 55) {
            bar.style.backgroundColor = '#f51d03';
        }
        spacing += 2;
        
        csat.innerHTML = element.CSAT
        wilayaName.innerHTML = element.wilaya
    
        barContainer.appendChild(bar);
        barContainer.appendChild(csat);
        barContainer.appendChild(wilayaName);
        container.appendChild(barContainer);
    });
}
visualizeCharts();



function onGetData(rResponse) {
	let rStatus;
	rStatus = rResponse.status;
	console.log("response onGet: status " + rStatus);
	switch (rStatus) {
		case 200:
			return Promise.all(  [Promise.resolve(rStatus), rResponse.json()]  );
			break;
//				case 201:
// 					return Promise.all([rResponse.json(),    Promise.resolve(rResponse)]);
//					break;
//				case 204:
//					return Promise.all([Promise.resolve(''), Promise.resolve(rResponse)]);
//					break;
        case 404:
            return Promise.all(  [Promise.resolve(rStatus), rResponse.statusText + " " + rResponse.url]  );
		default:
			return Promise.all(  [Promise.resolve(rStatus), rResponse.text()]  );
			break;
	}
}
// end_of onGetData

function onPostData(rResponse) {
    let rStatus;
    rStatus = rResponse.status;
	console.log("response onPost: status " + rStatus);
	switch (rStatus) {
        // есть вариант обрабатывать одинаково 200 и 201
        case 201:
		console.log("response onPost: headers" + rStatus);
		console.log(rResponse.headers);
//        	let lLocation = rResponse.headers.get('Location');
//		console.log(lLocation);
//		let newId = lLocation.substring(  lLocation.lastIndexOf('/')  +  1  );
		let newId = "1";
		return Promise.all(  [Promise.resolve(rStatus), Promise.resolve(newId)]  );
		break;
//	case 204:
//		return Promise.all([Promise.resolve(''), Promise.resolve(rResponse)]);
//		break;

//        case 502:
//<!DOCTYPE html>
//<html>
//<head>
//<title>Error</title>
//</head>
//<body>
//<h1>An error occurred.</h1>
//<p>Sorry, the page you are looking for is currently unavailable.<br/> //Please try again later.</p> //</body> //</html>
	default:
		return Promise.all(  [Promise.resolve(rStatus), rResponse.text()]  );
		break;
	}
}
// end_of onPostData

function arrayResolveReject(arrResp) {
	var rError;
	console.log("arrayResolveReject status: " + arrResp[0]);
	console.log("arrayResolveReject result type:" + (typeof arrResp[1]) + ", value (next line):");
	console.log(arrResp[1]);
	switch (arrResp[0]) {
		case 200:
		case 201:
//				case 204:
			return arrResp[1];
			break;
        case 404:
        case 502:
		default:
			rError = new Error(arrResp[1]);
			rError.code = arrResp[0];
			throw rError;
			break;
	}
}
// end_of arrayResolveReject

function fetchData_get01() {
	let vlink = vlink2;
	const fetchPromise07 = fetch(
		vlink,
		{
			headers:{'Accept': 'application/json'}
		}
	)
	.then(onGetData)           // прочесть либо json, либо error-string
	.then(arrayResolveReject); // разделить потоки на resolved и rejected
    return fetchPromise07;
} 
// end_of fetchData_get01

function fetchData_post01(ms) {
	// ms - массив передаваемых объектов
	let vlink = vlink2;
	// пример протокола vlink = 'protocol_post_03.json';
	const fetchPromise05 = fetch(
		vlink,
		{
            method: 'POST',
            headers:{'Content-type': 'application/json; charset=utf-8'},
            body:   JSON.stringify(ms)
		}
	)
	// Ответ сервера на POST createOrder():
	//    - если ресурс успешно создан - 201
	//    - если ресурс с указанным URI не может быть создан или модифицирован - 500 (Internal Server Error)
	.then(onPostData)      // прочесть либо json, либо error-string
	.then(arrayResolveReject); // разделить потоки на resolved и rejected
    return fetchPromise05;
}
// end_of fetchData_post01

function fetchData_post02(ms) {
	// ms - массив передаваемых объектов
	let vlink = vlink3;
	// пример протокола vlink = 'protocol_post_04.json';
	const fetchPromise06 = fetch(
		vlink,
		{
            method: 'POST',
            headers:{'Content-type': 'application/json; charset=utf-8'},
            body:   JSON.stringify(ms)
//            headers:{'Content-type': 'application/json; charset=utf-8'}
		}
	)
	// Ответ сервера на POST createOrder():
	//    - если ресурс успешно создан - 201
	//    - если ресурс с указанным URI не может быть создан или модифицирован - 500 (Internal Server Error)
	.then(onPostData)      // прочесть либо json, либо error-string
	.then(arrayResolveReject); // разделить потоки на resolved и rejected
    return fetchPromise06;
}
// end_of fetchData_post02


//справочники tpList, obList, fuel

// нужные адреса

export const RSS_Type_List = "http://172.23.16.18:8080/dprest-1.0-SNAPSHOT/webresources/ru.expertek.dp.dpfacade.dic"
//export const RSS_Type_List = "http://172.23.16.125:8000/dprest-1.0-SNAPSHOT/webresources/ru.expertek.dp.dpfacade.dic"


export const WS = "ws://172.23.16.18:8080/dpsock-1.0-SNAPSHOT/alwsc";

export const POST = "http://172.23.16.18:8080/dprest-1.0-SNAPSHOT/webresources/ru.expertek.dp.dpfacade.com";

// нужные адреса


export const RSS = "http://172.23.16.18:8080/dprest-1.0-SNAPSHOT/webresources/ru.expertek.dp.dpfacade.dvc/";

export const MARK = "http://172.23.16.18:8080/dpmark-1.0-SNAPSHOT/webresources/ru.expertek.dp.dpinside.mark";

export const AZS_s = "http://172.23.16.18:8020/dprest-1.0-SNAPSHOT/webresources/ru.expertek.dp.dpfacade.azk";

export const RSS_AZS = "http://172.23.16.18:8080/dprest-1.0-SNAPSHOT/webresources/ru.expertek.dp.dpfacade.azk";



//export const WS = "ws://172.23.16.18:8080/dpsock-1.0-SNAPSHOT/alws";

// pl
export const RSS_Tanks = "http://172.23.16.18:8080/dpmark-1.0-SNAPSHOT/webresources/ru.expertek.dp.dpinside.tank";


//- обращение напрямую к WildFly
//http://172.23.16.18:8020/dpmark-1.0-SNAPSHOT/webresources/ru.expertek.dp.dpinside.tank

//- обращение через nginx
//http://172.23.16.18:8080/dpmark-1.0-SNAPSHOT/webresources/ru.expertek.dp.dpinside.tank

export function Is_View_Row(Data, Name_Row) {
  let row = false;
  if (Data != undefined) {
      for (const iterator of Data) {
          if (iterator == Name_Row) {
              row = true;
              break;
          }
      }
      let r = 0;
  }

  return row;
}


export function createGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}

export function get_NameFuel(_id, ListType) {
  let t = _id;
  if (ListType != null) {
    for (const iterator of ListType) {
      if (iterator.id == _id) {
        t = iterator.fu;
      }
    }
  }
  return t;
}

export function getDVC_Tree(dvctyptree, type) {
  for (const iterator of dvctyptree) {
      if (iterator.typ == type) {
          return iterator;
      }
  }
}


export function Get_RSS(Rss, startDate, endDate) {
  var rss = Rss;
  return rss;
}

export function IsExistAZS(mas, azs) {
  for (const iterator of mas) {
    if (iterator == azs) {
      return true;
    }
  }
  return false;
}
export function get_ETALON_AZS(data_all) {

  if (data_all != undefined) {
    let MAS_AZS = new Array();
    for (const iterator of data_all) {
      if (!IsExistAZS(MAS_AZS, iterator.azs)) {
        MAS_AZS.push(iterator.azs);
      }
    }
    return MAS_AZS;
  }
  else {
    return undefined;
  }
}
export function get_Mas_MAS_S(data_all, ETALON_AZS) {
  let MAS_AZS = new Array();
  if (ETALON_AZS != undefined) {
    for (const azs of ETALON_AZS) {
      if (data_all.length > 0) {
        let s_AZS = new Array();
        for (const item of data_all) {
          if (azs == item.azs) {
            s_AZS.push(item);
          }
        }
        MAS_AZS.push(s_AZS.sort(compare_storage_space));
      }
    }
  } else {
    MAS_AZS.push(data_all);
  }
  return MAS_AZS;
}



export function compare_storage_space(a, b) {
  if (a.storage_space > b.storage_space) return 1;
  if (a.storage_space < b.storage_space) return -1;
}
export function compare_azs(a, b) {
  if (a.azs > b.azs) return 1;
  if (a.azs < b.azs) return -1;
}



/*
export function get_DateRSS() {

  let debugeList = get_Rss_DevList();
  let ListDev = JSON.parse(debugeList);
  //let J_ListDev = get_ListFals(ListDev);
  return ListDev;
}


export function get_Full_TreeBar(_objects) {
  let J_Rss = _objects;//JSON.parse(_Json);
  let IsOnlyAZS = false;
  let D_Tree = null;

  if (!IsOnlyAZS) {
    let Fuels = new d_tree_TreeBar('Топливо', get_ListChildTreeBar(J_Rss.fuel, 'fuel'), 'fuel', false);
    let TpList = new d_tree_TreeBar('Оборудование', get_ListChildTreeBar(J_Rss.tpList, 'tpList'), 'tpList', false);
    let ObLists = new d_tree_TreeBar('АЗК', get_ListChildTreeBar(J_Rss.obList, 'obList'), 'obList', false);

    D_Tree = new d_tree_TreeBar('Справочники', [Fuels, ObLists, TpList], 'root', true);

  } else {
    let ObLists = new d_tree_TreeBar('АЗК', get_ListChildTreeBar(J_Rss.obList, 'obList'), 'obList', false);
    D_Tree = new d_tree_TreeBar('Справочники', [ObLists], 'root', true);
  }

  
  //let Fuels = new d_tree_TreeBar('Топливо', get_ListChildTreeBar(J_Rss.fuel, 'fuel'), 'fuel', false);
  //let TpList = new d_tree_TreeBar('Оборудование', get_ListChildTreeBar(J_Rss.tpList, 'tpList'), 'tpList', false);
  //let ObLists = new d_tree_TreeBar('АЗК', get_ListChildTreeBar(J_Rss.obList, 'obList'), 'obList', false);

  //let D_Tree = new d_tree_TreeBar('Справочники', [Fuels, ObLists, TpList], 'root', true);
  //let D_Tree = new d_tree_TreeBar('Справочники', [ObLists], 'root', true);
  

  return D_Tree;
}
class d_tree_TreeBar {
  constructor(_module, _children, _type, _toggled) {
    this.name = _module;
    if (_toggled == null) {
      _toggled = false;
    }
    this.toggled = _toggled;
    this.children = _children;
  }
}
export function get_ListsChildTreeBar(_ID) {
  let children = null;
  if ('f09de2cd-56e9-4f0e-a822-232e9a7c4d0c' == _ID) {
    let J_Rss_ID = get_Rss_ID(_ID);
    children = get_ListChildTreeBar(J_Rss_ID.dvc, 'dvc');
  }
  return children;
}
export function get_ListChildTreeBar(list, _type) {
  let children = Array();
  let t = 0;
  for (const item of list) {
    children[t] = { id: item.id, name: item.nm, fu: item.fu, type: _type, children: get_ListsChildTreeBar(item.id) ,key: item.id};
    //{id:item.id, name:item.nm, fu:item.fu,type:_type,children:null};//get_ListsChildTreeBar(item.id) };
    //new d_Child_TreeBar(item.nm, item.id, item.fu, _type);
    t++;
  }
  return children;
}


class d_Child_TreeBar {
  constructor(_name, _id, _fu, _type) {
    this.id = _id;
    this.name = _name;
    this.fu = _fu;
    this.type = _type;
    this.children = get_ListsChildTreeBar(_id);
  }
}



export function get_Rss_DevList() {

  return '{' +
    '"tpList":[' +
    '{"id":"2","nm":"резервуар"},' +
    '{"id":"3","nm":"ТРК"},' +
    '{"id":"5","nm":"ИБП"},' +
    '{"id":"6","nm":"терминал самообслуживания"}' +
    '],' +
    '"obList":[' +
    '{"id":"f09de2cd-56e9-4f0e-a822-232e9a7c4d0c","nm":"АЗС 81 Ярославское шоссе 15"},' +
    '{"id":"99fa476d-e6b9-4eae-8906-8f7f0100c899","nm":"АЗС-2"},' +
    '{"id":"19fa476d-e6b9-4eae-8906-8f7f0100c899","nm":"АЗС-21"},' +
    '{"id":"69fa476d-e6b9-4eae-8906-8f7f0100c899","nm":"АЗС-0"},' +
    '{"id":"29fa476d-e6b9-4eae-8906-8f7f0100c899","nm":"АЗС-22"}' +
    '],' +
    '"fuel":[' +
    '{"id":1,"nm":"Аи-95","fu":"95"},' +
    '{"id":2,"nm":"Аи-92","fu":"92"},' +
    '{"id":3,"nm":"ДТ","fu":"ДТ"},' +
    '{"id":4,"nm":"Аи-95-фрост","fu":"95ф"},' +
    '{"id":5,"nm":"Аи-98","fu":"98"}' +
    ']' +
    '}';
}

export function get_Rss_ID(ID) {

  switch (ID) {
    case "f09de2cd-56e9-4f0e-a822-232e9a7c4d0c":
      return JSON.parse('{"id":"f09de2cd-56e9-4f0e-a822-232e9a7c4d0c","dvc":[' +
        '{"id":"fe17dea5-c1e9-4a41-b343-f77a7d039824","typ":"pl","nm":"Резервуар А на АЗС81","fuel":1,"prop":[' +
        '{"typ":"plvolume","capacity":3000}' +
        ']},' +
        '{"id":"c7c00a08-4bb3-4038-8173-921dfb58c689","typ":"pl","nm":"Резервуар Б на АЗС81","fuel":2,"prop":[' +
        '{"typ":"plvolume","capacity":2000}]},' +
        '{"id":"3216db78-d495-4e6c-8155-23b5a3bf70c7","typ":"pump","nm":"ТРК А на АЗС81","prop":[]},' +
        '{"id":"436b24f0-a6be-49f2-b8b5-07bc5de0e244","typ":"pump","nm":"ТРК Б на АЗС81","prop":[]},' +
        '{"id":"d0c35750-d15b-4922-bd45-6617400c2a9e","typ":"tso","nm":"ТСО на АЗС81","prop":[]}' +
        ']}');
      break;
    case "19fa476d-e6b9-4eae-8906-8f7f0100c899":
      return JSON.parse('{"id":"19fa476d-e6b9-4eae-8906-8f7f0100c899","dvc":[' +
        '{"id":"fe17dea5-c1e9-4a41-b343-f77a7d039824","typ":"pl","nm":"Резервуар А на АЗС21","fuel":1,"prop":[' +
        '{"typ":"plvolume","capacity":3000}' +
        ']},' +
        '{"id":"c7c00a08-4bb3-4038-8173-921dfb58c689","typ":"pl","nm":"Резервуар Б на АЗС21","fuel":2,"prop":[' +
        '{"typ":"plvolume","capacity":2000}]},' +
        '{"id":"3216db78-d495-4e6c-8155-23b5a3bf70c7","typ":"pump","nm":"ТРК А на АЗС21","prop":[]},' +
        '{"id":"436b24f0-a6be-49f2-b8b5-07bc5de0e244","typ":"pump","nm":"ТРК Б на АЗС21","prop":[]},' +
        '{"id":"d0c35750-d15b-4922-bd45-6617400c2a9e","typ":"tso","nm":"ТСО на АЗС21","prop":[]}' +
        ']}');
      break;


    case "29fa476d-e6b9-4eae-8906-8f7f0100c899":
      return JSON.parse('{"id":"29fa476d-e6b9-4eae-8906-8f7f0100c899","dvc":[' +
        '{"id":"fe17dea5-c1e9-4a41-b343-f77a7d039824","typ":"pl","nm":"Резервуар А на АЗС22","fuel":1,"prop":[' +
        '{"typ":"plvolume","capacity":3000}' +
        ']},' +
        '{"id":"c7c00a08-4bb3-4038-8173-921dfb58c689","typ":"pl","nm":"Резервуар Б на АЗС22","fuel":2,"prop":[' +
        '{"typ":"plvolume","capacity":2000}]},' +
        '{"id":"3216db78-d495-4e6c-8155-23b5a3bf70c7","typ":"pump","nm":"ТРК А на АЗС22","prop":[]},' +
        '{"id":"d0c35750-d15b-4922-bd45-6617400c2a9e","typ":"tso","nm":"ТСО на АЗС22","prop":[]}' +
        ']}');
      break;
    case "99fa476d-e6b9-4eae-8906-8f7f0100c899":
      return JSON.parse('{"id":"99fa476d-e6b9-4eae-8906-8f7f0100c899","dvc":[' +
        '{"id":"fe17dea5-c1e9-4a41-b343-f77a7d039824","typ":"pl","nm":"Резервуар А на АЗС2","fuel":1,"prop":[' +
        '{"typ":"plvolume","capacity":3000}' +
        ']},' +
        '{"id":"c7c00a08-4bb3-4038-8173-921dfb58c689","typ":"pl","nm":"Резервуар Б на АЗС2","fuel":2,"prop":[' +
        '{"typ":"plvolume","capacity":2000}]},' +
        '{"id":"3216db78-d495-4e6c-8155-23b5a3bf70c7","typ":"pump","nm":"ТРК А на АЗС2","prop":[]},' +
        '{"id":"436b24f0-a6be-49f2-b8b5-07bc5de0e244","typ":"pump","nm":"ТРК Б на АЗС2","prop":[]},' +
        '{"id":"436b24f0-a6be-49f2-b8b5-07bc5de0e244","typ":"pump","nm":"ТРК В на АЗС2","prop":[]},' +
        '{"id":"436b24f0-a6be-49f2-b8b5-07bc5de0e244","typ":"pump","nm":"ТРК Г на АЗС2","prop":[]},' +
        '{"id":"436b24f0-a6be-49f2-b8b5-07bc5de0e244","typ":"pump","nm":"ТРК Д на АЗС2","prop":[]},' +
        '{"id":"d0c35750-d15b-4922-bd45-6617400c2a9e","typ":"tso","nm":"ТСО на АЗС2","prop":[]}' +
        ']}');
      break;
    default:
      return JSON.parse('{"id":"78fa476d-e6b9-4eae-8906-8f7f0100c899","dvc":[' +
        '{"id":"fe17dea5-c1e9-4a41-b343-f77a7d039824","typ":"pl","nm":"Резервуар А на АЗС0","fuel":1,"prop":[' +
        '{"typ":"plvolume","capacity":3000}' +
        ']},' +
        '{"id":"c7c00a08-4bb3-4038-8173-921dfb58c689","typ":"pl","nm":"Резервуар Б на АЗС0","fuel":2,"prop":[' +
        '{"typ":"plvolume","capacity":2000}]},' +
        '{"id":"3216db78-d495-4e6c-8155-23b5a3bf70c7","typ":"pump","nm":"ТРК А на АЗС0","prop":[]},' +
        '{"id":"436b24f0-a6be-49f2-b8b5-07bc5de0e244","typ":"pump","nm":"ТРК Б на АЗС0","prop":[]},' +
        '{"id":"d0c35750-d15b-4922-bd45-6617400c2a9e","typ":"tso","nm":"ТСО на АЗС0","prop":[]},' +
        '{"id":"d0c35750-d15b-4922-bd45-6617400c2a9e","typ":"tso","nm":"ТСО на АЗС0","prop":[]},' +
        '{"id":"d0c35750-d15b-4922-bd45-6617400c2a9e","typ":"tso","nm":"ТСО на АЗС0","prop":[]}' +
        ']}');
      break;
  }
}
*/

export function makeCounter() {
  var currentCount = 1;

  // возвращаемся к функции
  function counter() {
    return currentCount++;
  }

  // ...и добавляем ей методы!
  counter.set = function (value) {
    currentCount = value;
  };

  counter.reset = function () {
    currentCount = 1;
  };

  return counter;
}


export function get_Json_String(mstring) {
  var mS = [];
  mS[0] = mstring;
  const T_Json = JSON.stringify(mS);
  return T_Json;

}


export function get_PL() {

  return JSON.parse('{"id":"f09de2cd-56e9-4f0e-a822-232e9a7c4d0c","pl":[' +
    '{"id":"17c00a08-4bb3-4038-8173-921dfb58c689",' +
    '"Available_volume":3700,' +
    '"CURENT_VOLUME":2400,' +
    '"TOTAL_WATER":100,' +
    '"azs":"АЗС-2",' +
    '"storage_space":1,' +
    '"temperature":17,' +
    '"density":0.765,' +
    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +

    '"status":0,' +

    '"state":0,' +

    '"fuel":"АИ-92"},' +

    '{"id":"27c00a08-4bb3-4038-8173-921dfb58c689",' +
    '"Available_volume":4900,' +
    '"CURENT_VOLUME":1100,' +
    '"TOTAL_WATER":100,' +
    '"azs":"АЗС-2",' +
    '"storage_space":2,' +
    '"temperature":18,' +
    '"density":0.767,' +
    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +

    '"status":1,' +

    '"state":0,' +

    '"fuel":"АИ-95"},' +

    '{"id":"37c00a08-4bb3-4038-8173-921dfb58c689",' +
    '"Available_volume":5000,' +
    '"CURENT_VOLUME":4900,' +
    '"TOTAL_WATER":100,' +
    '"azs":"АЗС-2",' +
    '"storage_space":3,' +
    '"temperature":19,' +
    '"density":0.769,' +
    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +

    '"status":0,' +

    '"state":4,' +

    '"fuel":"АИ-98"},' +

    '{"id":"47c00a08-4bb3-4038-8173-921dfb58c689",' +
    '"Available_volume":2812.44,' +
    '"CURENT_VOLUME":3000.20,' +
    '"TOTAL_WATER":187.36,' +
    '"azs":"АЗС-2",' +
    '"storage_space":1,' +
    '"temperature":17,' +
    '"density":0.765,' +
    '"date":"03.06.2019",' +
    '"time":"20:04:00",' +

    '"status":0,' +

    '"state":3,' +

    '"fuel":"АИ-92"},' +

    '{"id":"57c00a08-4bb3-4038-8173-921dfb58c689",' +
    '"Available_volume":1358.64,' +
    '"CURENT_VOLUME":4510.20,' +
    '"TOTAL_WATER":131.16,' +
    '"azs":"АЗС-2",' +
    '"storage_space":2,' +
    '"temperature":18,' +
    '"density":0.767,' +
    '"date":"03.06.2019",' +
    '"time":"20:04:00",' +

    '"status":1,' +

    '"state":2,' +

    '"fuel":"АИ-95"},' +

    '{"id":"67c00a08-4bb3-4038-8173-921dfb58c689",' +
    '"Available_volume":986.12,' +
    '"CURENT_VOLUME":4920.20,' +
    '"TOTAL_WATER":93.68,' +
    '"azs":"АЗС-2",' +
    '"storage_space":3,' +
    '"temperature":19,' +
    '"density":0.769,' +
    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +

    '"status":0,' +

    '"state":1,' +

    '"fuel":"АИ-98"}' +
    ']}'
  );



  /*
    return JSON.parse('{"id":"f09de2cd-56e9-4f0e-a822-232e9a7c4d0c","dvc":[' +
      '{"id":"fe17dea5-c1e9-4a41-b343-f77a7d039824","typ":"pl","nm":"Резервуар А на АЗС81","fuel":1,"prop":[' +
      '{"typ":"plvolume","capacity":3000}' +
      ']},' +
      '{"id":"c7c00a08-4bb3-4038-8173-921dfb58c689","typ":"pl","nm":"Резервуар Б на АЗС81","fuel":2,"prop":[' +
      '{"typ":"plvolume","capacity":2000}]},' +
      '{"id":"3216db78-d495-4e6c-8155-23b5a3bf70c7","typ":"pump","nm":"ТРК А на АЗС81","prop":[]},' +
      '{"id":"436b24f0-a6be-49f2-b8b5-07bc5de0e244","typ":"pump","nm":"ТРК Б на АЗС81","prop":[]},' +
      '{"id":"d0c35750-d15b-4922-bd45-6617400c2a9e","typ":"tso","nm":"ТСО на АЗС81","prop":[]}' +
      ']}');
      */
}

export function get_FUEL() {
  return JSON.parse('{"fuel":[' +
    '{"name":"АИ-95"},' +
    '{"name":"АИ-92"},' +
    '{"name":"АИ-98"},' +
    '{"name":"ДТ"}]}'
  );
}

export function get_StateGun() {
  return JSON.parse(
    '{"stategun":[' +
    '{"name":"Готов","code": 0},' +
    '{"name":"Снят","code": 1},' +
    '{"name":"Налив","code": 2},' +
    '{"name":"Не работает","code": 3}]}'
  );
}

export function get_Objs() {
  return JSON.parse(
    '{"obList":[' +
    '{"name":"АЗС 81 Ярославское шоссе 15"},' +
    '{"name":"АЗС-2"}]}'
  );
}

export function get_Pump() {
  return JSON.parse(
    '{"pump":[' +
    '{"name":"ТРК А на АЗС1"},' +
    '{"name":"ТРК Б на АЗС1"}]}'
  );
}


export function get_Status() {
  return JSON.parse(
    '{"status":[{"name":"В сети","code": 1},' +
    '{"name":"Нет связи","code": 0}]}'
  );
}


export function get_State() {
  return JSON.parse('{"state":[{"name":"Превышие по параметру подтоварная вода","code": 0},' +
    '{"name":"Превышие по параметру минимальный объём","code": 1},' +
    '{"name":"Требуется поставка НП","code": 2},' +
    '{"name":"Отсутсвует информация в период","code": 3},' +
    '{"name":"По данным ручного ввода в период","code": 4}]}'
  );
}

/****************
 return JSON.parse(
    '{"azs":[' +
    '{"id":"f09de2cd-56e9-4f0e-a822-232e9a7c4d0c","name":"MJ043", "pump":[{"name":"ТРК А"},{"name":"ТРК B"},{"name":"ТРК C"}]}' +
    ']}'
  );



  '{"id":"f09de2cd-56e9-4f0e-a822-232e9a7c4d0c","pl":[' +
    '{"id":"17c00a08-4bb3-4038-8173-921dfb58c689",' +
    '"Available_volume":3531.28,' +
    '"CURENT_VOLUME":2150.20,' +
    '"TOTAL_WATER":318.52,' +
    '"azs":"MJ043",' +
    '"storage_space":1,' +
    '"temperature":17,' +
    '"density":0.765,' +
    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +

    '"status":0,' +

    '"state":0,' +

    '"fuel":"АИ-92"}'

 * ********** */


export function get_NOZZLE() {
  return JSON.parse('{"id":"f0000000-0000-0000-0000-000000000000","nozzle":[' +
    '{"id":"10000000-0000-0000-0000-000000000000",' +
    '"name":"1",' +

    '"azs":"АЗС 81 Ярославское шоссе 15",' +
    '"stategun":0,' +
    '"pump":"ТРК А",' +

    '"counter":125000,' +
    '"fuel":"АИ-92",' +
    '"nozzle": "1",' +

    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +
    '"status":1,' +
    '"state":0},' +

    '{"id":"20000000-0000-0000-0000-000000000000",' +
    '"name":"2",' +

    '"azs":"АЗС 81 Ярославское шоссе 15",' +
    '"stategun":1,' +
    '"pump":"ТРК А",' +

    '"counter":250300,' +
    '"fuel":"АИ-95",' +
    '"nozzle": "1",' +

    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +
    '"status":1,' +
    '"state":1},' +

    '{"id":"30000000-0000-0000-0000-000000000000",' +
    '"name":"3",' +
    '"fuel":"АИ-98",' +
    '"azs":"АЗС 81 Ярославское шоссе 15",' +
    '"stategun":2,' +
    '"pump":"ТРК А",' +
    '"counter":70000,' +
    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +
    '"status":1,' +
    '"state":0},' +

    '{"id":"40000000-0000-0000-0000-000000000000",' +
    '"name":"4",' +
    '"fuel":"ДТ",' +
    '"azs":"АЗС 81 Ярославское шоссе 15",' +
    '"stategun":3,' +
    '"pump":"ТРК А",' +
    '"counter":75000,' +
    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +
    '"status":1,' +
    '"state":0},' +


    '{"id":"50000000-0000-0000-0000-000000000000",' +
    '"name":"1",' +
    '"fuel":"АИ-92",' +
    '"azs":"АЗС 81 Ярославское шоссе 15",' +
    '"stategun":0,' +
    '"pump":"ТРК B",' +
    '"counter":122000,' +
    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +
    '"status":1,' +
    '"state":0},' +

    '{"id":"60000000-0000-0000-0000-000000000000",' +
    '"name":"2",' +
    '"fuel":"АИ-95",' +
    '"azs":"АЗС 81 Ярославское шоссе 15",' +
    '"stategun":1,' +
    '"pump":"ТРК B",' +
    '"counter":352000,' +
    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +
    '"status":1,' +
    '"state":1},' +

    '{"id":"70000000-0000-0000-0000-000000000000",' +
    '"name":"3",' +
    '"fuel":"АИ-98",' +
    '"azs":"АЗС 81 Ярославское шоссе 15",' +
    '"stategun":0,' +
    '"pump":"ТРК B",' +
    '"counter":80400,' +
    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +
    '"status":0,' +
    '"state":2},' +

    '{"id":"80000000-0000-0000-0000-000000000000",' +
    '"name":"4",' +
    '"fuel":"ДТ",' +
    '"azs":"АЗС 81 Ярославское шоссе 15",' +
    '"stategun":3,' +
    '"pump":"ТРК B",' +
    '"counter":70200,' +
    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +
    '"status":1,' +
    '"state":0},' +



    '{"id":"11000000-0000-0000-0000-000000000000",' +
    '"name":"1",' +
    '"fuel":"АИ-92",' +
    '"azs":"АЗС-2",' +
    '"stategun":0,' +
    '"pump":"ТРК А",' +
    '"counter":128040,' +
    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +
    '"status":1,' +
    '"state":0},' +

    '{"id":"21000000-0000-0000-0000-000000000000",' +
    '"name":"2",' +
    '"fuel":"АИ-95",' +
    '"azs":"АЗС-2",' +
    '"stategun":3,' +
    '"pump":"ТРК А",' +
    '"counter":250700,' +
    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +
    '"status":1,' +
    '"state":1},' +

    '{"id":"31000000-0000-0000-0000-000000000000",' +
    '"name":"3",' +
    '"fuel":"АИ-98",' +
    '"azs":"АЗС-2",' +
    '"stategun":1,' +
    '"pump":"ТРК А",' +
    '"counter":170600,' +
    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +
    '"status":1,' +
    '"state":0},' +

    '{"id":"41000000-0000-0000-0000-000000000000",' +
    '"name":"4",' +
    '"fuel":"ДТ",' +
    '"azs":"АЗС-2",' +
    '"stategun":0,' +
    '"pump":"ТРК А",' +
    '"counter":70300,' +
    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +
    '"status":1,' +
    '"state":0},' +


    '{"id":"51000000-0000-0000-0000-000000000000",' +
    '"name":"1",' +
    '"fuel":"АИ-92",' +
    '"azs":"АЗС-2",' +
    '"stategun":2,' +
    '"pump":"ТРК B",' +
    '"counter":128000,' +
    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +
    '"status":1,' +
    '"state":0},' +

    '{"id":"61000000-0000-0000-0000-000000000000",' +
    '"name":"2",' +
    '"fuel":"АИ-95",' +
    '"azs":"АЗС-2",' +
    '"stategun":0,' +
    '"pump":"ТРК B",' +
    '"counter":1250000,' +
    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +
    '"status":1,' +
    '"state":1},' +

    '{"id":"71000000-0000-0000-0000-000000000000",' +
    '"name":"3",' +
    '"fuel":"АИ-98",' +
    '"azs":"АЗС-2",' +
    '"stategun":1,' +
    '"pump":"ТРК B",' +
    '"counter":175000,' +
    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +
    '"status":0,' +
    '"state":2},' +

    '{"id":"81000000-0000-0000-0000-000000000000",' +
    '"name":"4",' +
    '"fuel":"ДТ",' +
    '"azs":"АЗС-2",' +
    '"stategun":3,' +
    '"pump":"ТРК B",' +
    '"counter":72000,' +
    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +
    '"status":1,' +
    '"state":0}' +

    ']}'
  );
}
/******** Баки ************************* */
export function get_Text_Status_PL(Int) {
  var col = 'Нет данных';
  switch (Int) {
    case 0: col = 'Нет связи - ' + Int; break;
    case 1: col = 'В сети - ' + Int; break;
    case 2: col = 'Сбой - ' + Int; break;
    default: col = 'Нет связи - ' + Int; break;
  }
  return col;
}
export function get_Color_Status_PL(Int) {
  var col = 'while';
  switch (Int) {
    case 2:
    case 0: col = 'rgba(255, 0, 0, 0.6)';//'red'; 
      break;
    case 1: col = 'rgba(0, 128, 0, 0.7)';//'green'; 
      break;
    default: col = 'rgba(255, 0, 0, 0.6)';//'red'; 
      break;
  }
  return col;
}
/*
function get_Text_NET(Int) {
    var col = 'Нет данных';
    switch (Int) {
        case 0: col = 'Нет связи'; break;
        case 1: col = 'В сети'; break;
        default: col = 'Сбой'; break;
    }
    return col;
}
*/
/******** Баки ************************* */

/******** ТРК ************************* */


export function get_TRK() {
  return JSON.parse('{"id":"f0000000-0000-0000-0000-000000000000","trk":[' +

    '{"id": "3216db78-d495-4e6c-8155-23b5a3bf70c7",' +
    '"azs": "АЗС 81 Ярославское шоссе 15",' +
    '"pump": "ТРК А на АЗС1",' +

    '"Counter_Curent": "22222",' +
    '"fuel":"Аи-95-фрост",' +
    '"nozzle": "1",' +

    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +
    '"status":1,' +
    '"state":1},' +


    '{"id": "436b24f0-a6be-49f2-b8b5-07bc5de0e244",' +
    '"azs": "АЗС 81 Ярославское шоссе 15",' +
    '"pump": "ТРК Б на АЗС1",' +

    '"Counter_Curent": "3333333",' +
    '"fuel":"Аи-95-фрост",' +
    '"nozzle": "2",' +

    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +
    '"status":1,' +
    '"state":0},' +

    '{"id": "436b24f0-a6be-49f2-b8b5-07bc5de0e241",' +
    '"azs": "АЗС-2",' +
    '"pump": "ТРК Б на АЗС1",' +

    '"Counter_Curent": "3333333",' +
    '"fuel":"АИ-92",' +
    '"nozzle": "1",' +

    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +
    '"status":1,' +
    '"state":0},' +

    '{"id": "436b24f0-a6be-49f2-b8b5-07bc5de0e242",' +
    '"azs": "АЗС-2",' +
    '"pump": "ТРК Б на АЗС1",' +

    '"Counter_Curent": "3333333",' +
    '"fuel":"ДТ",' +
    '"nozzle": "2",' +

    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +
    '"status":0,' +
    '"state":0}' +


    ']}'
  );
}
/*
JSON.parse

'{"id":"27c00a08-4bb3-4038-8173-921dfb58c689",' +
    '"Available_volume":4900,' +
    '"CURENT_VOLUME":1100,' +
    '"TOTAL_WATER":100,' +
    '"azs":"MJ043",' +
    '"storage_space":2,' +
    '"temperature":18,' +
    '"density":0.767,' +
    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +
    '"status":1,' +
    '"state":0,' +
    '"fuel":"АИ-95"},' +

'{"id":"21000000-0000-0000-0000-000000000000",' +
    '"name":"2",' +
    '"fuel":"АИ-95",' +
    '"azs":"АЗС-2",' +
    '"stategun":3,' +
    '"pump":"ТРК А",' +
    '"counter":250700,' +
    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +
    '"status":1,' +
    '"state":1},' +
*/

/******** ТРК ************************* */


/******** ТCO ************************* */


export function Get_Device(name_Dev) {
  let Obj = get_DVC_TREE();
  if (Obj != null && Obj.dvctyptree != null) {
    for (const DEVICE of Obj.dvctyptree) {
      if (DEVICE.typ == name_Dev) {
        return DEVICE;
        break;
      }
    }
  }
  return null;
}
export function Get_MainHead(TCO) {
  let Tso = new Array();
  let TsoVal = new Array();
  for (const key in TCO) {
    if (key == "nm"  || key == "id" || key == "typ") 
    {  Tso.push(key);
      TsoVal[key] = TCO[key];
    }
  }
  if (TCO.cntyp != undefined) {
    for (const item of TCO.cntyp) {
      Tso.push(item.typ);
      TsoVal[item.typ] = item.def.nm;
    }
  }
  Tso.push(TsoVal);
  return Tso;
}
export function Get_Val(mas, key) {
  let R = "";
  let len = mas.length;
  if (len > 0) {
    R = mas[len - 1][key];
  }
  return R;
}


/******** ТCO ************************* */


export function get_VIEW_VIDGs() {
  return JSON.parse(
    '{"VIEW_VIDG":[' +
    '{"name":"виджет"},' +
    '{"name":"данные"}]}'
  );
}


export function get_TCO() {
  return JSON.parse('{"id":"s0000000-0000-0000-0000-000000000000","tco":[' +

    '{"id": "s216db78-d495-4e6c-8155-23b5a3bf70c7",' +
    '"azs": "АЗС 81 Ярославское шоссе 15",' +
    '"number": "1",' +

    '"iSelf": "22222",' +
    '"FR":"ФС",' +
    '"validator": "1",' +
    '"topSection": "21",' +
    '"lowerSection": "1",' +
    '"safe": "1",' +
    '"MFK": "1",' +

    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +
    '"status":0,' +
    '"state":1},' +


    '{"id": "436b24f0-a6be-49f2-b8b5-07bc5de0e244",' +
    '"azs": "АЗС 81 Ярославское шоссе 15",' +
    '"number": "2",' +

    '"iSelf": "21111",' +
    '"FR":"ФС",' +
    '"validator": "1",' +
    '"topSection": "21",' +
    '"lowerSection": "1",' +
    '"safe": "1",' +
    '"MFK": "1",' +

    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +
    '"status":1,' +
    '"state":1},' +

    '{"id": "436b24f0-a6be-49f2-b8b5-07bc5de0e241",' +
    '"azs": "АЗС-2",' +
    '"number": "3",' +

    '"iSelf": "45555",' +
    '"FR":"ФС",' +
    '"validator": "1",' +
    '"topSection": "21",' +
    '"lowerSection": "1",' +
    '"safe": "",' +
    '"MFK": "1",' +

    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +
    '"status":2,' +
    '"state":1},' +

    '{"id": "436b24f0-a6be-49f2-b8b5-07bc5de0e242",' +
    '"azs": "АЗС-2",' +
    '"number": "4",' +

    '"iSelf": "5777",' +
    '"FR":"ФС",' +
    '"validator": "1",' +
    '"topSection": "21",' +
    '"lowerSection": "1",' +
    '"safe": "1",' +
    '"MFK": "1",' +

    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +
    '"status":3,' +
    '"state":0}' +


    ']}'
  );
}


export function get_AZS() {
  return JSON.parse(
    {
      "id": "f09de2cd-56e9-4f0e-a822-232e9a7c4d0c",
      "dvc": [
        {
          "id": "fe17dea5-c1e9-4a41-b343-f77a7d039824",
          "typ": "pl",
          "nm": "Резервуар А на АЗС1",
          "fuel": 1,
          "prop": [
            {
              "typ": "SHELL_CA",
              "capacity": 3000
            }
          ]
        },
        {
          "id": "c7c00a08-4bb3-4038-8173-921dfb58c689",
          "typ": "pl",
          "nm": "Резервуар Б на АЗС1",
          "fuel": 2,
          "prop": [
            {
              "typ": "SHELL_CA",
              "capacity": 2000
            }
          ]
        },
        {
          "id": "3216db78-d495-4e6c-8155-23b5a3bf70c7",
          "typ": "pump",
          "nm": "ТРК А на АЗС1",
          "prop": []
        },
        {
          "id": "436b24f0-a6be-49f2-b8b5-07bc5de0e244",
          "typ": "pump",
          "nm": "ТРК Б на АЗС1",
          "prop": []
        },
        {
          "id": "d0c35750-d15b-4922-bd45-6617400c2a9e",
          "typ": "tso",
          "nm": "ТСО на АЗС1",
          "prop": []
        },
        {
          "id": "aa520eb3-df3a-4a20-b034-de3d7bac19e1",
          "typ": "pl",
          "nm": "Резервуар C на АЗС1",
          "prop": []
        },
        {
          "id": "ae0eb55c-8519-4687-801e-0867d23af51d",
          "typ": "pl",
          "nm": "Резервуар D на АЗС1",
          "prop": []
        },
        {
          "id": "e4881148-6519-459d-8978-1a3b0bb1f3fb",
          "typ": "pl",
          "nm": "Резервуар E на АЗС1",
          "prop": []
        },
        {
          "id": "08c0926b-9e2e-4bce-8af9-d352ca76ed3b",
          "typ": "pl",
          "nm": "Резервуар F на АЗС1",
          "prop": []
        }
      ]
    }
  );
}


export function get_DVC_TREE() {
  return (
    {
      "dvctyptree": [
        {
          "id": 2,
          "typ": "pl",
          "nm": "резервуар",
          "cntyp": [
            {
              "typ": "WATER_VOLUME",
              "def": { "nm": "Объем воды (л)" }
            },
            {
              "typ": "cn07",
              "def": { "nm": "датчик температуры на уровне 3" }
            },
            {
              "typ": "cn08",
              "def": { "nm": "датчик общей массы" }
            },
            {
              "typ": "TP_STATUS",
              "def": {
                "nm": "статус резервуара или пробника",
                "op": [
                  {
                    "val": "0",
                    "text": "не отвечает на запросы"
                  },
                  {
                    "val": "1",
                    "text": "отвечает на запросы"
                  }
                ]
              }
            },
            {
              "typ": "TP_ALARM",
              "def": { "nm": "шестнадцатиричная маска будильников. Указывает ошибки или выход измеренных значений за допустимые пределы" }
            },
            {
              "typ": "PRODUCT_LEVEL",
              "def": { "nm": "Уровень продукта в миллиметрах" }
            },
            {
              "typ": "WATER_LEVEL",
              "def": { "nm": "Уровень воды (mm)" }
            },
            {
              "typ": "OBSERVED_DENSITY",
              "def": { "nm": "Средняя плотность (kg/m3)" }
            },
            {
              "typ": "AVERAGE_TEMP",
              "def": { "nm": "Средняя температура продукта. Гр. Цельсия." }
            },
            {
              "typ": "TOTAL_OBSERVED_VOLUME",
              "def": { "nm": "Объем продукта+объем воды = полный текущий объем. Литры." }
            },
            {
              "typ": "TOTAL_GROSS_STANDARD_VOLUME",
              "def": { "nm": "Объем продукта (не включая воду), приведённый к стандартной температуре. Литры." }
            }
          ]
        },
        {
          "id": 3,
          "typ": "pump",
          "nm": "ТРК",
          "cntyp": [
            {
              "typ": "STATUS_TRK",
              "def": {
                "nm": "Статус ТРК",
                "op": [
                  {
                    "val": "1",
                    "text": "Нет связи"
                  },
                  {
                    "val": "2",
                    "text": "Закрыта"
                  },
                  {
                    "val": "3",
                    "text": "Свободна"
                  },
                  {
                    "val": "4",
                    "text": "Снят пистолет"
                  },
                  {
                    "val": "5",
                    "text": "Идет налив"
                  },
                  {
                    "val": "6",
                    "text": "Выдано разрешение"
                  },
                  {
                    "val": "7",
                    "text": "Завершение налива"
                  },
                  {
                    "val": "8",
                    "text": "Включен автоналив"
                  },
                  {
                    "val": "9",
                    "text": "Выключен автоналив"
                  },
                  {
                    "val": "10",
                    "text": "Заблокирована"
                  },
                  {
                    "val": "11",
                    "text": "Разблокирована"
                  }
                ]
              }
            },
            {
              "typ": "nozzle",
              "def": { "nm": "Номер пистолета" }
            },
            {
              "typ": "CURRENT_TRANSACTION",
              "def": { "nm": "состояние налива" }
            }
          ],
          "dvctyptree": [
            {
              "id": 4,
              "typ": "nozzle",
              "nm": "пистолет",
              "cntyp": [
                {
                  "typ": "READY_TRANSACTION",
                  "def": { "nm": "окончание налива" }
                },
                {
                  "typ": "cn15",
                  "def": { "nm": "состояние налива" }
                },
                {
                  "typ": "cn17",
                  "def": {
                    "nm": "состояние пистолета",
                    "op": [
                      {
                        "val": "0",
                        "text": "снят"
                      },
                      {
                        "val": "1",
                        "text": "повешен"
                      }
                    ]
                  }
                }
              ]
            }
          ]
        },
        {
          "id": 5,
          "typ": "ups",
          "nm": "ИБП"
        },
        {
          "id": 6,
          "typ": "tso",
          "nm": "терминал самообслуживания",
          "cntyp": [
            {
              "typ": "STATE_SHIFT",
              "def": { "nm": "Статус смены" }
            },
            {
              "typ": "ID_SHIFT",
              "def": { "nm": "Номер смены" }
            },
            {
              "typ": "STATE_TSO",
              "def": { "nm": "Состояние" }
            }
          ],
          "dvctyptree": [
            {
              "id": 7,
              "typ": "fr",
              "nm": "фискальный регистратор",
              "cntyp": [
                {
                  "typ": "ERROR_FR",
                  "def": { "nm": "Фискальные ошибки" }
                },
                {
                  "typ": "STATE_FR",
                  "def": { "nm": "Состояние" }
                }
              ]
            },
            {
              "id": 8,
              "typ": "cash",
              "nm": "купюроприёмник",
              "cntyp": [
                {
                  "typ": "STATE_CASH",
                  "def": { "nm": "Состояние купюроприемника" }
                },
                {
                  "typ": "SUBSTATE_CASH",
                  "def": { "nm": "Субсостояние купюроприёмника" }
                },
                {
                  "typ": "STAT_LOCK",
                  "def": { "nm": "Блокировка по статическому фильтру" }
                },
                {
                  "typ": "NOTE",
                  "def": { "nm": "Номинал купюры" }
                }
              ]
            },
            {
              "id": 9,
              "typ": "msc",
              "nm": "многофункциональный контроллер"
            },
            {
              "id": 10,
              "typ": "td",
              "nm": "терминальное устройство",
              "cntyp": [
                {
                  "typ": "ERROR_TD_ARCUS",
                  "def": { "nm": "Код ответа библиотеки Arcus2 (библиотека для работы с ТУ)" }
                },
                {
                  "typ": "ERROR_TD_HOST",
                  "def": { "nm": "Код ответа процессингового центра" }
                },
                {
                  "typ": "STATE_TD_BANK",
                  "def": { "nm": "Состояние связи с процессинговым центром банковских карт" }
                },
                {
                  "typ": "STATE_TD_BONUS",
                  "def": { "nm": "Состояние связи с процессинговым центром бонусных карт" }
                },
                {
                  "typ": "STATE_TD_FUEL",
                  "def": { "nm": "Состояние связи с процессинговым центром топливных карт" }
                },
                {
                  "typ": "STATE_TD_VFUEL",
                  "def": { "nm": "Состояние связи с процессинговым центром виртуальных топливных карт" }
                }
              ]
            }
          ]
        }
      ],
    }
  );
}




/*
function get_Mass_View(mas_Vidg, ASZ_M) {
    let View_Fields = new Array();
    for (const nameView of mas_Vidg) {
        if (nameView.value == 'selectAll') {
            View_Fields.push('icon_alarm');
            View_Fields.push('data');
        }
        if (nameView.value == 'vidget') {
            View_Fields.push('vidget');
            View_Fields.push('icon_alarm');
        }
        if (nameView.value == 'icon_alarm') {
            View_Fields.push('icon_alarm');
        }
        if (nameView.value == 'data') {
            View_Fields.push('data');
        }
        if (nameView.value == 'azs') {
            View_Fields.push('azs');
            if (ASZ_M != null) {
                for (const iterator of ASZ_M) {
                    View_Fields.push(iterator.id);
                }
            }
        }
        if (ASZ_M != null) {
            for (const iterator of ASZ_M) {
                View_Fields.push(iterator.id);
            }
        }

        if (nameView.value == 'selectAll') {
            View_Fields.push('vidget');

            View_Fields.push("azs");

            View_Fields.push('data');

            View_Fields.push('icon_alarm');
            View_Fields.push('status_alarm');
            View_Fields.push('state_alarm');

            View_Fields.push('pump');
            View_Fields.push('Counter_Curent');
            View_Fields.push('fuel');
            View_Fields.push('nozzle');
            View_Fields.push('date');
            View_Fields.push('time');
            View_Fields.push('status');
            View_Fields.push('state');
        }

        if (nameView.value == 'vidget') {
            View_Fields.push('vidget');
            View_Fields.push('icon_alarm');
            View_Fields.push('status_alarm');
            View_Fields.push('state_alarm');
        }


        if (nameView.value == 'data') {
            View_Fields.push('data');
            View_Fields.push('pump');
            View_Fields.push('Counter_Curent');
            View_Fields.push('fuel');
            View_Fields.push('nozzle');
            View_Fields.push('date');
            View_Fields.push('time');
            View_Fields.push('status');
            View_Fields.push('state');
        }

        if (nameView.value == 'icon_alarm') { View_Fields.push('icon_alarm'); }
        if (nameView.value == 'status_alarm') { View_Fields.push('status_alarm'); }
        if (nameView.value == 'state_alarm') { View_Fields.push('state_alarm'); }
        if (nameView.value == 'pump') { View_Fields.push('pump'); }
        if (nameView.value == 'Counter_Curent') { View_Fields.push('Counter_Curent'); }
        if (nameView.value == 'fuel') { View_Fields.push('fuel'); }
        if (nameView.value == 'nozzle') { View_Fields.push('nozzle'); }
        if (nameView.value == 'date') { View_Fields.push('date'); }
        if (nameView.value == 'time') { View_Fields.push('time'); }
        if (nameView.value == 'status') { View_Fields.push('status'); }
        if (nameView.value == 'state') { View_Fields.push('state'); }
    }

    return View_Fields;
}
*/



/*
function get_Mass_View(mas_Vidg, ASZ_M) {
    let View_Fields = new Array();
    for (const nameView of mas_Vidg) {

        if (nameView.value == 'selectAll') {
            View_Fields.push('vidget');

            View_Fields.push("azs");

            View_Fields.push('data');

            View_Fields.push('icon_alarm');
            View_Fields.push('status_alarm');
            View_Fields.push('state_alarm');

            View_Fields.push('pump');
            View_Fields.push('Counter_Curent');
            View_Fields.push('fuel');
            View_Fields.push('nozzle');
            View_Fields.push('date');
            View_Fields.push('time');
            View_Fields.push('status');
            View_Fields.push('state');
        }

        if (nameView.value == 'vidget') {
            View_Fields.push('vidget');
            View_Fields.push('icon_alarm');
            View_Fields.push('status_alarm');
            View_Fields.push('state_alarm');
        }


        if (nameView.value == 'data') {
            View_Fields.push('data');
            View_Fields.push('pump');
            View_Fields.push('Counter_Curent');
            View_Fields.push('fuel');
            View_Fields.push('nozzle');
            View_Fields.push('date');
            View_Fields.push('time');
            View_Fields.push('status');
            View_Fields.push('state');
        }

        if (nameView.value == 'icon_alarm') { View_Fields.push('icon_alarm'); }
        if (nameView.value == 'status_alarm') { View_Fields.push('status_alarm'); }
        if (nameView.value == 'state_alarm') { View_Fields.push('state_alarm'); }
        if (nameView.value == 'pump') { View_Fields.push('pump'); }
        if (nameView.value == 'Counter_Curent') { View_Fields.push('Counter_Curent'); }
        if (nameView.value == 'fuel') { View_Fields.push('fuel'); }
        if (nameView.value == 'nozzle') { View_Fields.push('nozzle'); }
        if (nameView.value == 'date') { View_Fields.push('date'); }
        if (nameView.value == 'time') { View_Fields.push('time'); }
        if (nameView.value == 'status') { View_Fields.push('status'); }
        if (nameView.value == 'state') { View_Fields.push('state'); }
    }

    return View_Fields;
}

function Is_View_Row(Data, Name_Row) {
    let row = false;
    if (Data != undefined) {
        for (const iterator of Data) {
            if (iterator == Name_Row) {
                row = true;
                break;
            }
        }
        let r = 0;
    }

    return row;
}

function Delete_Azs(data, dataF) {
    var indices = [];
    if (data != null && dataF != null) {
        var indices = [];
        let t = 0;
        for (let index = 0; index < data.length; index++) {

            if (dataF.indexOf(data[index].azs.toUpperCase()) == -1) {
                indices[t] = data[index];
                t++;
            }
        }
    }
    return indices;
}
*/



        /*
        
                let _AZS = new Array();
                let isAzs = false;
                for (const it_View_Vidg of View_Vidg) {
                    if (it_View_Vidg.value == 'azs') {
                        isAzs = true;
                        this.setState({ _Azs_Mass_Filter: this.state._Azs_Mass });
                    } else if (it_View_Vidg.value == "selectAll") {
                        isAzs = true;
                        this.setState({ _Azs_Mass_Filter: this.state._Azs_Mass });
                    } else {
                        for (const azs of this.state._Azs_Mass) {
                            if (azs.id == it_View_Vidg.value) {
                                if (_AZS.length == 0) {
                                    for (const azs of this.state._Azs_Mass) {
                                        if (azs.id == 0) {
                                            isAzs = true;
                                            _AZS.push(azs);
                                            break;
                                        }
                                    }
                                }
                                _AZS.push(azs);
                            }
                        }
                        if (_AZS.length > 0) {
                            this.setState({ _Azs_Mass_Filter: _AZS });
                        }
                    }
                }
                if (!isAzs) {
                    for (const azs of this.state._Azs_Mass) {
                        if (azs.id == 0) {
                            isAzs = true;
                            _AZS.push(azs);
                            this.setState({ _Azs_Mass_Filter: _AZS });
                            break;
                        }
                    }
                }
        */
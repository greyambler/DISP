export const RSS = "http://172.23.16.18:8080/dprest-1.0-SNAPSHOT/webresources/ru.expertek.dp.dpfacade.dvc/";
export const MARK = "http://172.23.16.18:8080/dpmark-1.0-SNAPSHOT/webresources/ru.expertek.dp.dpinside.mark";
export const WS = "ws://172.23.16.18:8080/dpsock-1.0-SNAPSHOT/alws";


export function Get_RSS(Rss, startDate, endDate) {
  var rss = Rss;
  return rss;
}
export function get_DateRSS() {

  let debugeList = get_Rss_DevList();
  let ListDev = JSON.parse(debugeList);
  //let J_ListDev = get_ListFals(ListDev);
  return ListDev;
}

export function get_Full_TreeBar(_objects) {
  let J_Rss = _objects;//JSON.parse(_Json);
  //let Fuels = new d_tree_TreeBar('Топливо', get_ListChildTreeBar(J_Rss.fuel, 'fuel'), 'fuel', false);
  //let TpList = new d_tree_TreeBar('Оборудование', get_ListChildTreeBar(J_Rss.tpList, 'tpList'), 'tpList', false);
  let ObLists = new d_tree_TreeBar('АЗК', get_ListChildTreeBar(J_Rss.obList, 'obList'), 'obList', false);

  //let D_Tree = new d_tree_TreeBar('Справочники', [Fuels, ObLists, TpList], 'root', true);
  let D_Tree = new d_tree_TreeBar('Справочники', [ObLists], 'root', true);


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
    children[t] = { id: item.id, name: item.nm, fu: item.fu, type: _type, children: get_ListsChildTreeBar(item.id) };
    //{id:item.id, name:item.nm, fu:item.fu,type:_type,children:null};//get_ListsChildTreeBar(item.id) };
    //new d_Child_TreeBar(item.nm, item.id, item.fu, _type);
    t++;
  }
  return children;
}
/*
class d_Child_TreeBar {
  constructor(_name, _id, _fu, _type) {
    this.id = _id;
    this.name = _name;
    this.fu = _fu;
    this.type = _type;
    this.children = get_ListsChildTreeBar(_id);
  }
}
*/


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
    '{"id":"c7c00a08-4bb3-4038-8173-921dfb58c689",' +
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
    '"state":2,' +
    '"fuel":"АИ-92"},' +

    '{"id":"c7c00a08-4bb3-4038-8173-921dfb58c689",' +
    '"Available_volume":2821.17,' +
    '"CURENT_VOLUME":3010.20,' +
    '"TOTAL_WATER":168.63,' +
    '"azs":"MJ043",' +
    '"storage_space":2,' +
    '"temperature":18,' +
    '"density":0.767,' +    
    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +
    '"status":0,' +
    '"state":2,' +
    '"fuel":"АИ-95"},' +

    '{"id":"c7c00a08-4bb3-4038-8173-921dfb58c689",' +
    '"Available_volume":4218.95,' +
    '"CURENT_VOLUME":1500,' +
    '"TOTAL_WATER":218.05,' +
    '"azs":"MJ043",' +
    '"storage_space":3,' +
    '"temperature":19,' +
    '"density":0.769,' +
    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +
    '"status":0,' +
    '"state":2,' +
    '"fuel":"АИ-98"},' +

    '{"id":"c7c00a08-4bb3-4038-8173-921dfb58c689",' +
    '"Available_volume":2812.44,' +
    '"CURENT_VOLUME":3000.20,' +
    '"TOTAL_WATER":187.36,' +
    '"azs":"MJ048",' +
    '"storage_space":1,' +
    '"temperature":17,' +
    '"density":0.765,' +
    '"date":"03.06.2019",' +
    '"time":"20:04:00",' +
    '"status":0,' +
    '"state":2,' +
    '"fuel":"АИ-92"},' +

    '{"id":"c7c00a08-4bb3-4038-8173-921dfb58c689",' +
    '"Available_volume":1358.64,' +
    '"CURENT_VOLUME":4510.20,' +
    '"TOTAL_WATER":131.16,' +
    '"azs":"MJ048",' +
    '"storage_space":2,' +
    '"temperature":18,' +
    '"density":0.767,' +
    '"date":"03.06.2019",' +
    '"time":"20:04:00",' +
    '"status":0,' +
    '"state":2,' +
    '"fuel":"АИ-95"},' +

    '{"id":"c7c00a08-4bb3-4038-8173-921dfb58c689",' +
    '"Available_volume":986.12,' +
    '"CURENT_VOLUME":4920.20,' +
    '"TOTAL_WATER":93.68,' +
    '"azs":"MJ048",' +
    '"storage_space":3,' +
    '"temperature":19,' +
    '"density":0.769,' +
    '"date":"03.06.2019",' +
    '"time":"21:19:00",' +
    '"status":0,' +
    '"state":2,' +
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

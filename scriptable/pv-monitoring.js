// URL and credentials of influx
let influxUrl = "http://influx.fritz.box:8086";

//let db = "monitoring"
let db = "monitoring"
// authentication, leave empty if disabled
let username = ""
let password = ""
//--------------------------------------------------------------------------------------
// URL where to redirect when tapping the widget
let widgetURL = "http://grafana.fritz.box:3000";

//--------------------------------------------------------------------------------------
// refresh rate in seconds
let refreshRate = 30

let widget = new ListWidget();
widget.url = widgetURL;

let padding = 22;
widget.setPadding(padding, padding, padding, padding);

let nextRefresh = Date.now() + 1000 * refreshRate;
widget.refreshAfterDate = new Date(nextRefresh);

let date = new Date();
let df = new DateFormatter();
df.dateFormat = "HH:mm";
let timestamp = (df.string(date));

let data = await query();

let header = widget.addText("🌤️PV-Monitoring");
header.font = Font.mediumSystemFont(10);

widget.addSpacer(16);

// vStack 1 ist Zeile 1, vStack 2 ist Zeile 2
let vStack1 = widget.addStack();
vStack1.layoutHorizontally();
let vStack2 = widget.addStack();
vStack2.layoutHorizontally();

addDataView(vStack1, data.dcPower.toString() + "W", defineColor(100, 5000, data.dcPower), "PV");
vStack1.addSpacer();
addDataView(vStack1, data.exportPower.toString() + "W", defineColorNegative(100, -100, data.exportPower), "Netz", defineFootnote(50, -50, "Einspeisen", "Bezug", "Speicherregelung", data.exportPower));
vStack1.addSpacer();
addDataView(vStack1, data.loadPower.toString() + "W", defineColorNegative(data.exportPower / 2, data.exportPower, data.loadPower), "Haus");

addDataView(vStack2, data.batteryLevel.toString() + "%", defineColor(30, 70, data.batteryLevel), "SoC");
vStack2.addSpacer();
addDataView(vStack2, data.batteryPower.toString() + "W", defineColor(-100, 100, data.batteryPower), "Speicher", defineFootnote(50, -50, "Laden", "Entladen", "Netzregelung", data.batteryPower));
vStack2.addSpacer();
addDataView(vStack2, timestamp + " Uhr", Color.dynamic(Color.black(), Color.white()), "Timestamp");


Script.setWidget(widget);
Script.complete();
// Größe der Widget-Vorschau
widget.presentMedium();


function addDataView(widget, data, color, name, foot = null) {
  let viewStack = widget.addStack();
  viewStack.layoutVertically();

  let label = viewStack.addText(name);
  label.font = Font.mediumSystemFont(12);

  if (foot != null) {
    let footnote = viewStack.addText(foot);
    footnote.font = Font.mediumSystemFont(6);
  }

  let value = viewStack.addText(data);
  value.font = Font.mediumSystemFont(20);
  value.textColor = color;
}

async function query() {
  let query = "SELECT last(total_dc_power) as dc_power, last(export_power_hybrid) as export_power, last(load_power_hybrid) as load_power, last(battery_level) as battery_level, last(battery_power) as battery_power FROM mqtt_consumer";
  let auth = username.length === 0 ? "" : `&u=${username}&p=${password}`;
  let url = `${influxUrl}/query?db=${db}${auth}&q=${query}`;
  try {
    let req = new Request(encodeURI(url));
    let json = await req.loadJSON();
    let columns = json.results[0].series[0].columns;
    let values = json.results[0].series[0].values[0];
    return {
      dcPower: values[columns.indexOf("dc_power")],
      exportPower: values[columns.indexOf("export_power")],
      loadPower: values[columns.indexOf("load_power")],
      batteryLevel: values[columns.indexOf("battery_level")],
      batteryPower: values[columns.indexOf("battery_power")]
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

function defineColor(TreshYellow, TreshGreen, value) {
  if (value >= TreshGreen) {
    return Color.green();
  } else if (value >= TreshYellow) {
    return Color.yellow();
  } else {
    return Color.red();
  }
}


function defineColorNegative(TreshYellow, TreshRed, value) {
  if (value >= TreshRed) {
    return Color.red();
  } else if (value >= TreshYellow) {
    return Color.yellow();
  } else {
    return Color.green();
  }
}


function defineFootnote(groesserAls, kleinerAls, groesserText, kleinerText, sonstText, value) {
  if (value > groesserAls) {
    return (groesserText);
  } else if (value < kleinerAls) {
    return (kleinerText);
  } else {
    return (sonstText);
  }
}
